const mongoose = require("mongoose")

const itemSchema = new mongoose.Schema({
    adminId: {type: mongoose.Schema.Types.ObjectId,
        ref: "adminSchema", // Reference to the auth model
        required: true},
    name:{type:String, required: true},
    description:{type: String, required: true},
    price:{type:String, required: true},
    category: {type:String, required: true},
    ingredients: {
        type: [String], // Array of ingredient names
        default: [],
    },
    tags: {
        type: [String],
        default: [],
    },
    restaurantName: {type:String, required: true},
    image: { type: String, required: true },
})

const items = mongoose.model("itemSchema", itemSchema)

module.exports = items;