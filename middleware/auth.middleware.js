const jwt = require("jsonwebtoken");
const config = require("config");
const userModel = require("../models/User.model");

module.exports = (req, res, next) => {

    const token = req.header("x-auth-token");
    if(!token) return res.status(401).json({
        success:false,
        error:true,
        errors: [{msg: "auth denied! no token"}]
    })
    try{
        const decodedToken = jwt.verify(token, config.get("jwtSecret"), null, null);
        const userId = decodedToken.user.id;
        if(!userId) return res.status(401).json({
            success:false,
            error:true,
            errors: [{msg: "auth denied! no token"}]
        });

        req.user = decodedToken.user;
        next();
    } catch (e) {
        return res.status(401).json({
            success:false,
            error:true,
            errors: [{msg: "auth denied! no token"}]
        })
    }
}