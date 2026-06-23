const db = require('../config/db');
const asyncHandler = require('../utils/asyncHandler');

exports.getReviewsByProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const [reviews] = await db.query(
    'SELECT r.*, u.name AS user_name FROM reviews r JOIN users u ON r.user_id = u.id WHERE r.product_id = ? ORDER BY r.created_at DESC',
    [productId]
  );

  res.json({ success: true, data: reviews });
});

exports.createReview = asyncHandler(async (req, res) => {
  const { product_id, rating, comment } = req.body;
  const userId = req.user.id;

  if (!rating || rating < 1 || rating > 5 || !Number.isInteger(rating)) {
    return res.status(400).json({ success: false, message: 'Rating must be an integer between 1 and 5' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO reviews (product_id, user_id, rating, comment) VALUES (?, ?, ?, ?)',
      [product_id, userId, rating, comment]
    );

    res.status(201).json({
      success: true,
      data: {
        id: result.insertId,
        product_id,
        user_id: userId,
        rating,
        comment
      }
    });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ success: false, message: 'You already reviewed this product' });
    }
    throw error;
  }
});

exports.deleteReview = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const isAdmin = req.user.is_admin;

  const [reviews] = await db.query('SELECT * FROM reviews WHERE id = ?', [id]);
  if (reviews.length === 0) {
    return res.status(404).json({ success: false, message: 'Review not found' });
  }

  const review = reviews[0];
  if (review.user_id !== userId && !isAdmin) {
    return res.status(403).json({ success: false, message: 'Not authorized to delete this review' });
  }

  await db.query('DELETE FROM reviews WHERE id = ?', [id]);

  res.json({ success: true, message: 'Review deleted successfully' });
});
