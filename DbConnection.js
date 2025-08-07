const mongoose = require("mongoose")

const connection = async(db)=>{
    return await mongoose.connect(db);
}

module.exports = connection;