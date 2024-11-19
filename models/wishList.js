const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "authSchema", // Reference to the auth model
    required: true,
  },
  items: [
    {
    //   productId: { type: String, required: true }, // Example product ID
      productName: { type: String, required: true },
      price: { type: Number, required: true },
      addedAt: { type: Date, default: Date.now },
    },
  ],
});

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

module.exports = Wishlist;
