const db = require('../config/db');
const asyncHandler = require('../utils/asyncHandler');

exports.createOrder = asyncHandler(async (req, res) => {
  const {
    items,
    total,
    email,
    first_name,
    last_name,
    phone,
    address,
    city,
    postal_code,
    country,
    shipping_method,
    payment_method,
    shipping_fee,
    cart_items,
    email_offers,
    billing_same_as_shipping,
  } = req.body;
  const userId = req.user?.id || null;

  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    // Calculate subtotal (sum of items)
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Insert into orders table
    const [orderResult] = await connection.query(
      `INSERT INTO orders 
      (user_id, email, total, status, first_name, last_name, phone, address, city, postal_code, country, shipping_method, payment_method, shipping_fee, cart_items, email_offers, billing_same_as_shipping) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userId,
        email,
        total,
        'placed',
        first_name,
        last_name,
        phone,
        address,
        city,
        postal_code,
        country,
        shipping_method,
        payment_method,
        shipping_fee,
        cart_items ? JSON.stringify(cart_items) : null,
        email_offers,
        billing_same_as_shipping,
      ]
    );
    const orderId = orderResult.insertId;

    // Insert order items
    for (const item of items) {
      await connection.query(
        'INSERT INTO order_items (order_id, product_id, name, price, size, color, quantity) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [orderId, item.product_id, item.name, item.price, item.size, item.color, item.quantity]
      );
    }

    await connection.commit();

    res.status(201).json({
      success: true,
      order: {
        id: orderId,
        user_id: userId,
        total,
        status: 'placed',
        items,
      }
    });
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
});

exports.getMyOrders = asyncHandler(async (req, res) => {
  const [orders] = await db.query(
    'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC',
    [req.user.id]
  );

  const orderIds = orders.map(o => o.id);
  let orderItems = [];
  if (orderIds.length > 0) {
    [orderItems] = await db.query(
      'SELECT * FROM order_items WHERE order_id IN (?)',
      [orderIds]
    );
  }

  const ordersWithItems = orders.map(order => ({
    ...order,
    items: orderItems.filter(item => item.order_id === order.id)
  }));

  res.json({ success: true, data: ordersWithItems });
});

exports.getOrderById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const [orders] = await db.query('SELECT * FROM orders WHERE id = ?', [id]);
  if (orders.length === 0) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }

  const order = orders[0];

  if (order.user_id && order.user_id !== req.user.id && !req.user.is_admin) {
    return res.status(403).json({ success: false, message: 'Not authorized to access this order' });
  }

  const [items] = await db.query('SELECT * FROM order_items WHERE order_id = ?', [id]);

  res.json({
    success: true,
    data: {
      ...order,
      items
    }
  });
});
