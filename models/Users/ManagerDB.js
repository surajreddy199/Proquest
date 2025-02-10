const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const ManagerDB = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    resetPasswordToken: {type: String},
    resetPasswordExpires: {type: Date},
    date: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('management_user', ManagerDB, 'management_user');