const requestSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    bookTitle: { type: String, required: true },
    author: { type: String },
    status: { type: String, enum: ["Pending", "Available"], default: "Pending" },
    createdAt: { type: Date, default: Date.now },
  });
  
  module.exports = mongoose.model("Request", requestSchema);
  