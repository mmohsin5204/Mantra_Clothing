const db = require('../config/db');
const asyncHandler = require('../utils/asyncHandler');

const parseJsonField = (field) => {
  try {
    return JSON.parse(field);
  } catch (e) {
    return [];
  }
};

exports.getProducts = asyncHandler(async (req, res) => {
  const { category, featured, search, minPrice, maxPrice, sort, page = 1, limit = 12 } = req.query;
  const offset = (page - 1) * limit;

  let query = 'SELECT * FROM products WHERE 1=1';
  const params = [];

  if (category) {
    query += ' AND category = ?';
    params.push(category);
  }

  if (featured !== undefined) {
    query += ' AND featured = ?';
    params.push(featured === '1' || featured === 'true' ? 1 : 0);
  }

  if (search) {
    query += ' AND (name LIKE ? OR description LIKE ?)';
    const searchTerm = `%${search}%`;
    params.push(searchTerm, searchTerm);
  }

  if (minPrice) {
    query += ' AND price >= ?';
    params.push(parseFloat(minPrice));
  }

  if (maxPrice) {
    query += ' AND price <= ?';
    params.push(parseFloat(maxPrice));
  }

  let countQuery = query.replace('SELECT *', 'SELECT COUNT(*) AS total');

  switch (sort) {
    case 'price_asc':
      query += ' ORDER BY price ASC';
      break;
    case 'price_desc':
      query += ' ORDER BY price DESC';
      break;
    case 'newest':
    default:
      query += ' ORDER BY created_at DESC';
      break;
  }

  query += ' LIMIT ? OFFSET ?';
  params.push(parseInt(limit), parseInt(offset));

  const [products] = await db.query(query, params);
  const [countResult] = await db.query(countQuery, params.slice(0, -2));
  const total = countResult[0].total;
  const totalPages = Math.ceil(total / limit);

  const parsedProducts = products.map(product => ({
    ...product,
    sizes: parseJsonField(product.sizes),
    colors: parseJsonField(product.colors),
    featured: !!product.featured
  }));

  res.json({
    success: true,
    data: parsedProducts,
    total,
    page: parseInt(page),
    totalPages
  });
});

exports.getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const [products] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
  if (products.length === 0) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  const product = {
    ...products[0],
    sizes: parseJsonField(products[0].sizes),
    colors: parseJsonField(products[0].colors),
    featured: !!products[0].featured
  };

  const [reviews] = await db.query(
    'SELECT r.*, u.name AS user_name FROM reviews r JOIN users u ON r.user_id = u.id WHERE r.product_id = ? ORDER BY r.created_at DESC',
    [id]
  );

  const [avgResult] = await db.query('SELECT AVG(rating) AS avg_rating FROM reviews WHERE product_id = ?', [id]);
  const avgRating = avgResult[0].avg_rating ? parseFloat(avgResult[0].avg_rating).toFixed(1) : 0;

  res.json({
    success: true,
    data: {
      ...product,
      reviews,
      avg_rating: avgRating
    }
  });
});

exports.getCategories = asyncHandler(async (req, res) => {
  const [rows] = await db.query('SELECT DISTINCT category FROM products WHERE category IS NOT NULL AND category != ""');
  const categories = rows.map(row => row.category);
  res.json({ success: true, data: categories });
});

exports.createProduct = asyncHandler(async (req, res) => {
  const { name, category, price, description, image, sizes, colors, stock, featured } = req.body;

  const [result] = await db.query(
    'INSERT INTO products (name, category, price, description, image, sizes, colors, stock, featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [
      name,
      category,
      price,
      description,
      image,
      JSON.stringify(sizes),
      JSON.stringify(colors),
      stock,
      featured ? 1 : 0
    ]
  );

  res.status(201).json({
    success: true,
    data: {
      id: result.insertId,
      name,
      category,
      price,
      description,
      image,
      sizes,
      colors,
      stock,
      featured: !!featured
    }
  });
});

exports.updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, category, price, description, image, sizes, colors, stock, featured } = req.body;

  await db.query(
    'UPDATE products SET name = ?, category = ?, price = ?, description = ?, image = ?, sizes = ?, colors = ?, stock = ?, featured = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
    [
      name,
      category,
      price,
      description,
      image,
      JSON.stringify(sizes),
      JSON.stringify(colors),
      stock,
      featured ? 1 : 0,
      id
    ]
  );

  res.json({
    success: true,
    message: 'Product updated successfully'
  });
});

exports.deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await db.query('DELETE FROM products WHERE id = ?', [id]);

  res.json({
    success: true,
    message: 'Product deleted successfully'
  });
});
