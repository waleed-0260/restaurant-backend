const mongoose = require("mongoose")

const contactSchema = new mongoose.Schema({
    name:{type: String, required: true},
    email:{type:String, required: true},
    phone:{type:String, required: true},
    message:{type: String, requried:true}
});

const contact = mongoose.model("contactSchema", contactSchema)

module.exports = contact;