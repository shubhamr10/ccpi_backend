const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
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