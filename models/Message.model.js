const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    message:{
        type:String,
        required:true
    },
    room:{
        type:String,
        ref:'room',
        required:true
    },
    date_created: {
        type: Date,
        default: Date.now()
    },
    date_updated: {
        type: Date,
        default: Date.now()
    }
});

module.exports = Message = mongoose.model("message", messageSchema);