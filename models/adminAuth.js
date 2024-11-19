const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    restaurantName: {type: String, required: true},
    restaurantType: {type: String, required: true},
    location: {type:String, required: true},
    ownerName: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    // confirmPassword: {type: String, required: true}
})

const admin = mongoose.model("adminSchema", adminSchema)

module.exports = admin;