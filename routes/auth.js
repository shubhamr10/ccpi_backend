const express = require('express');
const router = express.Router();
const { check } = require("express-validator");
const userModel = require("../models/User.model");
const errorValidator = require("../middleware/checkError.middleware");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");


/* GET home page. */
router.get('/', function(req, res, next) {

});

/* POST: Authenticate user and get token */
router.post("/",
    check("email","please provide a valid email!").isEmail(),
    check("password","provide a valid password").exists(),
    check("password","Invalid credentials").isLength({min:6}),
    errorValidator,
    async (req, res, next) => {

    try{
        const { email, password } = req.body;

        const user = await userModel.findOne({email});
        if(!user) return res.status(401).json({
            success:false,
            error:true,
            errors: [{msg: "Invalid credentials"}]
        });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid)  return res.status(401).json({
            success:false,
            error:true,
            errors: [{msg: "Invalid credentials"}]
        });

        const payload = {
            user : {
                id : user.id,
                role: user.role
            }
        };
        console.log(config.get("jwtSecret"))
        jwt.sign(payload, config.get('jwtSecret'), {expiresIn: 3600000}, (err, token) => {
            if (err) throw err;
            else return res.status(200).json({
                success:true,
                error:false,
                data: token
            })
        })
    } catch (e) {
        console.log(e);
        return res.status(400).json({
            success:false,
            error:true,
            errors: [{msg: "Internal server error"}]
        });
    }
})

module.exports = router;
