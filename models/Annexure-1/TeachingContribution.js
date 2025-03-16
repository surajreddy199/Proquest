const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeachingContributionSchema = new Schema({
    academic_year: {
        type: String,
        required: true
    },
    lecturesDelivered: {
        type: Number,
        required: true
    },
    lecturesAllocated: {
        type: Number,
        required: true
    },
    tutorialsDelivered: {
        type: Number,
        required: true
    },
    tutorialsAllocated: {
        type: Number,
        required: true
    },
    practicalSessionsDelivered: {
        type: Number,
        required: true
    },
    practicalSessionsAllocated: {
        type: Number,
        required: true
    },
    scoreOne: {
        type: Number,
        required: true
    },
    user: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('teachingcontribution', TeachingContributionSchema);
