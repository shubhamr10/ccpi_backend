const mongoose = require("mongoose");

const centreSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    code : {
        type :String,
        required: true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    type:{
        type:String,
        required:true,
        enum:["RC", "SC","HQ"]
    },
    rc_code:{
        type:String,
    },
    address:{
        type:String,
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

module.exports = Centre = mongoose.model('centre', centreSchema);