const db = require('../config/db');
const asyncHandler = require('../utils/asyncHandler');

exports.getAllOrders = asyncHandler(async (req, res) => {
  const { status } = req.query;

  let query = `
    SELECT o.*, u.name AS user_name, u.email AS user_email
    FROM orders o
    JOIN users u ON o.user_id = u.id
    WHERE 1=1
  `;
  const params = [];

  if (status) {
    query += ' AND o.status = ?';
    params.push(status);
  }

  query += ' ORDER BY o.created_at DESC';

  const [orders] = await db.query(query, params);

  const orderIds = orders.map(o => o.id);
  let orderItems = [];
  if (orderIds.length > 0) {
    [orderItems] = await db.query('SELECT * FROM order_items WHERE order_id IN (?)', [orderIds]);
  }

  const ordersWithItems = orders.map(order => ({
    ...order,
    items: orderItems.filter(item => item.order_id === order.id)
  }));

  res.json({ success: true, data: ordersWithItems });
});

exports.updateOrderStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  await db.query('UPDATE orders SET status = ? WHERE id = ?', [status, id]);

  res.json({ success: true, message: 'Order status updated' });
});

exports.getAllUsers = asyncHandler(async (req, res) => {
  const [users] = await db.query('SELECT id, name, email, is_admin, created_at FROM users ORDER BY created_at DESC');
  const parsedUsers = users.map(u => ({ ...u, is_admin: !!u.is_admin }));
  res.json({ success: true, data: parsedUsers });
});

exports.getStats = asyncHandler(async (req, res) => {
  const [totalRevenueResult] = await db.query('SELECT SUM(total) AS total_revenue FROM orders WHERE status != "cancelled"');
  const totalRevenue = totalRevenueResult[0].total_revenue || 0;

  const [totalOrdersResult] = await db.query('SELECT COUNT(*) AS total_orders FROM orders');
  const totalOrders = totalOrdersResult[0].total_orders;

  const [totalUsersResult] = await db.query('SELECT COUNT(*) AS total_users FROM users');
  const totalUsers = totalUsersResult[0].total_users;

  const [totalProductsResult] = await db.query('SELECT COUNT(*) AS total_products FROM products');
  const totalProducts = totalProductsResult[0].total_products;

  const [bestSellingProducts] = await db.query(`
    SELECT p.id, p.name, SUM(oi.quantity) AS total_sold
    FROM order_items oi
    JOIN products p ON oi.product_id = p.id
    GROUP BY p.id, p.name
    ORDER BY total_sold DESC
    LIMIT 5
  `);

  res.json({
    success: true,
    data: {
      total_revenue: parseFloat(totalRevenue),
      total_orders: totalOrders,
      total_users: totalUsers,
      total_products: totalProducts,
      best_selling_products: bestSellingProducts
    }
  });
});
