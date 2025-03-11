const express = require("express");
const { getAllOrders, updateOrder, getOrderById, exportOrdersCSV } = require("../controllers/adminOrderController");
const { authenticateAdmin } = require("../middleware/authMiddleware"); // Ensure only admins access

const router = express.Router();

// 🔹 Export Orders as CSV (Admin Only)
router.get("/export-csv", authenticateAdmin, exportOrdersCSV);

// 🔹 Get all orders (Admin Only)
router.get("/", authenticateAdmin, getAllOrders);

// 🔹 Update order status (Admin Only)
router.put("/:id", authenticateAdmin, updateOrder);

// 🔹 Get a single order by ID (Admin Only)
router.get("/:id", authenticateAdmin, getOrderById);



module.exports = router;
