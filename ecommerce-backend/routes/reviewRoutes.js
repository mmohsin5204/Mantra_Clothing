const express = require('express');
const { getReviewsByProduct, createReview, deleteReview } = require('../controllers/reviewController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/product/:productId', getReviewsByProduct);
router.post('/', protect, createReview);
router.delete('/:id', protect, deleteReview);

module.exports = router;
