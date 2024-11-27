const express = require("express")
const {addItemToWishlist, getWishlist} = require("../controllers/handleWishList")
const router = express.Router();

router.post("/add", addItemToWishlist)
router.get("/get", getWishlist)
module.exports = router


