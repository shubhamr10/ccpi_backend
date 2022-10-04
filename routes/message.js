const express = require('express');
const router = express.Router();
const messageModel = require("../models/Message.model");
const authValidator = require("../middleware/auth.middleware");
const errorValidator = require("../middleware/checkError.middleware");
const {check} = require("express-validator");

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

/*
* @post message
* */

router.post("/add-message", authValidator,
    check("message","please enter a message").not().isEmpty(),
    check("room","room-id is required!").not().isEmpty(),
    errorValidator,
    async (req, res, next) => {
    try{
        const { message, room } = req.body;
        const newMessage = new messageModel({
            message, room
        });
        await newMessage.save();
        return res.json({
            success:true,
            error:false,
            data: "Message created successfully"
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
