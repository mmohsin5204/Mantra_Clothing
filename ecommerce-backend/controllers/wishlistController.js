const db = require('../config/db');
const asyncHandler = require('../utils/asyncHandler');

const parseJsonField = (field) => {
  try {
    return JSON.parse(field);
  } catch (e) {
    return [];
  }
};

exports.getWishlist = asyncHandler(async (req, res) => {
  const [wishlistItems] = await db.query(
    'SELECT p.* FROM wishlist w JOIN products p ON w.product_id = p.id WHERE w.user_id = ? ORDER BY w.created_at DESC',
    [req.user.id]
  );

  const parsedProducts = wishlistItems.map(product => ({
    ...product,
    sizes: parseJsonField(product.sizes),
    colors: parseJsonField(product.colors),
    featured: !!product.featured
  }));

  res.json({ success: true, data: parsedProducts });
});

exports.addToWishlist = asyncHandler(async (req, res) => {
  const { product_id } = req.body;
  const userId = req.user.id;

  try {
    await db.query(
      'INSERT INTO wishlist (user_id, product_id) VALUES (?, ?)',
      [userId, product_id]
    );
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.json({ success: true, message: 'Product already in wishlist' });
    }
    throw error;
  }

  res.status(201).json({ success: true, message: 'Product added to wishlist' });
});

exports.removeFromWishlist = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const userId = req.user.id;

  await db.query(
    'DELETE FROM wishlist WHERE user_id = ? AND product_id = ?',
    [userId, productId]
  );

  res.json({ success: true, message: 'Product removed from wishlist' });
});
