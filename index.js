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
const nodemailer = require("nodemailer")

connection(process.env.MONGODB_CONN).then(()=>{
    console.log("db connected")
}).catch((e)=>{
    console.log("catch error", e)
})
// CONTACT FORM
// app.post("/add-contact", async(req, res)=>{
//     const {name, email, phone, message} = req.body;
//     const success = await contact.create({name, email, phone, message})
//     res.status(201).json({success:success})
// })

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER, // Your Gmail address (used to send email)
    pass: EMAIL_PASS, // Your Gmail App Password
  },
});

app.post('/add-contact', async (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: `"${name}" <${email}>`, // Shows the sender's info
    to: 'zamanmuhammadi700@gmail.com', // <-- Hardcoded receiver email
    subject: 'New Contact Form Submission',
    html: `
      <h3>New Contact Message</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong><br/>${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Failed to send email' });
  }
});
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
      // { name: 'solutionImage', maxCount: 1 },
    ]),
    async (req, res) => {
      try {
        const {
          heading,
          tagline,
          // tags,
          description,
          challenge,
          solution,
          value,
          clientName,
          location,
          date,
          // Value,
          role
        } = req.body;
  
        // Get file paths from uploaded files
        const masterFloorImage = req.files.masterFloorImage
        ? req.files.masterFloorImage[0].path
        : null;
      const panelFloorImage = req.files.panelFloorImage
        ? req.files.panelFloorImage[0].path
        : null;
      const mapImage = req.files.mapImage
        ? req.files.mapImage[0].path
        : null;
      const renderingImage = req.files.renderingImage
        ? req.files.renderingImage[0].path
        : null;
      const additionalImage = req.files.additionalImage
        ? req.files.additionalImage[0].path
        : null;
// const solutionImage = req.files.solutionImage[0].path;
  
        // Create new portfolio item
        const newPortfolio = new portfolio({
          heading,
          tagline,
          // tags: tags.split(","),
          description,
          challenge,
          solution,
          masterFloorImage,
          panelFloorImage,
          mapImage,
          renderingImage,
          additionalImage,
          // solutionImage,
          value,
          clientName,
          location,
          date,
          // Value,
          role
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

app.get("/get-portfolio/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Find the portfolio item by ID
    const portfolioItem = await portfolio.findById(id);

    // If no item is found, return a 404 response
    if (!portfolioItem) {
      return res.status(404).json({ error: "Portfolio item not found." });
    }

    // Return the portfolio item
    res.status(200).json(portfolioItem);
  } catch (error) {
    console.error("Error fetching portfolio item:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});


app.listen(8000, ()=> console.log("server started"))

module.exports = app;



