const mongoose = require("mongoose")

const blogsSchema = new mongoose.Schema({
    heading:{type:String, required: true},
    description: {type: String, required: true},
    text:{type: String, required: true},
    AuthorName:{type:String, required: true},
    authorTitle:{type:String, required: true},
}, { timestamps: true } );

const blogs = mongoose.model("blogsSchema", blogsSchema)

module.exports = blogs;