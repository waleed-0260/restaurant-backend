const mongoose = require("mongoose")

const authSchema = new mongoose.Schema({
    email: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    phone: {type: String, required: true},
    password: {type: String, required: true},
    confirmPassword: {type: String, required: true}
})

const auth = mongoose.model("authSchema", authSchema)

module.exports = auth;