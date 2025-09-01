const jwt = require('jsonwebtoken');
const User = require('../models/user');

const userAuth = async (req, res, next) => {
    try {
        // read the token from request cookies
    
    const { token } = req.cookies;
    if (!token) {
        throw new Error("token is not valid");
    }
    // validate the token
    const decodedObj = await jwt.verify(token, "Dev@sairam10");
    const {_id} = decodedObj;
    // find the user
    const user = await User.findById(_id);
    if (!user) {
        throw new Error("user not found")
    }
    req.user = user;
    next();
    } catch (err) {
        res.status(400).send("Error: " + err.message);
    }
};

module.exports = {
    userAuth,
}