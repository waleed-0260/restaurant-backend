const mongoose = require("mongoose")

const connection = async(db)=>{
    return mongoose.connect(db);
}

module.exports = connection;