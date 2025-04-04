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
            score: { type: Number, required: true },
            publication_type: { 
                type: String, 
                enum: ['refereed', 'non-refereed', 'conference'], 
                required: true 
            } // Add publication_type inside each journal
        }
    ],
    total_score: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now }
});

// Middleware to automatically set journal publication_type from top-level publication_type
ResearchPapersPublishedSchema.pre('validate', function (next) {
    // Automatically set the publication_type for each journal if not provided
    this.journals = this.journals.map(journal => ({
        ...journal,
        publication_type: journal.publication_type || this.publication_type // Use top-level publication_type if not set
    }));
    next();
});

module.exports = mongoose.model('researchpaperspublished', ResearchPapersPublishedSchema);
