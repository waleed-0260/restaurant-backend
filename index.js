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
const portfolio = require("./models/portfolio.js")
const multer = require('multer');
const path = require('path');
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

const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory where images will be stored
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  // Accept only image files
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('File is not an image!'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});



// POST route to create a portfolio item
app.post(
    '/add-portfolio',
    upload.fields([
      { name: 'descriptionImage', maxCount: 1 },
      { name: 'challengeImage', maxCount: 1 },
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
  
        // Check for required fields
        if (
          !heading ||
          !tagline ||
          !tags ||
          !description ||
          !req.files.descriptionImage ||
          !challenge ||
          !req.files.challengeImage ||
          !solution ||
          !req.files.solutionImage
        ) {
          return res.status(400).json({ error: 'All fields are required.' });
        }
  
        // Get file paths from uploaded files
        const descriptionImage = req.files.descriptionImage[0].path;
        const challengeImage = req.files.challengeImage[0].path;
        const solutionImage = req.files.solutionImage[0].path;
  
        // Create new portfolio item
        const newPortfolio = new portfolio({
          heading,
          tagline,
          tags: tags.split(','), // Split tags into an array
          description,
          descriptionImage,
          challenge,
          challengeImage,
          solution,
          solutionImage,
        });
  
        // Save to database
        const savedPortfolio = await newPortfolio.save();
  
        res.status(201).json({
          message: 'Portfolio item created successfully.',
          portfolio: savedPortfolio,
        });
      } catch (error) {
        console.error('Error creating portfolio item:', error);
        res.status(500).json({ error: 'Internal server error.' });
      }
    }
  );


app.listen(8000, ()=> console.log("server started"))

module.exports = app;