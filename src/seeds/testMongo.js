require("dotenv").config();
const mongoose = require("mongoose");

async function testConnection() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/toonzkart", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("✅ Successfully connected to MongoDB!");
    } catch (err) {
        console.error("❌ MongoDB connection error:", err);
    } finally {
        mongoose.connection.close();
    }
}

testConnection();
