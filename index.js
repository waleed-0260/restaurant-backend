// 5J8mD9BusMIaO4fq
// muhammadwaleedahsan43

// mongodb+srv://muhammadwaleedahsan43:<db_password>@cluster0.ha3cp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0


const express = require("express")
const connection = require("./DbConnection.js")
// const mongoose  = require("mongoose")
const cors = require("cors")
// const userRouter = require("./routes/auth.js")
// const adminRouter = require("./routes/adminAuth.js")
// const wishlist = require("./routes/wishList.js")
// const items = require("./routes/items.js")
// const path = require("path")
const contact = require("./models/contacts.js")
const app = express();
const cookieParser = require('cookie-parser');
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())

connection("mongodb+srv://muhammadwaleedahsan43:5J8mD9BusMIaO4fq@cluster0.ha3cp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
    console.log("db connected")
}).catch((e)=>{
    console.log("catch error", e)
})

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use("/api/user/signUp", userRouter)
// app.use("/api/wishlist", wishlist)
// app.use("/api/items", items)
// app.use("/api/admin", adminRouter)

// app.use("/api/wishlist", wishlist)

app.post("/add-contact", async(req, res)=>{
    const {name, email, phone, message} = req.body;
    const success = await contact.create({name, email, phone, message})
    res.status(201).json({success:success})
})
app.get("/get-contacts", async(req, res)=>{
    const data = await contact.find({});
    res.status(200).json(data)
})

app.listen(8000, ()=> console.log("server started"))

module.exports = app;