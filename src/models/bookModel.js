const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String },
    isbn: { type: String, unique: true },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    school: { type: mongoose.Schema.Types.ObjectId, ref: "School" },
    subject: { type: String, required: true },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    image: { type: String },
    createdAt: { type: Date, default: Date.now },
  });
  
  module.exports = mongoose.model("Book", bookSchema);
  