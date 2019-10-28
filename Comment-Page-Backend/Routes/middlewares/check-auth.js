const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // console.log(req.headers);
        const token = req.headers.authorization.split(" ")[1]; //token needs to be sent in header, format of token - 'Bearer token'
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        // console.log('req.userData' , req.userData.email , req.userData.userId);
        next();
    }
    catch (error) {
        console.log(error);
        console.log('JWT verify failed')
        return res.status(401).json({ msg: "Incorrect Email or Password" });
    }
}