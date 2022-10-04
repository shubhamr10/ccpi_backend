const express = require('express');
const router = express.Router();
const informationModel = require("../models/Information.model");
const errorValidator = require("../middleware/checkError.middleware");
const authValidator = require("../middleware/auth.middleware");
const {check} = require("express-validator");

/* GET home page. */
router.post('/list', authValidator, async function(req, res, next) {
    try{
        const informationLists = await informationModel.find({status:true});
        return res.json({
            success:true,
            error:false,
            data: {
                list:informationLists,
                total:informationLists.length
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

router.post("/", authValidator,
    check("heading","Information heading is required!").not().isEmpty(),
    check("content","Information content is required!").not().isEmpty(),
    check("type","Information type is required").not().isEmpty(),
    check("flow","information flow is reqired").not().isEmpty(), errorValidator,
    async (req, res, next) => {
    try{
        const user = req.user;
        const { heading, content, attachment, type, flow, programme, studyCentre, regionalCentre, uploadedBy } = req.body;
        const newInformation = new informationModel({
            heading, content, attachment, type, flow, programme, studyCentre, regionalCentre, uploadedBy:user.id
        })
        await newInformation.save();
        return res.json({
            success:true,
            error:false,
            data: "Information created successfully"
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

// TODO : Get Information

module.exports = router;
