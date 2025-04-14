const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeachingContributionSchema = new Schema({
    academic_year: { type: String, required: true },
    entries: [
        {
            subject_name: { type: String, required: true },
            lectures_delivered: { type: Number, required: true },
            lectures_allocated: { type: Number, required: true},
            tutorials_delivered: { type: Number, required: true},
            tutorials_allocated: { type: Number, required: true},
            practical_sessions_delivered: { type: Number, required: true},
            practical_sessions_allocated: { type: Number, required: true}
        }
    ],
    scoredOne: { type: Number, required: true,min:0, max: 50 }, // Total score for the page
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('teachingcontribution', TeachingContributionSchema);