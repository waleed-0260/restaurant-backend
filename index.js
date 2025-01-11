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



// POST route to create a portfolio item
app.post(
    '/add-portfolio',
    upload.fields([
      { name: 'masterFloorImage', maxCount: 1 },
      { name: 'panelFloorImage', maxCount: 1 },
      { name: 'mapImage', maxCount: 1 },
      { name: 'renderingImage', maxCount: 1 },
      { name: 'additionalImage', maxCount: 1 },
      { name: 'solutionImage', maxCount: 1 },
    ]),
    async (req, res) => {
      try {
        const {
          heading,
          tagline,
          tags,
          description,
          challenge,
          solution,
        } = req.body;
  
        // Get file paths from uploaded files
        const masterFloorImage = req.files.masterFloorImage[0].path;
const panelFloorImage = req.files.panelFloorImage[0].path;
const mapImage = req.files.mapImage[0].path;
const renderingImage = req.files.renderingImage[0].path;
const additionalImage = req.files.additionalImage[0].path;
const solutionImage = req.files.solutionImage[0].path;
  
        // Create new portfolio item
        const newPortfolio = new portfolio({
          heading,
          tagline,
          tags: tags.split(","),
          description,
          challenge,
          solution,
          masterFloorImage,
          panelFloorImage,
          mapImage,
          renderingImage,
          additionalImage,
          solutionImage,
        });
  
        // Save to database
        const savedPortfolio = await newPortfolio.save();
  
        res.status(201).json({      
          message: 'Portfolio item created successfully.',
          portfolio: savedPortfolio,
        });
      } catch (error) {
        console.error('Error creating portfolio item:', error.message, error.stack);
        res.status(500).json({ error: error.message || 'Internal Server Error' });
      }
    }
  );

app.get("/get-portfolio", async(req, res)=>{
  const portfolioData = await portfolio.find();
    res.status(200).json(portfolioData);
})

app.listen(8000, ()=> console.log("server started"))

module.exports = app;



