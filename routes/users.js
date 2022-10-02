const express = require('express');
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const userModel = require("../models/User.model");
const errorValidator = require("../middleware/checkError.middleware");

/* GET users listing. */
router.post('/create-user',
    check("name","Name is required!").not().isEmpty(),
    check("email","Valid email is required!").isEmail(),
    check("password","Valid password is required!").isLength({min: 6}),
    check("role","Role is required").not().isEmpty(), errorValidator,
    async (req, res, next) =>  {


      try{
        const { name, email, password, role } = req.body;

        const doesUserAlreadyExists = await userModel.findOne({email});
        if(doesUserAlreadyExists) return res.status(400).json({
          success:false,
          error:true,
          errors: [{msg: "User already exists"}]
        });

        let newUser = new userModel({
          name, email, role, password
        });

        const _salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, _salt);

        await newUser.save();
        return res.json({
          success:true,
          error:false,
          data: "User created successfully"
        })
      } catch (e) {
        console.log(e);
        return res.status(400).json({
          success:false,
          error:true,
          errors: [{msg: "Internal server error"}]
        });
      }
});

module.exports = router;
