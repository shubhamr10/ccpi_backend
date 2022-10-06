const express = require('express');
const router = express.Router();
const messageModel = require("../models/Message.model");
const authValidator = require("../middleware/auth.middleware");
const errorValidator = require("../middleware/checkError.middleware");
const {check} = require("express-validator");

/* GET home page. */
router.post('/get-messages', authValidator,
    check("room","Room is required!").not().isEmpty(), errorValidator
    ,async (req, res, next) => {
        const { room } = req.body;
        const messageList = await messageModel.find({ room: room }).populate('user', '_id name email').sort({ date_created:-1 });
        return res.json({
            success:true,
            error:false,
            data:{
                list:messageList,
                total:messageList.length
            }
        })
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
        const { id } = req.user;
        const { message, room } = req.body;
        const newMessage = new messageModel({
            message, room, user:id
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
