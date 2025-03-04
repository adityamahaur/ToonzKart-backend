const Admin = require("../models/adminModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Admin Registration (Signup)
const registerAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the admin already exists
    let admin = await Admin.findOne({ email });
    if (admin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new admin
    admin = new Admin({
      email,
      password: hashedPassword,
    });

    await admin.save();

    // Generate JWT token
    const token = jwt.sign({ id: admin._id, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({ message: "Admin registered successfully", token, adminId: admin._id });
  } catch (error) {
    console.error("Error in registerAdmin:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Admin Login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the admin exists
    let admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: admin._id, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({ message: "Admin login successful", token, adminId: admin._id });
  } catch (error) {
    console.error("Error in loginAdmin:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { registerAdmin, loginAdmin };
