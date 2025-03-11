// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/authMiddleware');
const {
  createOrder,
  getUserOrders,
  getOrderById
} = require('../controllers/orderController');

router.use(authenticateUser);

// Place new order
router.post('/', createOrder);

// Get all orders for user
router.get('/', getUserOrders);

// Get single order detail
router.get('/:orderId', getOrderById);

module.exports = router;
