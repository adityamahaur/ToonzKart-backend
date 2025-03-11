const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");

// Import routes
const userRoutes = require("./src/routes/userRoutes");
const adminRoutes = require("./src/routes/adminRoutes"); 
const storeRoutes = require("./src/routes/storeRoutes");

const bookRoutes = require("./src/routes/bookRoutes");   // NEW
const cartRoutes = require("./src/routes/cartRoutes");   // NEW
const orderRoutes = require("./src/routes/orderRoutes"); // NEW
const reviewRoutes = require("./src/routes/reviewRoutes")

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect Database
connectDB();

// Routes
app.use("/api/users", userRoutes);
app.use("/api/admins", adminRoutes); 
app.use("/api/stores", storeRoutes); 

app.use("/api/books", bookRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to ToonzKart API!");
});

// Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
