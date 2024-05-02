const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    console.log(token);

    if (!token) {
        return res.status(401).json({ message: 'Token not provided' });
    }

    jwt.verify(token, process.env.JWT_SEC, (err, decoded) => {
        if (err) {
           return res.status(401).json({ message: 'Unauthorized' });
        } else {
            // Attach the decoded user object to the request for further use
            req.decoded = decoded;
            next(); // Call next to pass control to the next middleware
        }
    });
};

module.exports = verifyToken;
