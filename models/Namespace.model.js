const mongoose = require("mongoose");

const nameSpaceSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
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
})

module.exports = NameSpace = mongoose.model("namespace", nameSpaceSchema);