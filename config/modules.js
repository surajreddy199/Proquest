const express = require('express');
const mongoose = require('mongoose');








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

// Load Co-Curricular Activities model
require('../models/Category-2/CocurricularActivities');
const CocurricularActivities = mongoose.model('cocurricularactivities');

// Load Corporate Life model
require('../models/Category-2/CorporateLife');
const CorporateLife = mongoose.model('corporatelife');

// Load Professional Development model
require('../models/Category-2/ProfessionalDevelopment');
const ProfessionalDevelopment = mongoose.model('professionaldevelopment');












// Ammexure 3 dbs

// Load Research Papers Published model
require('../models/Category-3/ResearchPapersPublished');
const ResearchPapersPublished = mongoose.model('researchpaperspublished');

// Load Books/Chapters Published model
require('../models/Category-3/BooksChaptersPublished');
const BooksChaptersPublished = mongoose.model('bookschapterspublished');

// Load Sponsored Projects model
require('../models/Category-3/SponsoredProjects');
const SponsoredProjects = mongoose.model('sponsoredprojects');

// Load Consultancy Projects model
require('../models/Category-3/ConsultancyProjects');
const ConsultancyProjects = mongoose.model('consultancyprojects');

// Load Completed Projects model
require('../models/Category-3/CompletedProjects');
const CompletedProjects = mongoose.model('completedprojects');

// Load Project Outcomes model
require('../models/Category-3/ProjectOutcomes');
const ProjectOutcomes = mongoose.model('projectoutcomes');

// Load Research Guidance model
require('../models/Category-3/ResearchGuidance');
const ResearchGuidance = mongoose.model('researchguidance');

// Load Training Courses model
require('../models/Category-3/TrainingCourses');
const TrainingCourses = mongoose.model('trainingcourses');

// Load Conference Papers Entry model
require('../models/Category-3/ConferencePapersEntry');
const ConferencePapersEntry = mongoose.model('conferencepapers');

// Load Invited Lectures model
require('../models/Category-3/InvitedLectures');
const InvitedLectures = mongoose.model('invitedlectures');












module.exports = {TeachingContribution, LecturesExcess, AdditionalResources, InnovativeTeaching, ExaminationDuties,
    CocurricularActivities, CorporateLife, ProfessionalDevelopment, 
    ResearchPapersPublished, BooksChaptersPublished, SponsoredProjects, ConsultancyProjects, CompletedProjects, ProjectOutcomes, ResearchGuidance, TrainingCourses, ConferencePapersEntry, InvitedLectures
}