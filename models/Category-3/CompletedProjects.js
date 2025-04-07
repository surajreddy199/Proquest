const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompletedProjectsSchema = new Schema({
    academic_year: { type: String, required: true }, // Academic year of the project
    project_type: { 
        type: String, 
        enum: ['Major', 'Minor'], // Major or Minor project
        required: true 
    },
    entries: [
        {
            title: { type: String, required: true }, // Title of the completed project
            quality_evaluation: { 
                type: String, 
                required: true, 
                validate: {
                    validator: function (value) {
                        return /^(Yes|No)$/i.test(value); // Allow case-insensitive "Yes" or "No"
                    },
                    message: 'Quality Evaluation must be "Yes" or "No".'
                }
            },
            report_accepted: { 
                type: String, 
                required: true, 
                validate: {
                    validator: function (value) {
                        return /^(Yes|No)$/i.test(value); // Allow case-insensitive "Yes" or "No"
                    },
                    message: 'Report Accepted must be "Yes" or "No".'
                }
            },
            document: { type: String, required: true }, // File path for uploaded document
            score: { type: Number, required: true }, // Calculated score for the project
            project_type: { 
                type: String, 
                enum: ['Major', 'Minor'], // Major or Minor project
                required: true 
            } // Add project_type inside each entry
        }
    ],
    completedProjectsTotalScore: { type: Number, required: true }, // Total score for all entries
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user
    createdAt: { type: Date, default: Date.now } // Timestamp for creation
});

// Middleware to automatically set entry project_type from top-level project_type
CompletedProjectsSchema.pre('validate', function (next) {
    // Automatically set the project_type for each entry if not provided
    this.entries = this.entries.map(entry => ({
        ...entry,
        project_type: entry.project_type || this.project_type // Use top-level project_type if not set
    }));
    next();
});

// Middleware to convert quality_evaluation and report_accepted to lowercase
CompletedProjectsSchema.pre('save', function (next) {
    this.entries = this.entries.map(entry => ({
        ...entry,
        quality_evaluation: entry.quality_evaluation.toLowerCase(), // Convert to lowercase
        report_accepted: entry.report_accepted.toLowerCase() // Convert to lowercase
    }));
    next();
});

module.exports = mongoose.model('completedprojects', CompletedProjectsSchema);