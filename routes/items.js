const express = require("express")
const {handleAddItems, handleGetItems} = require("../controllers/handleItems.js")
const router = express.Router();
const multer = require("multer");


// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Directory to save uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Unique file name
    },
});
const upload = multer({ storage });

router.post("/:category", upload.single("image"), handleAddItems);

router.get("/:category", handleGetItems);

module.exports = router;