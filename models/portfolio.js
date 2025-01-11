const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema(
  {
    heading: { type: String, required: true },
    tagline: { type: String, required: true },
    tags: [{ type: String, required: true }],
    description: { type: String, required: true },
    masterFloorImage: { type: String, required: true },
    panelFloorImage: { type: String, required: true },
    challenge: { type: String, required: true },
    mapImage: { type: String, required: true },
    renderingImage: { type: String, required: true },
    additionalImage: { type: String, required: true }, // Added the "one more image" field
    solution: { type: String, required: true }, // Keeping solution unchanged
    solutionImage: { type: String, required: true },
  },
  { timestamps: true }
);

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

module.exports = Portfolio;
