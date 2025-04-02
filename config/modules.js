const express = require('express');
const mongoose = require('mongoose');


// Academic Performance
// Load teaching model
require('../models/AcademicPerformance/TeachingLoad')
const TeachingLoad = mongoose.model('teachingload');



// Leave record
require('../models/Leave');
const Leave = mongoose.model('leaves');

// Category 1
// Load Teaching Contribution model
require('../models/Category-1/TeachingContribution');
const TeachingContribution = mongoose.model('teachingcontribution');

//Load Lectures Excess model

require('../models/Category-1/LecturesExcess');
const LecturesExcess = mongoose.model('lecturesexcess');

//Load Additional Resources model

require('../models/Category-1/AdditionalResources');
const AdditionalResources = mongoose.model('additionalresources');

// Load Innovative Teaching model
require('../models/Category-1/InnovativeTeaching');
const InnovativeTeaching = mongoose.model('innovativeteaching');

// Load Examination Duties model
require('../models/Category-1/ExaminationDuties');
const ExaminationDuties = mongoose.model('examinationduties');



// Category 2 dbs
// Load paper published in national conference model
require('../models/Category-2/PapersPublishedNationalConf');
const PapersPublishedNationalConf = mongoose.model('paper-published-national-conf');

// Load paper published in international conference model
require('../models/Category-2/PapersPublishedInternationalConf');
const PapersPublishedInternationalConf = mongoose.model('paper-published-international-conf');

// Load paper published in journals model
require('../models/Category-2/PapersPublishedJournals');
const PapersPublishedJournals = mongoose.model('paper-published-journals');

// Load moocs model
require('../models/Category-2/Moocs');
const Moocs = mongoose.model('moocs');

// Load swayam model
require('../models/Category-2/Swayam');
const Swayam = mongoose.model('swayam');

// Load short term training model
require('../models/Category-2/ShortTermTraining');
const ShortTermTraining = mongoose.model('Short-term-training');

// Load seminars model
require('../models/Category-2/Seminars');
const Seminars = mongoose.model('seminars');

// Ammexure 3 dbs

// Load Research Papers Published model
require('../models/Category-3/ResearchPapersPublished');
const ResearchPapersPublished = mongoose.model('researchpaperspublished');

// Load resource person model
require('../models/Category-3/ResourcePerson');
const ResourcePerson = mongoose.model('resource_person');

// Load resource person model
require('../models/Category-3//ContributionToSyllabus');
const ContributionToSyllabus = mongoose.model('Contribution_to_Syllabus');

// Load resource person model
require('../models/Category-3//MemberOfUniversityCommitte');
const MemberOfUniversityCommitte = mongoose.model('Member_of_University_Commite');

// Load resource person model
require('../models/Category-3//ConsultancyAssignment');
const ConsultancyAssignment = mongoose.model('consultancy_assignment');

// Load resource person model
require('../models/Category-3/ExternalProjectsOrCompetition');
const ExternalProjectsOrCompetition = mongoose.model('external_projects_or_competition');

module.exports = {
    TeachingLoad,
    Leave, 
    TeachingContribution, LecturesExcess, AdditionalResources, InnovativeTeaching, ExaminationDuties,
    PapersPublishedNationalConf, PapersPublishedInternationalConf,PapersPublishedJournals, Moocs, Swayam, ShortTermTraining, Seminars, 
    ResearchPapersPublished, ResourcePerson, ContributionToSyllabus, MemberOfUniversityCommitte, ConsultancyAssignment, ExternalProjectsOrCompetition
}