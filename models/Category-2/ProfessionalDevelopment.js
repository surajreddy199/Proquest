const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfessionalDevelopmentSchema = new Schema({
    academic_year: {
        type: String,
        required: true
    },
    seminars: {
        type: Boolean,
        default: false
    },
    professionalBody: {
        type: Boolean,
        default: false
    },
    professionalBodyDetails: {
        type: String,
        default: ''
    },
    document: {
        type: String,
        default: ''
    },
    scoreEight: {
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

module.exports = mongoose.model('professionaldevelopment', ProfessionalDevelopmentSchema);