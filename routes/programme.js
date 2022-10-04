const express = require('express');
const router = express.Router();
const { check } = require("express-validator");
const errorValidator = require("../middleware/checkError.middleware");
const authValidator = require("../middleware/auth.middleware");
const programmeModel = require("../models/Programme.model");

/* GET all programme page. */
router.get('/', authValidator,  async (req, res, next) => {
    try{
        const programmeList = await programmeModel.find({status:true});
        return res.json({
            success:true,
            error:false,
            data: {
                list:programmeList,
                total:programmeList.length
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
});

/*
* @POST = Create a new Programme
* */
router.post("/",
    check("name","Programme name is required!").not().isEmpty(),
    check("code","Programme code is required!").not().isEmpty(),
    check("total_semester","Total semester in programme is required!").not().isEmpty(), errorValidator, authValidator,
    async(req, res, next) => {
    try{
        const user = req.user;
        if(user.role === "63384059a63661c2fe1c478f" || user.role === "63384050a63661c2fe1c4784"){
            const { name, code, total_semester } = req.body;
            const doesProgrammeExists = await programmeModel.findOne({ code :code  });
            if(doesProgrammeExists) return res.status(400).json({
                success:false,
                error:true,
                errors: [{msg: "Programme already exists"}]
            });
            console.log(name, code, total_semester)
            const newProgramme = new programmeModel({
                name, code, total_semesters:parseInt(total_semester)
            });
            await newProgramme.save();
            return res.json({
                success:true,
                error:false,
                data: "Programme created successfully"
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

module.exports = router;
