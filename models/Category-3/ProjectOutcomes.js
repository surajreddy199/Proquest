const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectOutcomesSchema = new Schema({
    academic_year: { type: String, required: true },
    outcome_level: { 
        type: String, 
        enum: ['national', 'international'], 
        required: true 
    },
    entries: [
        {
            title: { type: String, required: true }, // Title of the output
            type: { 
                type: String, 
                enum: ['patent', 'technology_transfer', 'product', 'process'], 
                required: true 
            }, // Type of output
            description: { type: String, required: true }, // Brief description
            document: { type: String, required: true }, // Save file path
            score: { type: Number, required: true }, // Calculated score
            outcome_level: { 
                type: String, 
                enum: ['national', 'international'], 
                required: true 
            }
        }
    ],
    projectOutcomesTotalScore: { type: Number, required: true }, // Total score for all entries
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user
    createdAt: { type: Date, default: Date.now }
});

// Middleware to automatically set entry outcome_level from top-level outcome_level
ProjectOutcomesSchema.pre('validate', function (next) {
    // Automatically set the outcome_level for each entry if not provided
    this.entries = this.entries.map(entry => ({
        ...entry,
        outcome_level: entry.outcome_level || this.outcome_level // Use top-level outcome_level if not set
    }));
    next();
});



module.exports = mongoose.model('projectoutcomes', ProjectOutcomesSchema);