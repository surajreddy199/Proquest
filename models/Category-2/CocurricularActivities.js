const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CocurricularActivitiesSchema = new Schema({
    academic_year: {
        type: String,
        required: true
    },
    ncc: {
        type: Boolean,
        default: false
    },
    nss: {
        type: Boolean,
        default: false
    },
    otherActivities: {
        type: Boolean,
        default: false
    },
    otherActivitiesDetails: {
        type: String,
        default: ''
    },
    none: {
        type: Boolean,
        default: false
    },
    scoreSix: {
        type: Number,
        required: false,
        max: 20
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

module.exports = mongoose.model('cocurricularactivities', CocurricularActivitiesSchema);