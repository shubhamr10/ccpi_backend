const express = require('express');
const router = express.Router();
const errorValidator = require("../middleware/checkError.middleware");
const authValidator = require("../middleware/auth.middleware");
const {check} = require("express-validator");
const roomModel = require("../models/Room.model");

/* GET home page. */
router.post('/', authValidator,
    check("nameSpace","namespaceId is required").not().isEmpty(),
    async(req, res, next) => {
    try{
        const { nameSpace } = req.body;
        const roomsList = await roomModel.find({nameSpace:nameSpace});
        return res.json({
            success:true,
            error:false,
            data:{
                list:roomsList,
                total:roomsList.length
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
* CREATE ROOM
* */
router.post("/create", authValidator,
    check("name","room name is required!").not().isEmpty(),
    check("type", "room type is required").not().isEmpty(),
    check("nameSpace","namespace id is required!").not().isEmpty(),
    errorValidator,
    async(req, res, next) => {
    try{
        const { name, type, nameSpace, isMessageAllowed } = req.body;
        const newRoom = new roomModel({
            name, type, nameSpace, isMessageAllowed
        });
        await newRoom.save();
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
})

module.exports = router;
