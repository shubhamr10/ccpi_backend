const mongoose = require("mongoose");

const informationSchema = new mongoose.Schema({
    heading:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    attachment:{
        type:String
    },
    type:{
        type:String,
        required:true,
        enum:["NEWS","ANNOUNCEMENT"]
    },
    flow:{
        type:String,
        required:true,
        enum:["GLOBAL","PROGRAMME","RC","SC"]
    },
    programme:{
        type:String,
        ref:'programme'
    },
    studyCentre:{
        type:String,
        ref:'centre'
    },
    regionalCentre:{
        type:String,
        ref:'centre'
    },
    uploadedBy:{
        type:String,
        required:true,
        ref:'user'
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

module.exports = Information = mongoose.model('information', informationSchema);