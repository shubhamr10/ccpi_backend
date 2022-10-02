const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        ref:'roles'
    },
    archived:{
        type:Boolean,
        required:true,
        default:false
    },
    status:{
        type:Boolean,
        required:true,
        default:false
    },
    avatar:{
        type:String
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

module.exports = User = mongoose.model('user', UserSchema);