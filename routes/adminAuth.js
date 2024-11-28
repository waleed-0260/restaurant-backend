const express = require("express")
const {handleSignUp, handleLogin} = require("../controllers/handleAdminAuthentication")
// const {handleAddItems} = require("../controllers/handleItems")
const router = express.Router()

router.post("/signUp", handleSignUp)
router.post("/login", handleLogin)
// router.post("/add-item", handleAddItems);
module.exports = router;