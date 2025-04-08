const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResearchGuidanceSchema = new Schema({
    academic_year: { type: String, required: true },
    guidance_type: { 
        type: String, 
        enum: [
            'mphil', // M.Phil.
            'phd'    // Ph.D.
        ], 
        required: true 
    },
    entries: [
        {
            candidate_name: { type: String, required: true }, // Candidate's name
            status: { 
                type: String, 
                enum: [
                    'degree_awarded',    // Degree Awarded
                    'thesis_submitted'  // Thesis Submitted (for Ph.D. only)
                ], 
                required: true 
            },
            description: { type: String, required: false }, // Optional description
            document: { type: String, required: true }, // Save file path
            guidance_type: { 
                type: String, 
                enum: [
                    'mphil', // M.Phil.
                    'phd'    // Ph.D.
                ], 
                required: true 
            },
            score: { type: Number, required: true } // Score based on status
        }
    ],
    researchGuidanceTotalScore: { type: Number, required: true }, // Total score for all entries
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user
    createdAt: { type: Date, default: Date.now }
});

// Middleware to automatically set entry guidance_type from top-level guidance_type
ResearchGuidanceSchema.pre('validate', function (next) {
    // Automatically set the guidance_type for each entry if not provided
    this.entries = this.entries.map(entry => ({
        ...entry,
        guidance_type: entry.guidance_type || this.guidance_type // Use top-level guidance_type if not set
    }));
    next();
});

module.exports = mongoose.model('researchguidance', ResearchGuidanceSchema);