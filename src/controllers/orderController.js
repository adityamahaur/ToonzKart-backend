// controllers/orderController.js
const Order = require('../models/orderModel');
const Cart = require('../models/cartModel');

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { books, totalAmount } = req.body;  // Expecting book items and amount
    const userId = req.user._id; // Extracting user ID from token

    // Validate request
    if (!books || books.length === 0) {
      return res.status(400).json({ message: "Order must have at least one book." });
    }
    if (!totalAmount) {
      return res.status(400).json({ message: "Total amount is required." });
    }

    // Create new order
    const order = new Order({
      user: userId,  // Assign logged-in user
      books,
      totalAmount,
      status: "Pending",
    });

    await order.save();
    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId).populate('items.bookId');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    if (order.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};
