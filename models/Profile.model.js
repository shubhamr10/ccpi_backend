const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    user:{
        type:String,
        required:true,
        ref:'user'
    },
    programme:{
        type:String,
        ref:'programme'
    },
    regionalCentre:{
        type:String,
        ref:'centre'
    },
    studyCentre:{
        type:String,
        ref:'centre'
    },
    currentSemester:{
        type:Number,
    },
    subjects:[{
        type:String,
        ref:'subject'
    }],
    namespaces:[{
        type:String,
        ref:'namespace'
    }],
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

module.exports = Profile = mongoose.model('profile', profileSchema)