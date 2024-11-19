const Wishlist = require("../models/wishList")

async function addItemToWishlist(req, res){
    try {
      const { userId, productId, productName, price } = req.body;
  
      // Add the product to the user's wishlist
      const updatedWishlist = await Wishlist.findOneAndUpdate(
        { userId }, // Find the wishlist by userId
        { $push: { items: { productId, productName, price } } }, // Add the item to the items array
        { new: true, upsert: true } // Create a new wishlist if one doesn't exist
      );
  
      return res.status(200).json({ success: "Item added to wishlist", updatedWishlist });
    } catch (error) {
      console.error("Error adding item to wishlist:", error);
      return res.status(500).json({ error: "Failed to add item to wishlist" });
    }
  };
  

async function getWishlist(req,res){
    try {
      const { userId } = req.params;
  
      // Fetch the wishlist with user details
      const wishlist = await Wishlist.findOne({ userId }).populate("userId", "email firstName lastName");
  
      if (!wishlist) {
        return res.status(404).json({ error: "Wishlist not found" });
      }
  
      return res.status(200).json({ success: true, wishlist });
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      return res.status(500).json({ error: "Failed to fetch wishlist" });
    }
  };

module.exports = { addItemToWishlist, getWishlist };
  