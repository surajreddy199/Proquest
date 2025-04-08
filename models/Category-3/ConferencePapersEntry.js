const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConferencePapersSchema = new Schema({
    academic_year: { type: String, required: true },
    event_type: { 
        type: String, 
        enum: ['international', 'national', 'regional', 'local'], 
        required: true 
    },
    entries: [
        {
            title: { type: String, required: true }, // Title of the paper
            event_name: { type: String, required: true }, // Name of the event
            date: { type: Date, required: true }, // Date of the event
            presentation_type: { 
                type: String, 
                enum: ['oral', 'poster'], 
                required: true 
            }, // Presentation type
            document: { type: String, required: true }, // File path for the document
            event_type: { 
                type: String, 
                enum: ['international', 'national', 'regional', 'local'], 
                required: true 
            },
            score: { type: Number, required: true } // Calculated score
        }
    ],
    conferencePapersTotalScore: { type: Number, required: true }, // Total score for all entries
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user
    createdAt: { type: Date, default: Date.now }
});

// Middleware to automatically set entry event_type from top-level event_type
ConferencePapersSchema.pre('validate', function (next) {
    // Automatically set the event_type for each entry if not provided
    this.entries = this.entries.map(entry => ({
        ...entry,
        event_type: entry.event_type || this.event_type // Use top-level event_type if not set
    }));
    next();
});

module.exports = mongoose.model('conferencepapers', ConferencePapersSchema);