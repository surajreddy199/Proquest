const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LecturesExcessSchema = new Schema({
    academic_year: { type: String, required: true },
    entries: [
        {
            subject_name: { type: String, required: true },
            lectures_taken: { type: Number, required: true },
            tutorials_taken: { type: Number, required: true },
            practical_sessions_taken: { type: Number, required: true }
        }
    ],
    scoredTwo: { type: Number, required: true, min: 0, max: 10 }, // Total score for the page
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('lecturesexcess', LecturesExcessSchema);