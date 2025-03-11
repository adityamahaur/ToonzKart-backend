const express = require("express");
const { registerUser, loginUser } = require("../controllers/userController");
const { authenticateUser } = require("../middleware/authMiddleware");
const {
    getWishlist,
    addToWishlist,
    removeFromWishlist,
    clearWishlist
  } = require('../controllers/userController');


const router = express.Router();

// User Registration
router.post("/register", registerUser);

// User Login
router.post("/login", loginUser);

// Wishlist operations
router.use(authenticateUser);

router.get('/wishlist', getWishlist);
router.post('/wishlist', addToWishlist);
router.delete('/wishlist/:bookId', removeFromWishlist);
router.delete("/", authenticateUser, clearWishlist);     // Clear wishlist

module.exports = router;
