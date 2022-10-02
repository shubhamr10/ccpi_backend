const mongoose = require("mongoose");
const { v4: uuid } = require('uuid');

const roleSchema = new mongoose.Schema({
    uid:{
        type:String,
        default:uuid()
    },
    role_name:{
        type:String,
        required:true
    },
    role_permission:[String],
    date_created: {
        type: Date,
        default: Date.now()
    },
    date_updated: {
        type: Date,
        default: Date.now()
    }
})

module.exports = Roles = mongoose.model('roles', roleSchema);