const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const AdditionalResourcesSchema = new Schema({
    academic_year: {
        type: String,
        required: true
    },
    materials: {
        type: String,
        required: true
    },
    scoreThree: {
        type: Number,
        required: true,
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

module.exports = mongoose.model('additionalresources', AdditionalResourcesSchema);
