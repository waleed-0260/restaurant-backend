const express = require("express")
const connection = require("./DbConnection.js")
const cors = require("cors")
const admin = require("./routes/adminAuth.js")
const contact = require("./models/contacts.js")
const app = express();
const cookieParser = require('cookie-parser');
app.use(cors())
app.use(express.json({ limit: '10mb' })); // Increase JSON body limit
app.use(express.urlencoded({ extended: true, limit: '10mb' })); 
app.use(cookieParser())
// const {setUser} = require("./services/auth.js")
// const adminAuth = require("./models/adminAuth")
const portfolio = require("./models/portfolio.js")
const multer = require('multer');
const path = require('path');
// const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const router = express.Router();

connection("mongodb+srv://muhammadwaleedahsan43:5J8mD9BusMIaO4fq@cluster0.ha3cp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
    console.log("db connected")
}).catch((e)=>{
    console.log("catch error", e)
})
// CONTACT FORM
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

// const router = express.Router();

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'portfolio',
      format: async (req, file) => 'png',
      public_id: (req, file) => `${Date.now()}-${file.originalname}`,
      transformation: [{ width: 1024, height: 768, crop: 'limit' }], // Optimize upload
    },
  });
  
  const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit to 5MB per file
  });

app.post("/add-portfolio", async (req, res) => {
  try {
    const {
      heading,
      tagline,
      tags,
      description,
      masterFloorImage,
      panelFloorImage,
      challenge,
      mapImage,
      renderingImage,
      additionalImage,
      solution,
      solutionImage,
    } = req.body;

    // Validate that required fields are provided
    if (
      !heading ||
      !tagline ||
      !tags ||
      !description ||
      !masterFloorImage ||
      !panelFloorImage ||
      !challenge ||
      !mapImage ||
      !renderingImage ||
      !additionalImage ||
      !solution ||
      !solutionImage
    ) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Create a new portfolio entry
    const newPortfolio = new portfolio({
      heading,
      tagline,
      tags,
      description,
      masterFloorImage,
      panelFloorImage,
      challenge,
      mapImage,
      renderingImage,
      additionalImage,
      solution,
      solutionImage,
    });

    // Save the portfolio to the database
    await newPortfolio.save();

    res.status(201).json({ message: "Portfolio added successfully!", data: newPortfolio });
  } catch (error) {
    console.error("Error adding portfolio:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;


app.get("/get-portfolio", async(req, res)=>{
  const portfolioData = await portfolio.find();
    res.status(200).json(portfolioData);
})

app.listen(8000, ()=> console.log("server started"))

module.exports = app;



