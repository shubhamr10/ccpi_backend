const mongoose = require("mongoose");

const programmeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    code : {
        type:String,
        required: true
    },
    total_semesters:{
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

module.exports = Programme = mongoose.model("programme", programmeSchema);