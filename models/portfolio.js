const mongoose = require("mongoose")

const portfolioSchema = new mongoose.Schema({
    heading:{type:String, required: true},
    tagline:{type:String, required: true},
    tags: [{type:String, required: true}],
    description:{type: String, required: true},
    descriptionImage:{type:String, required: true},
    challenge:{type:String, requried: true},
    challengeImage: {type:String, required:true},
    solution:{type:String, requried: true},
    solutionImage: {type:String, required:true},
}, { timestamps: true } );

const portfolio = mongoose.model("portfolioSchema", portfolioSchema)

module.exports = portfolio;