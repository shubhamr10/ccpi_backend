const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    code:{
        type:String,
        required:true
    },
    credits:{
        type:Number,
        required:true
    },
    programme:{
        type:String,
        ref:'programme',
        required:true
    },
    semester:{
        type:Number,
        required:true,
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

module.exports = Subject = mongoose.model("subject", subjectSchema);