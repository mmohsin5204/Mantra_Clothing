const express = require('express');
const { getProducts, getProductById, getCategories, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { protect, isAdmin } = require('../middleware/auth');

const router = express.Router();

router.get('/', getProducts);
router.get('/categories', getCategories);
router.get('/:id', getProductById);
router.post('/', protect, isAdmin, createProduct);
router.put('/:id', protect, isAdmin, updateProduct);
router.delete('/:id', protect, isAdmin, deleteProduct);

module.exports = router;
