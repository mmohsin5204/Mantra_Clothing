const express = require('express');
const { createCheckoutSession, handleWebhook, getSession } = require('../controllers/paymentController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/create-checkout-session', protect, createCheckoutSession);
router.get('/session/:sessionId', protect, getSession);

module.exports = router;
