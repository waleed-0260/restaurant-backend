const items = require("../models/items.js")
const {getUser} = require("../services/auth.js")

const handleAddItems = async(req,res)=>{
    try{
        const token = req.cookies.adminUser;

        // Decode token to extract user details
        const { id: adminId, restaurantName } = getUser(token);

        const{name, description, price, category, ingredients, tags} = req.body;
        const image = req.file ? req.file.path : null;
        await items.create({
            name, description, price, category, ingredients, tags, adminId, restaurantName, image
        })
        return res.status(200).json({success:"items added successfully"})
    }
    catch (error) {
        return res.status(404).json({failed:error})
    }
}

const handleGetItems = async(req, res)=>{
    // const category = req.params.category;
    const getAllItems = await items.find({});
    console.log("get All Items", getAllItems)
    return res.json(getAllItems);
}

module.exports = {handleAddItems, handleGetItems}