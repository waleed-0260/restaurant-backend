const adminAuth = require("../models/adminAuth")
const bcrypt = require("bcrypt")
const {setUser} = require("../services/auth.js")


async function handleSignUp(req, res) {
    try {
        const {
            fullName,
            email,
            password
        } = req.body;

        // Validate required fields
        if (!fullName || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Validate password confirmation
        // if (password !== confirmPassword) {
        //     return res.status(400).json({ error: "Passwords do not match" });
        // }

        // Check for existing email
        const checkEmail = await adminAuth.findOne({ email });
        if (checkEmail) {
            return res.status(409).json({ error: "Email already registered" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        await adminAuth.create({
            fullName,
            email,
            password
        });

        return res.status(201).json({ message: "Admin user created successfully" });
    } catch (error) {
        console.error("Error during signup:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

async function handleLogin(req,res) {
    try{
        const {email, password} = req.body;
        const findAccount  = await adminAuth.find({email, password})
        if (!findAccount) {
            return res.status(400).json({failed:"user not found"})
        }
        else{
            const token = setUser({findAccount});
            res.cookie("loginUser", token)
            return res.status(200).json({success:"user logged in successfully"})
        }
    }
    catch(error) {
        return res.status(500).json({error:"server error"})
    }
}

module.exports = {handleSignUp, handleLogin}