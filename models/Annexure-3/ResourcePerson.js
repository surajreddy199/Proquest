const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const ResourcePerson = new Schema({
    academic_year: {
        type: Number,
        required: true
    },
    topicName: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    nameofInstitute: {
        type: String,
        required: true
    },

    numberofParticipants: {
        type: Number,
        required: true
    },
    user: {
        type: String,
        required: true
    }
});

mongoose.model('resource_person', ResourcePerson);