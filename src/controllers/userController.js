const User = require("../models/userModel");
const Wishlist = require("../models/whishlistModel")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register User (Signup)
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({ message: "User registered successfully", token, userId: user._id });
  } catch (error) {
    console.error("Error in registerUser:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({ message: "Login successful", token, userId: user._id });
  } catch (error) {
    console.error("Error in loginUser:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('wishlist');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

const addToWishlist = async (req, res) => {
  try {
    const { bookId } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (!user.wishlist.includes(bookId)) {
      user.wishlist.push(bookId);
      await user.save();
    }

    res.json({ message: 'Book added to wishlist', wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const { bookId } = req.params;
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.wishlist = user.wishlist.filter((id) => id.toString() !== bookId);
    await user.save();

    res.json({ message: 'Book removed from wishlist', wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Clear the entire wishlist
const clearWishlist = async (req, res) => {
  try {
    const userId = req.user._id;

    const wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    wishlist.books = []; // Empty the books array
    await wishlist.save();

    res.status(200).json({ message: "Wishlist cleared successfully", wishlist });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

module.exports = { registerUser, loginUser, getWishlist, addToWishlist, removeFromWishlist, clearWishlist };
