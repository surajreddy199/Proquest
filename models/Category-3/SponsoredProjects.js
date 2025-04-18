const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SponsoredProjectsSchema = new Schema({
    academic_year: { type: String, required: true },
    project_type: { 
        type: String, 
        enum: [
            'major_above_30_lakhs',
            'major_5_to_30_lakhs',
            'minor_50k_to_5_lakhs'
        ], 
        required: true 
    },
    entries: [
        {
            title: { type: String, required: true },
            funding_agency: { type: String, required: true },
            amount: { type: Number, required: true,min: 50000 }, // Amount mobilized
            document: { type: String, required: true }, // Save file path
            score: { type: Number, required: true },
            project_type: { 
                type: String, 
                enum: [
                    'major_above_30_lakhs',
                    'major_5_to_30_lakhs',
                    'minor_50k_to_5_lakhs'
                ], 
                required: true 
            } // Add project_type inside each entry
        }
    ],
    sponsoredProjectsTotalScore: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now }
});

// Middleware to automatically set entry project_type from top-level project_type
SponsoredProjectsSchema.pre('validate', function (next) {
    // Automatically set the project_type for each entry if not provided
    this.entries = this.entries.map(entry => ({
        ...entry,
        project_type: entry.project_type || this.project_type // Use top-level project_type if not set
    }));
    next();
});

module.exports = mongoose.model('sponsoredprojects', SponsoredProjectsSchema);