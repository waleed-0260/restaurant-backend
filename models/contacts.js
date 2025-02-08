const mongoose = require("mongoose")

const contactSchema = new mongoose.Schema({
    name:{type: String},
    email:{type:String},
    phone:{type:String},
    message:{type: String }
}, { timestamps: true } );

const contact = mongoose.model("contactSchema", contactSchema)

module.exports = contact;