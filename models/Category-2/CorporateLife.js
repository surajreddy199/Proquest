const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CorporateLifeSchema = new Schema({
    academic_year: {
        type: String,
        required: true
    },
    industryInteractions: {
        type: Boolean,
        default: false
    },
    academicCommittees: {
        type: Boolean,
        default: false
    },
    otherContributions: {
        type: Boolean,
        default: false
    },
    otherContributionsDetails: {
        type: String,
        default: ''
    },
    scoreSeven: {
        type: Number,
        required: false,
        max: 15
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

module.exports = mongoose.model('corporatelife', CorporateLifeSchema);