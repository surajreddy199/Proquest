const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConsultancyProjectsSchema = new Schema({
    academic_year: { type: String, required: true }, // Academic year of the project
    entries: [
        {
            title: { type: String, required: true }, // Title of the consultancy project
            funding_agency: { type: String, required: true }, // Funding agency name
            amount: { type: Number, required: true, min: 1000000 }, // Amount mobilized (minimum Rs. 10.0 lakhs)
            document: { type: String, required: true }, // File path for uploaded document
            score: { type: Number, required: true } // Calculated score for the project
        }
    ],
    consultancyTotalScore: { type: Number, required: true }, // Total score for all entries
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user
    createdAt: { type: Date, default: Date.now } // Timestamp for creation
});



module.exports = mongoose.model('consultancyprojects', ConsultancyProjectsSchema);