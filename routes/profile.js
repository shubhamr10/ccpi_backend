const express = require('express');
const router = express.Router();
const authValidator = require("../middleware/auth.middleware");
const errorValidator = require("../middleware/checkError.middleware");
const { check } = require("express-validator");
const profileModel = require("../models/Profile.model");

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

/*
* @Creeate student
* */
router.post("/create-profile",authValidator,
    check("user","user-id is required").not().isEmpty(),
    check("programme","program-id is required").not().isEmpty(),
    check("regionalCentre","regional-centre is required!").not().isEmpty(),
    check("studyCentre","study-centre is required!").not().isEmpty(),
    check("currentSemester","current semster is required!").not().isEmpty(),
    check("subjects","subjects is required!").not().isEmpty(),
    errorValidator,
    async(req, res, next) => {
    try{
        const { user, programme, regionalCentre, studyCentre, currentSemester, subjects } = req.body;
        const newProfile = new profileModel({
            user, programme, regionalCentre, studyCentre, currentSemester, subjects
        });
        await newProfile.save();
        return res.json({
            success:true,
            error:false,
            data: "Profile created successfully"
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
