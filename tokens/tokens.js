const jwt = require("jsonwebtoken");

process.env.REFRESH_TOKEN_SECRET = "secret";
process.env.ACCESS_TOKEN_SECRET = "secret";

const createAccessToken = (email) => {
    return jwt.sign(
        { email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
    );
}



const createRefreshToken = (email) => {
    return jwt.sign(

        { email },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
    )
}
module.exports = { createAccessToken, createRefreshToken }