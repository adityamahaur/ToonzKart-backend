const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }] // Array of book IDs
}, { timestamps: true });

module.exports = mongoose.model("Wishlist", wishlistSchema);
