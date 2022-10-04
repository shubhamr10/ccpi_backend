const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true,
    },
    nameSpace:{
        type:String,
        ref:'namespace',
        required:true
    },
    isMessageAllowed:{
        type:Boolean,
        default:true
    },
    archived:{
        type:Boolean,
        required:true,
        default:false
    },
    status:{
        type:Boolean,
        required:true,
        default:true
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

module.exports = Room = mongoose.model("room", roomSchema);