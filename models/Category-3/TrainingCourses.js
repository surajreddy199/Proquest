const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TrainingCoursesSchema = new Schema({
    academic_year: { type: String, required: true },
    duration_type: { 
        type: String, 
        enum: [
            'two_weeks', // Not less than two weeks duration (20/each)
            'one_week'   // One week duration (10/each)
        ], 
        required: true 
    },
    entries: [
        {
            programme_title: { type: String, required: true },
            organizing_institution: { type: String, required: true },
            duration: { type: String, required: true }, // Duration in weeks
            course_type: { 
                type: String, 
                enum: [
                    'refresher_course',
                    'methodology_workshop',
                    'training_programme',
                    'teaching_learning_evaluation',
                    'soft_skills_development',
                    'faculty_development_programme'
                ], 
                required: true 
            },
            document: { type: String, required: true }, // Save file path
            duration_type: { 
                type: String, 
                enum: [
                    'two_weeks', // Not less than two weeks duration (20/each)
                    'one_week'   // One week duration (10/each)
                ], 
                required: true 
            },
            score: { type: Number, required: true }
        }
    ],
    trainingCoursesTotalScore: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now }
});

// Middleware to automatically set entry duration_type from top-level duration_type
TrainingCoursesSchema.pre('validate', function (next) {
    // Automatically set the duration_type for each entry if not provided
    this.entries = this.entries.map(entry => ({
        ...entry,
        duration_type: entry.duration_type || this.duration_type // Use top-level duration_type if not set
    }));
    next();
});

module.exports = mongoose.model('trainingcourses', TrainingCoursesSchema);