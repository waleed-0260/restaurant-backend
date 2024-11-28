
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
    res.status(200).json(data)
})

app.use("/admin", admin)

app.post("/admin/login", async(req, res)=>{
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
})

app.listen(8000, ()=> console.log("server started"))

module.exports = app;