const express = require("express");
const { registerUser, loginUser } = require("../controllers/userController");
const { authenticateUser } = require("../middleware/authMiddleware");


const router = express.Router();

// User Registration
router.post("/register", registerUser);

// User Login
router.post("/login", loginUser);

module.exports = router;
