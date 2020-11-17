const { verify } = require("jsonwebtoken");

process.env.ACCESS_TOKEN_SECRET_KEY = "secret";



const isAuth = (req, res) => {

    const authorization = req.headers['authorization'];
    if (!authorization) {
        throw new Error(`User need to be login`);
    }
    //Bearer Token (request)
    const token = authorization.split(' ')[1];
    console.log(token)
    const decoded = verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
    return decoded;

}

module.exports = { isAuth }