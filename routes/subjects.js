const express = require('express');
const router = express.Router();
const { check } = require("express-validator");
const errorValidator = require("../middleware/checkError.middleware");
const authValidator = require("../middleware/auth.middleware");
const subjectModel = require("../models/Subject.model");

/* GET home page. */
router.get('/', authValidator, async  (req, res, next) => {
   try{
    return res.json("OK")
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
* @POST = create a new subject
* */
router.post("/",
    authValidator,
    check("name","Subject name is required!").not().isEmpty(),
    check("code","Subject code is required!").not().isEmpty(),
    check("credits","Subject credit is required").not().isEmpty(),
    check("programme","Programme code is required").not().isEmpty(),
    check("semester","Code belongs to which semester is required").not().isEmpty(),
    errorValidator,
    async (req, res, next) => {
    try{
        const user = req.user;
        if(user.role === "63384059a63661c2fe1c478f" || user.role === "63384050a63661c2fe1c4784"){
            const { name, code, credits, programme, semester } = req.body;
            const newSubject = new subjectModel({
                name, code, credits, programme, semester
            });
            await newSubject.save();
            return res.json({
                success:true,
                error:false,
                data: "Subject created successfully"
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
* @GET Subjects with Programme code
* */
router.post("/get-programme-subjects", authValidator,
    check("programme_code","Programme code is required").not().isEmpty(), errorValidator,
    async(req, res, next) => {
    try{
        const programme = req.body.programme_code;
        const semester = req.body.semester;
        let query = { programme:programme };
        if(semester){
            query.semester = semester;
        }
        const subjectList = await subjectModel.find(query);
        return res.json({
            success:true,
            error:false,
            data: {
                list:subjectList,
                total:subjectList.length
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

module.exports = router;
