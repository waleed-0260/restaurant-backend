const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

dotenv.config();

let jwtSecretKey = process.env.JWT_SECRET_KEY;


function setUser(user) {
    const setJwt = jwt.sign(user, jwtSecretKey)
    // console.log("setjwt", setJwt)
    return setJwt;
}

function getUser(id) {
    const verified = jwt.verify(id, jwtSecretKey);
    // console.log("verified", verified)
    return verified;
}

module.exports = {setUser, getUser}