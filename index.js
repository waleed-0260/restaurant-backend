const express = require("express")
const connection = require("./DbConnection.js")
const cors = require("cors")
const admin = require("./routes/adminAuth.js")
const contact = require("./models/contacts.js")
const app = express();
const cookieParser = require('cookie-parser');
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
const {setUser} = require("./services/auth.js")
const adminAuth = require("./models/adminAuth")

connection("mongodb+srv://muhammadwaleedahsan43:5J8mD9BusMIaO4fq@cluster0.ha3cp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
    console.log("db connected")
}).catch((e)=>{
    console.log("catch error", e)
})


app.post("/add-contact", async(req, res)=>{
    const {name, email, phone, message} = req.body;
    const success = await contact.create({name, email, phone, message})
    res.status(201).json({success:success})
})
app.get("/get-contacts", async(req, res)=>{
    const data = await contact.find({});
    res.status(200).json({data:data})
})

//app.use("/admin", admin)

app.post("/admin/login", async(req, res)=>{
    try {
        const { email, password } = req.body;
        const findEmail = await adminAuth.findOne({ email, password });
        if (!findEmail) {
          return res.status(401).json({ error: "Invalid email or password" });
        }
        const token = setUser({ email: findEmail.email, name: findEmail.name });
        res.cookie("loginUser", token); // Optional options like maxAge can be adjusted
    
        return res.status(200).json({ success: "Sign in successful" });
      } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ error: "Login failed due to server error" });
      }
})

app.listen(8000, ()=> console.log("server started"))

module.exports = app;