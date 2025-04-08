const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InvitedLecturesSchema = new Schema({
    academic_year: { type: String, required: true },
    lecture_type: { 
        type: String, 
        enum: ['international', 'national'], 
        required: true 
    },
    entries: [
        {
            title: { type: String, required: true },
            event: { type: String, required: true },
            date: { type: Date, required: true },
            document: { type: String, required: true }, // Save file path
            score: { type: Number, required: true },
            lecture_type: { 
                type: String, 
                enum: ['international', 'national'], 
                required: true 
            } // Add lecture_type inside each entry
        }
    ],
    invitedLecturesTotalScore: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now }
});

// Middleware to automatically set entry lecture_type from top-level lecture_type
InvitedLecturesSchema.pre('validate', function (next) {
    // Automatically set the lecture_type for each entry if not provided
    this.entries = this.entries.map(entry => ({
        ...entry,
        lecture_type: entry.lecture_type || this.lecture_type // Use top-level lecture_type if not set
    }));
    next();
});

module.exports = mongoose.model('invitedlectures', InvitedLecturesSchema);