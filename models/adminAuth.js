const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    fullName:{type: String, required: true},
    email:{type: String, required: true},
    password:{type:String, required: true}
    // confirmPassword: {type: String, required: true}
}, {timeStamp: true})

const admin = mongoose.model("adminSchema", adminSchema)

module.exports = admin;