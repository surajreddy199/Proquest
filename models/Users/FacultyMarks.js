const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const FacultyMarks = new Schema({
    academic_year: {
        type: Number,
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
    user: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('faculty-marks', FacultyMarks, 'faculty-marks');