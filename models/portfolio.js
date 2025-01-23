const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema(
  {
    heading: { type: String, required: true },
    tagline: { type: String, required: true },
    // tags: [{ type: String, required: true }],
    description: { type: String, required: true },
    masterFloorImage: { type: String, required: true },
    panelFloorImage: { type: String  },
    mapImage: { type: String },
    renderingImage: { type: String },
    additionalImage: { type: String },
    challenge: { type: String },
    solution: { type: String}, 
    value: {type: String},
    // solutionImage: { type: String, required: true },
    // CLIENT INFORMATION
    clientName: {type:String, required: true},
    Location:{type: String, required: true},
    Date:{type:String, required: true},
    Value:{type:String},
    Role:{type:String}
  },
  { timestamps: true }
);

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

module.exports = Portfolio;
