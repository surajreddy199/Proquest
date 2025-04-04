const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BooksChaptersPublishedSchema = new Schema({
    academic_year: { type: String, required: true },
    publication_type: { 
        type: String, 
        enum: [
            'text_reference_book_international',
            'chapter_edited_book_international',
            'subject_book_national',
            'chapter_edited_book_national',
            'subject_book_local',
            'chapter_edited_book_local',
            'chapter_knowledge_volume_international',
            'chapter_knowledge_volume_national'
        ], 
        required: true 
    },
    entries: [
        {
            title: { type: String, required: true },
            publication_link: { type: String, required: true },
            document: { type: String, required: true }, // Save file path
            score: { type: Number, required: true },
            publication_type: { 
                type: String, 
                enum: [
                    'text_reference_book_international',
                    'chapter_edited_book_international',
                    'subject_book_national',
                    'chapter_edited_book_national',
                    'subject_book_local',
                    'chapter_edited_book_local',
                    'chapter_knowledge_volume_international',
                    'chapter_knowledge_volume_national'
                ], 
                required: true 
            } // Add publication_type inside each entry
        }
    ],
    booksChaptersTotalScore: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now }
});

// Middleware to automatically set entry publication_type from top-level publication_type
BooksChaptersPublishedSchema.pre('validate', function (next) {
    // Automatically set the publication_type for each entry if not provided
    this.entries = this.entries.map(entry => ({
        ...entry,
        publication_type: entry.publication_type || this.publication_type // Use top-level publication_type if not set
    }));
    next();
});

module.exports = mongoose.model('bookschapterspublished', BooksChaptersPublishedSchema);