const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Secret key for signing JWT tokens
const secret_key = "ta8f4me7uSRtA8XM#a92%oPqr29"

// Verify Token middleware
const verifyToken = (req, res, next) =>{
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        // Next middleware
        next();
    } else {
        // Forbidden
        res.send({ result: "no login" });
    }
}

// Export the secret key and verifyToken middleware
module.exports = {
    secret_key,
    verifyToken
};