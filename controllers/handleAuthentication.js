const user = require("../models/auth.js");
const {setUser} = require("../services/auth.js")
const Wishlist = require("../models/wishList.js")
async function handleSignUp(req, res) {
  try {
    const { email, firstName, lastName, phone, password, confirmPassword } =
      req.body;
    const checkEmail = await user.findOne({ email });

    if (!checkEmail) {
      await user.create({
        email,
        firstName,
        lastName,
        phone,
        password,
        confirmPassword,
      });
      // await Wishlist.create({ userId: newUser._id, items: [] });
      return res.status(201).json({ success: "User createed successfully" });
    } else {
      return res.status(404).json({ failed: "Email already registered" });
    }

    // If successful, send a success message
  } catch (error) {
    console.error("Error during sign up:", error);
    // Send an error response
    return res.status(500).json({ error: "Sign up failed" });
  }
}

async function handleLogin(req, res) {
  try {
    const { email, password } = req.body;
    const findEmail = await user.findOne({ email, password });
    if (!findEmail) {
      return res.status(404).json({ failed: "invalid email" });
    }
    const token = setUser({ email: findEmail.email, firstName: findEmail.firstName });
    res.cookie("loginUser", token); // Optional options like maxAge can be adjusted

    return res.status(200).json({ success: "Sign in successful" });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Login failed due to server error" });
  }
}

module.exports = { handleSignUp, handleLogin };
