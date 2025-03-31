const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InnovativeTeachingSchema = new Schema({
    academic_year: {
        type: String,
        required: true
    },
    techniques: {
        type: String,
        required: true
    },
    scoreFour: {
        type: Number,
        required: true,
        max: 20
    },
    user: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('innovativeteaching', InnovativeTeachingSchema);
