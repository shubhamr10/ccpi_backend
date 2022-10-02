const express = require('express');
const router = express.Router();
const { check } = require("express-validator");
const centreModel = require("../models/Center.model");
const authMiddleware = require("../middleware/auth.middleware");
const errorValidator = require("../middleware/checkError.middleware");

/* GET home page. */
router.get('/', authMiddleware, function(req, res, next) {
    res.render('index', { title: 'Express' });
});

/*
* POST create a new centre
* only to be done by the Admin & Managers
* RC can only be added by Admin
* SC can only be added by admin & managers
* */
router.post('/',
    authMiddleware,
    check("name","centre name is required").not().isEmpty(),
    check("email","centre name is required").not().isEmpty(),
    check("code","centre name is required").not().isEmpty(),
    check("type","centre name is required").not().isEmpty(),
    check("address","centre name is required").not().isEmpty(), errorValidator,
    async (req, res, next) => {
    try{
        const { name, email, code, type, rc_code, address } = req.body;
        if(["RC","SC","HQ"].indexOf(type) < 0){
            return res.status(403).json({
                success:false,
                error:true,
                errors: [{msg: "Invalid centre type"}]
            })
        }
        const user = req.user;

        let noChecks = user.role === "63384059a63661c2fe1c478f";
        if(noChecks || (type === "RC" && user.role === "63384050a63661c2fe1c4784") || (type === "SC" && (user.role === "63384050a63661c2fe1c4784" || user.role === "63384059a63661c2fe1c4789"))){
            if(type === "SC" && rc_code === ""){
                return res.status(400).json({
                    success:false,
                    error:true,
                    errors: [{msg: "regional centre code is required"}]
                })
            }
            const doesCentreExists = await centreModel.findOne({code});
            if(doesCentreExists) return res.status(400).json({
                success:false,
                error:true,
                errors: [{msg: "Role already exists"}]
            });

            const newCentre = new centreModel({
                name, email, code, type, rc_code, address
            });
            await newCentre.save();
            return res.json({
                success:true,
                error:false,
                data: "Centre created successfully"
            })
        } else {
            return res.status(400).json({
                success:false,
                error:true,
                errors: [{msg: "Unauthorised to create centres"}]
            })
        }
    } catch (e) {
        console.log(e);
        return res.status(400).json({
            success:false,
            error:true,
            errors: [{msg: "Internal server error"}]
        });
    }
});

/*
* @GET ALL Regional centres
* */
router.post("/rc", authMiddleware, async (req, res, next) => {
    try{
        let rcList = await centreModel.find({type:"RC"});
        return res.json({
            success:true,
            error:false,
            data: {
                list:rcList,
                total:rcList.length
            }
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

/*
* @GET ALL SC centres with RC
* */
router.post("/sc",
    check("rc_code", "Regional centre code is required!").not().isEmpty(), errorValidator,
    authMiddleware, async (req, res, next) => {
    try{
        const { rc_code } = req.body;
        let scList = await centreModel.find({rc_code:rc_code});
        return res.json({
            success:true,
            error:false,
            data: {
                list:scList,
                total:scList.length
            }
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
