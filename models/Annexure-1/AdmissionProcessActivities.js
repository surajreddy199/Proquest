const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const AdmissionProcessActivities = new Schema({
    academic_year: {
        type: Number,
        required: true
    },
    admission_role: {
        type: String,
        required: true
    },
    admission_duties: {
        type: String,
        required: true
    },
    admission_class: {
        type: String,
        required: true
    },
    admission_start_date: {
        type: String,
        required: true
    },
    admission_end_date: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    }
});

mongoose.model('admissionprocess', AdmissionProcessActivities);