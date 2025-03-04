const supportSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    email: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ["Open", "Resolved"], default: "Open" },
    createdAt: { type: Date, default: Date.now },
  });
  
  module.exports = mongoose.model("Support", supportSchema);
  