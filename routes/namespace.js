const express = require('express');
const router = express.Router();
const namespaceModel = require("../models/Namespace.model");
const errorValidator = require("../middleware/checkError.middleware");
const authValidator = require("../middleware/auth.middleware");
const {check} = require("express-validator");

/* GET all namespace. */
router.get('/', authValidator, async(req, res, next) => {
    try{
        const namespaceList = await namespaceModel.find();
        return res.json({
            success:true,
            error:false,
            data:{
                list:namespaceList,
                total:namespaceList.length
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
* @POST - create namespace
* */
router.post("/create",
    authValidator,
    check("name","Namespace name is required").not().isEmpty(),
    errorValidator,
    async (req, res, next) => {
    try{
        const { name } = req.body;
        const newNamespace = new namespaceModel({
            name
        });
        await newNamespace.save();
        return res.json({
            success:true,
            error:false,
            data: "Namespace created successfully"
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
* GET ALL namespace
* */

module.exports = router;
