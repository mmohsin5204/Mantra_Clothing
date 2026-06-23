const express = require('express');
const { getAllOrders, updateOrderStatus, getAllUsers, getStats } = require('../controllers/adminController');
const { protect, isAdmin } = require('../middleware/auth');

const router = express.Router();

router.get('/orders', protect, isAdmin, getAllOrders);
router.put('/orders/:id/status', protect, isAdmin, updateOrderStatus);
router.get('/users', protect, isAdmin, getAllUsers);
router.get('/stats', protect, isAdmin, getStats);

module.exports = router;
