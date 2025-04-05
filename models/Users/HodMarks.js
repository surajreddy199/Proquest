const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const HodMarks = new Schema({
    academic_year: {
        type: Number,
        required: true
    },
    faculty_name: {
        type: String,
        required: true
    },
    faculty_email: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    
    category_1: {
        type: Number,
        required: true
    },
    category_2: {
        type: Number,
        required: true
    },
    category_3: {
        type: Number,
        required: true
    },
    confidential: {
        type: Number,
        require: true
    }, 
    facultyA1: {
        type: Number,
        required: true
    },
    facultyA2: {
        type: Number,
        required: true
    },
    facultyA3: {
        type: Number,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('hod-marks', HodMarks, 'hod-marks');