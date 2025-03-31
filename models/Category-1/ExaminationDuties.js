const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExaminationDutiesSchema = new Schema({
    academic_year: {
        type: String,
        required: true
    },
    invigilation: {
        type: Boolean,
        default: false
    },
    questionPaperSetting: {
        type: Boolean,
        default: false
    },
    evaluationAnswerScripts: {
        type: Boolean,
        default: false
    },
    paperModeration: {
        type: Boolean,
        default: false
    },
    labEvaluation: {
        type: Boolean,
        default: false
    },
    scoreFive: {
        type: Number,
        required: true,
        max: 25
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

module.exports = mongoose.model('examinationduties', ExaminationDutiesSchema);
