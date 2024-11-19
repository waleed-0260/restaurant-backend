const express = require("express")
const {handleSignUp, handleLogin} = require("../controllers/handleAuthentication.js")
const router  = express.Router();

router.post("/signUp", handleSignUp)

module.exports = router;