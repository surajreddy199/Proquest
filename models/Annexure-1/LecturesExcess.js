const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LecturesExcessSchema = new Schema({
    academic_year: {
        type: String,
        required: true
    },
    lecturesTaken: {
        type: Number,
        required: true
    },
    tutorialsTaken: {
        type: Number,
        required: true
    },
    
    practicalSessionsTaken: {
        type: Number,
        required: true
    },
    
    scoreTwo: {
        type: Number,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('lecturesexcess', LecturesExcessSchema);
