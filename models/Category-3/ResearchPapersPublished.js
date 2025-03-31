const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResearchPapersPublishedSchema = new Schema({
    academic_year: { type: String, required: true },
    publication_type: { type: String, enum: ['refereed', 'non-refereed', 'conference'], required: true },
    journals: [
        {
            journal_title: { type: String, required: true },
            publication_link: { type: String, required: true },
            journal_document: { type: String, required: true }, // Save file path
            score: { type: Number, required: true }
        }
    ],
    total_score: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('researchpaperspublished', ResearchPapersPublishedSchema);
