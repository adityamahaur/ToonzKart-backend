// src/seeds/seed.js
require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Import models
const User = require("../models/userModel");
const Book = require("../models/bookModel");
const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
const School = require("../models/schoolModel");
const Review = require("../models/reviewModel");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/toonzkart", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
  }
};

async function seedDatabase() {
  await connectDB();

  try {
    // Clear existing data
    await User.deleteMany({});
    await Book.deleteMany({});
    await Order.deleteMany({});
    await Cart.deleteMany({});
    await School.deleteMany({});
    await Review.deleteMany({});
    console.log("🗑️ Existing data cleared!");

    // 1️⃣ Seed Schools
    const schools = await School.insertMany([
      { name: "Springfield High School", location: "Springfield" },
      { name: "Shelbyville High School", location: "Shelbyville" },
    ]);
    console.log(`🏫 Schools inserted: ${schools.length}`);

    // 2️⃣ Seed Users (with references to schools)
    const hashedPassword = await bcrypt.hash("123456", 10);
    console.log("📌 Seeding Users...");
    const users = await User.insertMany([
    {
        name: "John Doe",
        email: "john@example.com",
        password: hashedPassword,  // Hashed password
        profilePicture: "john.jpg",
        preferences: {
        school: schools[0]._id,
        subjects: ["Math", "Science"],
        },
        orderHistory: [],
        wishlist: [],
    }
    ]);
    console.log("✅ Users inserted:", users);


    // 3️⃣ Seed Books (linked to schools)
    const books = await Book.insertMany([
      {
        title: "Mathematics Grade 10",
        author: "Jane Smith",
        description: "A comprehensive guide to 10th-grade math.",
        isbn: "111-111",
        price: 150,
        stock: 10,
        school: schools[0]._id,
        subject: "Math",
        image: "math10.jpg",
      },
      {
        title: "Physics for Beginners",
        author: "Richard Feynman",
        description: "Introductory concepts in physics.",
        isbn: "222-222",
        price: 200,
        stock: 5,
        school: schools[0]._id,
        subject: "Science",
        image: "physics.jpg",
      },
      {
        title: "Classic Literature",
        author: "Mark Twain",
        description: "A collection of classic literary works.",
        isbn: "333-333",
        price: 120,
        stock: 8,
        school: schools[1]._id,
        subject: "Literature",
        image: "lit.jpg",
      },
    ]);
    console.log(`📚 Books inserted: ${books.length}`);

    // 4️⃣ Seed Orders (linked to users & books)
    const orders = await Order.insertMany([
      {
        user: users[0]._id,
        books: [
          { book: books[0]._id, quantity: 2 },
          { book: books[1]._id, quantity: 1 },
        ],
        totalAmount: 500,
        status: "Pending",
      },
      {
        user: users[1]._id,
        books: [{ book: books[2]._id, quantity: 3 }],
        totalAmount: 360,
        status: "Shipped",
      },
    ]);
    console.log(`📦 Orders inserted: ${orders.length}`);

    // 5️⃣ Seed Carts (linked to users & books)
    const carts = await Cart.insertMany([
      {
        userId: users[0]._id,
        items: [
          { bookId: books[0]._id, quantity: 1 },
          { bookId: books[1]._id, quantity: 2 },
        ],
      },
      {
        userId: users[1]._id,
        items: [{ bookId: books[2]._id, quantity: 1 }],
      },
    ]);
    console.log(`🛒 Carts inserted: ${carts.length}`);

    // 6️⃣ Seed Reviews (linked to users & books)
    const reviews = await Review.insertMany([
      {
        user: users[0]._id,
        book: books[0]._id,
        rating: 5,
        comment: "Great book for math learners!",
      },
      {
        user: users[1]._id,
        book: books[1]._id,
        rating: 4,
        comment: "Good introduction to physics.",
      },
    ]);
    console.log(`⭐ Reviews inserted: ${reviews.length}`);

    console.log("✅ Seeding completed successfully!");
  } catch (err) {
    console.error("❌ Seeding error:", err);
  } finally {
    mongoose.connection.close();
    console.log("🔌 MongoDB connection closed.");
  }
}

// Run the function
seedDatabase();
