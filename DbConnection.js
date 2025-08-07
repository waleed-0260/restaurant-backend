const mongoose = require("mongoose");

let isConnected = false; // 🔁 Global cache

const dbConnect = async (dbUri) => {
  if (isConnected) {
    // Already connected
    return;
  }

  try {
    const db = await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = db.connections[0].readyState === 1;
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
};

module.exports = dbConnect;
