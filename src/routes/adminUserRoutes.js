const express = require("express");
const { addUser, getAllUsers, getUserById, updateUser, deleteUser} = require("../controllers/adminUserController");
const { authenticateAdmin } = require("../middleware/authMiddleware"); // Ensure only admins access

const router = express.Router();

// 🔹 Add a new user (Admin Only)
router.post("/", authenticateAdmin, addUser);

// 🔹 Fetch all users (Admin Only)
router.get("/", authenticateAdmin, getAllUsers);

// 🔹 Fetch a single user by ID (Admin Only)
router.get("/:id", authenticateAdmin, getUserById);

// 🔹 Update user details (Admin Only)
router.put("/:id", authenticateAdmin, updateUser);

// 🔹 Delete a User (Admin Only)
router.delete("/:id", authenticateAdmin, deleteUser);

module.exports = router;
