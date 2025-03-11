// src/models/School.js
const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String }
  // Add any other fields you need
});

module.exports = mongoose.model("School", schoolSchema);
