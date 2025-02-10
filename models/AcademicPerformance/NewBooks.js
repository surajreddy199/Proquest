const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const NewBooks = new Schema({
    academic_year: {
        type: Number,
        required: true
    },
    subject_name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    semester: {
        type: String,
        required: true
    },
    class: {
        type: String,
        required: true
    },
    publication: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    }
});

mongoose.model('newbooks', NewBooks);