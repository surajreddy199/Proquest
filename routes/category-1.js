const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { ensureAuthenticated } = require('../helpers/auth');
const AcademicYear = require('../config/academicYear');
let year;


//Load Teaching Contribution New Added
require('../models/Category-1/TeachingContribution')
const TeachingContribution = mongoose.model('teachingcontribution');

//Load Lectures Excess New Added
require('../models/Category-1/LecturesExcess')
const LecturesExcess = mongoose.model('lecturesexcess');

//Load Additional Resources New Added
require('../models/Category-1/AdditionalResources')
const AdditionalResources = mongoose.model('additionalresources');

//Load Innovative Teaching New Added
require('../models/Category-1/InnovativeTeaching')
const InnovativeTeaching = mongoose.model('innovativeteaching');

//Load Examination Duties New Added
require('../models/Category-1/ExaminationDuties')
const ExaminationDuties = mongoose.model('examinationduties');

// Load time table model
require('../models/Category-1/TimeTable')
const TimeTable = mongoose.model('timetable');



// Load class advisor model
require('../models/Category-1/SportsActivities')
const SportsActivities = mongoose.model('sportsactivities');

// Load class advisor model
require('../models/Category-1/CulturalActivities')
const CulturalActivities = mongoose.model('culturalactivities');

// Load PBL model
require('../models/Category-1/ProjectBasedLearning')
const ProjectBasedLearning = mongoose.model('projectbasedlearning');






// Load plavement activities model
require('../models/Category-1/PlacementActivities')
const PlacementActivities = mongoose.model('placementactivities');

// Load inhouse placement model
require('../models/Category-1/InhousePlacement')
const InhousePlacement = mongoose.model('inhouseplacement');

// Load student organization model
require('../models/Category-1/StudentOrganizations')
const StudentOrganizations = mongoose.model('studentorganizations');

// Load indutrial visit activities model
require('../models/Category-1/IndustrialVisitActivities')
const IndustrialVisitActivities = mongoose.model('industrialvisit');



// Load exam assessment external model
require('../models/Category-1/ExamAssessmentExternal')
const ExamAssessmentExternal = mongoose.model('examassessmetnexternal');

// Load exam activities supervision model
require('../models/Category-1/ExamActivitiesSupervision')
const ExamActivitiesSupervision = mongoose.model('examactivitiessupervision');

// Load exam activities college level model
require('../models/Category-1/ExamActivitiesCollegeLevel')
const ExamActivitiesCollegeLevel = mongoose.model('examactivitiescollege');

// Load IT maintenance model
require('../models/Category-1/ITMaintenance')
const ITMaintenance = mongoose.model('itmaintenance');

// Load Lakshya model
require('../models/Category-1/Lakshya')
const Lakshya = mongoose.model('lakshya');

// Load magazine/newsletter model
require('../models/Category-1/MagazineNewsletter')
const MagazineNewsletter = mongoose.model('magazine-newsletter');

// Load STTP model
require('../models/Category-1/STTP')
const STTP = mongoose.model('sttp');

// Load Department UG projects model
require('../models/Category-1/DepartmentUGProjects')
const DepartmentUGProjects = mongoose.model('department-ug-projects');

// Load Teaching Contribution Route New Added
router.get('/teachingContribution', ensureAuthenticated, (req, res) => {
    AcademicYear.find({ user: req.user.id })
        .then(result => {
            if (!result) {
                req.flash('error_msg', 'Select the academic year before proceeding');
                res.redirect('/');
            }
            year = result[0].academic_year;
            TeachingContribution.find({ $and: [{ user: req.user.id }, { academic_year: year }] })
                .then(result => {
                    res.render('category-1/teachingContribution', { result });
                })
                .catch(() => {
                    req.flash('error_msg', 'Error while retrieving data.');
                    res.redirect('/');
                })
        })
        .catch(() => {
            req.flash('error_msg', 'Select the academic year before proceeding.');
            res.redirect('/');
        })
});

// Load Lectures Excess Route New Added
router.get('/lecturesExcess', ensureAuthenticated, (req, res) => {
    AcademicYear.find({ user: req.user.id })
        .then(result => {
            if (!result) {
                req.flash('error_msg', 'Select the academic year before proceeding');
                res.redirect('/');
            }
            year = result[0].academic_year;
            LecturesExcess.find({ $and: [{ user: req.user.id }, { academic_year: year }] })
                .then(result => {
                    res.render('category-1/lecturesExcess', { result });
                })
                .catch(() => {
                    req.flash('error_msg', 'Error while retrieving data.');
                    res.redirect('/');
                })
        })
        .catch(() => {
            req.flash('error_msg', 'Select the academic year before proceeding.');
            res.redirect('/');
        })
});
// Load Additional Resources Route New Added
router.get('/additionalResources', ensureAuthenticated, (req, res) => {
    AcademicYear.find({ user: req.user.id })
        .then(result => {
            if (!result) {
                req.flash('error_msg', 'Select the academic year before proceeding');
                res.redirect('/');
            }
            year = result[0].academic_year;
            AdditionalResources.find({ $and: [{ user: req.user.id }, { academic_year: year }] })
                .then(result => {
                    res.render('category-1/additionalResources', { result });
                })
                .catch(() => {
                    req.flash('error_msg', 'Error while retrieving data.');
                    res.redirect('/');
                })
        })
        .catch(() => {
            req.flash('error_msg', 'Select the academic year before proceeding.');
            res.redirect('/');
        })
});

// Load Innovative Teaching Route New Added
router.get('/innovativeTeaching', ensureAuthenticated, (req, res) => {
    AcademicYear.find({ user: req.user.id })
        .then(result => {
            if (!result) {
                req.flash('error_msg', 'Select the academic year before proceeding');
                res.redirect('/');
            }
            year = result[0].academic_year;
            InnovativeTeaching.find({ $and: [{ user: req.user.id }, { academic_year: year }] })
                .then(result => {
                    res.render('category-1/innovativeTeaching', { result });
                })
                .catch(() => {
                    req.flash('error_msg', 'Error while retrieving data.');
                    res.redirect('/');
                })
        })
        .catch(() => {
            req.flash('error_msg', 'Select the academic year before proceeding.');
            res.redirect('/');
        })
});

// Load Examination Duties Route New Added
router.get('/examinationDuties', ensureAuthenticated, (req, res) => {
    AcademicYear.find({ user: req.user.id })
        .then(result => {
            if (!result) {
                req.flash('error_msg', 'Select the academic year before proceeding');
                res.redirect('/');
            }
            year = result[0].academic_year;
            ExaminationDuties.find({ $and: [{ user: req.user.id }, { academic_year: year }] })
                .then(result => {
                    res.render('category-1/examinationDuties', { result });
                })
                .catch(() => {
                    req.flash('error_msg', 'Error while retrieving data.');
                    res.redirect('/');
                })
        })
        .catch(() => {
            req.flash('error_msg', 'Select the academic year before proceeding.');
            res.redirect('/');
        })
});

//faculty overview score calculation category 01
router.get('/facultyOverview', ensureAuthenticated, (req, res) => {
    AcademicYear.findOne({ user: req.user.id }).exec()
        .then(yearRecord => {
            if (!yearRecord) {
                req.flash('error_msg', 'Select the academic year before proceeding');
                return res.redirect('/');
            }
            let year = yearRecord.academic_year;

            // Fetch all required data using Promise.all
            Promise.all([
                TeachingContribution.findOne({ user: req.user.id, academic_year: year }).exec(),
                LecturesExcess.findOne({ user: req.user.id, academic_year: year }).exec(),
                AdditionalResources.findOne({ user: req.user.id, academic_year: year }).exec(),
                InnovativeTeaching.findOne({ user: req.user.id, academic_year: year }).exec(),
                ExaminationDuties.findOne({ user: req.user.id, academic_year: year }).exec()
            ])
            .then(([teachingContribution, lecturesExcess, additionalResources, innovativeTeaching, examinationDuties]) => {
                let teachingContributionScore = teachingContribution ? teachingContribution.scoreOne : 0;
                let lecturesExcessScore = lecturesExcess ? lecturesExcess.scoreTwo : 0;
                let additionalResourcesScore = additionalResources ? additionalResources.scoreThree : 0;
                let innovativeTeachingScore = innovativeTeaching ? innovativeTeaching.scoreFour : 0;
                let examinationDutiesScore = examinationDuties ? examinationDuties.scoreFive : 0;

                let categoryOneTotalScore = teachingContributionScore + lecturesExcessScore + additionalResourcesScore + innovativeTeachingScore + examinationDutiesScore;

                if (categoryOneTotalScore < 75) {
                    // req.flash('error_msg', 'Total score for Category 01 should be at least 75. Please review your scores.'); //checklast
                    return res.redirect('/category-1/facultyOverview');
                } //checklast

                res.render('facultyOverview', {
                    teachingContributionScore,
                    lecturesExcessScore,
                    additionalResourcesScore,
                    innovativeTeachingScore,
                    examinationDutiesScore,
                    categoryOneTotalScore
                });
            })
            .catch(err => {
                console.error(err);
                req.flash('error_msg', 'Error fetching data. Please try again.');
                res.redirect('/');
            });
        })
        .catch(err => {
            console.error(err);
            req.flash('error_msg', 'Error fetching academic year. Please try again.');
            res.redirect('/');
        });
});



// Time table load route
router.get('/timeTable', ensureAuthenticated, (req, res) => {
    AcademicYear.find({ user: req.user.id })
        .then(result => {
            if (!result) {
                req.flash('error_msg', 'Select the academic year before proceeding');
                res.redirect('/');
            }
            year = result[0].academic_year;
            TimeTable.find({ $and: [{ user: req.user.id }, { academic_year: year }] })
                .then(result => {
                    res.render('category-1/timeTable', { result });
                })
                .catch(() => {
                    req.flash('error_msg', 'Error while retrieving data.');
                    res.redirect('/');
                })
        })
        .catch(() => {
            req.flash('error_msg', 'Select the academic year before proceeding.');
            res.redirect('/');
        })
});



// Sports activity load route
router.get('/sportsActivities', ensureAuthenticated, (req, res) => {
    AcademicYear.find({ user: req.user.id })
        .then(result => {
            if (!result) {
                req.flash('error_msg', 'Select the academic year before proceeding');
                res.redirect('/');
            }
            year = result[0].academic_year;
            SportsActivities.find({ $and: [{ user: req.user.id }, { academic_year: year }] })
                .then(result => {
                    res.render('category-1/sportsActivities', { result });
                })
                .catch(() => {
                    req.flash('error_msg', 'Error while retrieving data.');
                    res.redirect('/');
                })
        })
        .catch(() => {
            req.flash('error_msg', 'Select the academic year before proceeding.');
            res.redirect('/');
        })
});

// Cultural activity load route
router.get('/culturalActivities', ensureAuthenticated, (req, res) => {
    AcademicYear.find({ user: req.user.id })
        .then(result => {
            if (!result) {
                req.flash('error_msg', 'Select the academic year before proceeding');
                res.redirect('/');
            }
            year = result[0].academic_year;
            CulturalActivities.find({ $and: [{ user: req.user.id }, { academic_year: year }] })
                .then(result => {
                    res.render('category-1/culturalActivities', { result });
                })
                .catch(() => {
                    req.flash('error_msg', 'Error while retrieving data.');
                    res.redirect('/');
                })
        })
        .catch(() => {
            req.flash('error_msg', 'Select the academic year before proceeding.');
            res.redirect('/');
        })
});

// project based learning load route
router.get('/projectBasedLearning', ensureAuthenticated, (req, res) => {
    AcademicYear.find({ user: req.user.id })
        .then(result => {
            if (!result) {
                req.flash('error_msg', 'Select the academic year before proceeding');
                res.redirect('/');
            }
            year = result[0].academic_year;
            ProjectBasedLearning.find({ $and: [{ user: req.user.id }, { academic_year: year }] })
                .then(result => {
                    res.render('category-1/projectBasedLearning', { result });
                })
                .catch(() => {
                    req.flash('error_msg', 'Error while retrieving data.');
                    res.redirect('/');
                })
        })
        .catch(() => {
            req.flash('error_msg', 'Select the academic year before proceeding.');
            res.redirect('/');
        })
});


// Placement activities load route
router.get('/placementActivities', ensureAuthenticated, (req, res) => {
    AcademicYear.find({ user: req.user.id })
        .then(result => {
            if (!result) {
                req.flash('error_msg', 'Select the academic year before proceeding');
                res.redirect('/');
            }
            year = result[0].academic_year;
            PlacementActivities.find({ $and: [{ user: req.user.id }, { academic_year: year }] })
                .then(result => {
                    res.render('category-1/placementActivities', { result });
                })
                .catch(() => {
                    req.flash('error_msg', 'Error while retrieving data.');
                    res.redirect('/');
                })
        })
        .catch(() => {
            req.flash('error_msg', 'Select the academic year before proceeding.');
            res.redirect('/');
        })
});

// Inhouse placement load route
router.get('/inhousePlacement', ensureAuthenticated, (req, res) => {
    AcademicYear.find({ user: req.user.id })
        .then(result => {
            if (!result) {
                req.flash('error_msg', 'Select the academic year before proceeding');
                res.redirect('/');
            }
            year = result[0].academic_year;
            InhousePlacement.find({ $and: [{ user: req.user.id }, { academic_year: year }] })
                .then(result => {
                    res.render('category-1/inhousePlacement', { result });
                })
                .catch(() => {
                    req.flash('error_msg', 'Error while retrieving data.');
                    res.redirect('/');
                })
        })
        .catch(() => {
            req.flash('error_msg', 'Select the academic year before proceeding.');
            res.redirect('/');
        })
});

// student organization load route
router.get('/studentorganizations', ensureAuthenticated, (req, res) => {
    AcademicYear.find({ user: req.user.id })
        .then(result => {
            if (!result) {
                req.flash('error_msg', 'Select the academic year before proceeding');
                res.redirect('/');
            }
            year = result[0].academic_year;
            StudentOrganizations.find({ $and: [{ user: req.user.id }, { academic_year: year }] })
                .then(result => {
                    res.render('category-1/studentorganizations', { result });
                })
                .catch(() => {
                    req.flash('error_msg', 'Error while retrieving data.');
                    res.redirect('/');
                })
        })
        .catch(() => {
            req.flash('error_msg', 'Select the academic year before proceeding.');
            res.redirect('/');
        })
});

// Industrial visit load route
router.get('/industrialVisitActivities', ensureAuthenticated, (req, res) => {
    AcademicYear.find({ user: req.user.id })
        .then(result => {
            if (!result) {
                req.flash('error_msg', 'Select the academic year before proceeding');
                res.redirect('/');
            }
            year = result[0].academic_year;
            IndustrialVisitActivities.find({ $and: [{ user: req.user.id }, { academic_year: year }] })
                .then(result => {
                    res.render('category-1/industrialVisitActivities', { result });
                })
                .catch(() => {
                    req.flash('error_msg', 'Error while retrieving data.');
                    res.redirect('/');
                })
        })
        .catch(() => {
            req.flash('error_msg', 'Select the academic year before proceeding.');
            res.redirect('/');
        })
});


// exam assesssment external load route
router.get('/examAssessmentExternal', ensureAuthenticated, (req, res) => {
    AcademicYear.find({ user: req.user.id })
        .then(result => {
            if (!result) {
                req.flash('error_msg', 'Select the academic year before proceeding');
                res.redirect('/');
            }
            year = result[0].academic_year;
            ExamAssessmentExternal.find({ $and: [{ user: req.user.id }, { academic_year: year }] })
                .then(result => {
                    res.render('category-1/examAssessmentExternal', { result });
                })
                .catch(() => {
                    req.flash('error_msg', 'Error while retrieving data.');
                    res.redirect('/');
                })
        })
        .catch(() => {
            req.flash('error_msg', 'Select the academic year before proceeding.');
            res.redirect('/');
        })
});

// exam activities supervision route
router.get('/examActivitiesSupervision', ensureAuthenticated, (req, res) => {
    AcademicYear.find({ user: req.user.id })
        .then(result => {
            if (!result) {
                req.flash('error_msg', 'Select the academic year before proceeding');
                res.redirect('/');
            }
            year = result[0].academic_year;
            ExamActivitiesSupervision.find({ $and: [{ user: req.user.id }, { academic_year: year }] })
                .then(result => {
                    res.render('category-1/examActivitiesSupervision', { result });
                })
                .catch(() => {
                    req.flash('error_msg', 'Error while retrieving data.');
                    res.redirect('/');
                })
        })
        .catch(() => {
            req.flash('error_msg', 'Select the academic year before proceeding.');
            res.redirect('/');
        })
});

// exam activities college level route
router.get('/examActivitiesCollegeLevel', ensureAuthenticated, (req, res) => {
    AcademicYear.find({ user: req.user.id })
        .then(result => {
            if (!result) {
                req.flash('error_msg', 'Select the academic year before proceeding');
                res.redirect('/');
            }
            year = result[0].academic_year;
            ExamActivitiesCollegeLevel.find({ $and: [{ user: req.user.id }, { academic_year: year }] })
                .then(result => {
                    res.render('category-1/examActivitiesCollegeLevel', { result });
                })
                .catch(() => {
                    req.flash('error_msg', 'Error while retrieving data.');
                    res.redirect('/');
                })
        })
        .catch(() => {
            req.flash('error_msg', 'Select the academic year before proceeding.');
            res.redirect('/');
        })
});

// IT Maintenance level route
router.get('/ITmaintenance', ensureAuthenticated, (req, res) => {
    AcademicYear.find({ user: req.user.id })
        .then(result => {
            if (!result) {
                req.flash('error_msg', 'Select the academic year before proceeding');
                res.redirect('/');
            }
            year = result[0].academic_year;
            ITMaintenance.find({ $and: [{ user: req.user.id }, { academic_year: year }] })
                .then(result => {
                    res.render('category-1/ITmaintenance', { result });
                })
                .catch(() => {
                    req.flash('error_msg', 'Error while retrieving data.');
                    res.redirect('/');
                })
        })
        .catch(() => {
            req.flash('error_msg', 'Select the academic year before proceeding.');
            res.redirect('/');
        })
});

// Load Lakshya route
router.get('/lakshya', ensureAuthenticated, (req, res) => {
    AcademicYear.find({ user: req.user.id })
        .then(result => {
            if (!result) {
                req.flash('error_msg', 'Select the academic year before proceeding');
                res.redirect('/');
            }
            year = result[0].academic_year;
            Lakshya.find({ $and: [{ user: req.user.id }, { academic_year: year }] })
                .then(result => {
                    res.render('category-1/lakshya', { result });
                })
                .catch(() => {
                    req.flash('error_msg', 'Error while retrieving data.');
                    res.redirect('/');
                })
        })
        .catch(() => {
            req.flash('error_msg', 'Select the academic year before proceeding.');
            res.redirect('/');
        })
});




// Load magazine/newletter route
router.get('/magazineNewsletter', ensureAuthenticated, (req, res) => {
    AcademicYear.find({ user: req.user.id })
        .then(result => {
            if (!result) {
                req.flash('error_msg', 'Select the academic year before proceeding');
                res.redirect('/');
            }
            year = result[0].academic_year;
            MagazineNewsletter.find({ $and: [{ user: req.user.id }, { academic_year: year }] })
                .then(result => {
                    res.render('category-1/magazineNewsletter', { result });
                })
                .catch(() => {
                    req.flash('error_msg', 'Error while retrieving data.');
                    res.redirect('/');
                })
        })
        .catch(() => {
            req.flash('error_msg', 'Select the academic year before proceeding.');
            res.redirect('/');
        })
});

// sttp load route
router.get('/conductOfSTTP', ensureAuthenticated, (req, res) => {
    AcademicYear.find({ user: req.user.id })
        .then(result => {
            if (!result) {
                req.flash('error_msg', 'Select the academic year before proceeding');
                res.redirect('/');
            }
            year = result[0].academic_year;
            STTP.find({ $and: [{ user: req.user.id }, { academic_year: year }] })
                .then(result => {
                    res.render('category-1/conductOfSTTP', { result });
                })
                .catch(() => {
                    req.flash('error_msg', 'Error while retrieving data.');
                    res.redirect('/');
                })
        })
        .catch(() => {
            req.flash('error_msg', 'Select the academic year before proceeding.');
            res.redirect('/');
        })
});

// Dept. UG Project load route
router.get('/departmentUGProjects', ensureAuthenticated, (req, res) => {
    AcademicYear.find({ user: req.user.id })
        .then(result => {
            if (!result) {
                req.flash('error_msg', 'Select the academic year before proceeding');
                res.redirect('/');
            }
            year = result[0].academic_year;
            DepartmentUGProjects.find({ $and: [{ user: req.user.id }, { academic_year: year }] })
                .then(result => {
                    res.render('category-1/departmentUGProjects', { result });
                })
                .catch(() => {
                    req.flash('error_msg', 'Error while retrieving data.');
                    res.redirect('/');
                })
        })
        .catch(() => {
            req.flash('error_msg', 'Select the academic year before proceeding.');
            res.redirect('/');
        })
});

// Load all the edit forms

// Teaching Contribution Edit Route New Added
router.get('/teachingContribution/edit/:id', ensureAuthenticated, (req, res) => {
    TeachingContribution.findOne({ _id: req.params.id })
        .then(result => {
            if (result.user != req.user.id) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('/category-1/teachingContribution');
            } else {
                res.render('category-1/teachingContribution', { editResult: result });
            }
        })
        .catch(() => {
            req.flash('error_msg', 'Error while finding your previous data. Please try again.');
            res.redirect('/category-1/teachingContribution');
        })
});

// Lectures Excess Edit Route New Added
router.get('/lecturesExcess/edit/:id', ensureAuthenticated, (req, res) => {
    LecturesExcess.findOne({ _id: req.params.id })
        .then(result => {
            if (result.user != req.user.id) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('/category-1/lecturesExcess');
            } else {
                res.render('category-1/lecturesExcess', { editResult: result });
            }
        })
        .catch(() => {
            req.flash('error_msg', 'Error while finding your previous data. Please try again.');
            res.redirect('/category-1/lecturesExcess');
        })
});

// Additional Resources Edit Route New Added
router.get('/additionalResources/edit/:id', ensureAuthenticated, (req, res) => {
    AdditionalResources.findOne({ _id: req.params.id })
        .then(result => {
            if (result.user != req.user.id) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('/category-1/additionalResources');
            } else {
                res.render('category-1/additionalResources', { editResult: result });
            }
        })
        .catch(() => {
            req.flash('error_msg', 'Error while finding your previous data. Please try again.');
            res.redirect('/category-1/additionalResources');
        })
});

// Innovative Teaching Edit Route New Added
router.get('/innovativeTeaching/edit/:id', ensureAuthenticated, (req, res) => {
    InnovativeTeaching.findOne({ _id: req.params.id })
        .then(result => {
            if (result.user != req.user.id) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('/category-1/innovativeTeaching');
            } else {
                res.render('category-1/innovativeTeaching', { editResult: result });
            }
        })
        .catch(() => {
            req.flash('error_msg', 'Error while finding your previous data. Please try again.');
            res.redirect('/category-1/innovativeTeaching');
        })
});

// Examination Duties Edit Route New Added
router.get('/examinationDuties/edit/:id', ensureAuthenticated, (req, res) => {
    ExaminationDuties.findOne({ _id: req.params.id })
        .then(result => {
            if (result.user != req.user.id) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('/category-1/examinationDuties');
            } else {
                res.render('category-1/examinationDuties', { editResult: result });
            }
        })
        .catch(() => {
            req.flash('error_msg', 'Error while finding your previous data. Please try again.');
            res.redirect('/category-1/examinationDuties');
        })
});

// Time table edit form
router.get('/timeTable/edit/:id', ensureAuthenticated, (req, res) => {
    TimeTable.findOne({ _id: req.params.id })
        .then(result => {
            if (result.user != req.user.id) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('/category-1/timeTable');
            } else {
                res.render('category-1/timeTable', { editResult: result });
            }
        })
        .catch(() => {
            req.flash('error_msg', 'Error while finding your previous data. Please try again.');
            res.redirect('/category-1/timeTable');
        })
});



// Sports activity load route
router.get('/sportsActivities/edit/:id', ensureAuthenticated, (req, res) => {
    SportsActivities.findOne({ _id: req.params.id })
        .then(result => {
            if (result.user != req.user.id) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('/category-1/sportsActivities');
            } else {
                res.render('category-1/sportsActivities', { editResult: result });
            }
        })
        .catch(() => {
            req.flash('error_msg', 'Error while finding your previous data. Please try again.');
            res.redirect('/category-1/sportsActivities');
        })
});

// Cultural activity load route
router.get('/culturalActivities/edit/:id', ensureAuthenticated, (req, res) => {
    CulturalActivities.findOne({ _id: req.params.id })
        .then(result => {
            if (result.user != req.user.id) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('/category-1/culturalActivities');
            } else {
                res.render('category-1/culturalActivities', { editResult: result });
            }
        })
        .catch(() => {
            req.flash('error_msg', 'Error while finding your previous data. Please try again.');
            res.redirect('/category-1/culturalActivities');
        })
});

// project based learning load route
router.get('/projectBasedLearning/edit/:id', ensureAuthenticated, (req, res) => {
    ProjectBasedLearning.findOne({ _id: req.params.id })
        .then(result => {
            if (result.user != req.user.id) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('/category-1/projectBasedLearning');
            } else {
                res.render('category-1/projectBasedLearning', { editResult: result });
            }
        })
        .catch(() => {
            req.flash('error_msg', 'Error while finding your previous data. Please try again.');
            res.redirect('/category-1/projectBasedLearning');
        })
});


// Placement activities load route
router.get('/placementActivities/edit/:id', ensureAuthenticated, (req, res) => {
    PlacementActivities.findOne({ _id: req.params.id })
        .then(result => {
            if (result.user != req.user.id) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('/category-1/placementActivities');
            } else {
                res.render('category-1/placementActivities', { editResult: result });
            }
        })
        .catch(() => {
            req.flash('error_msg', 'Error while finding your previous data. Please try again.');
            res.redirect('/category-1/placementActivities');
        })
});

// Inhouse placement load route
router.get('/inhousePlacement/edit/:id', ensureAuthenticated, (req, res) => {
    InhousePlacement.findOne({ _id: req.params.id })
        .then(result => {
            if (result.user != req.user.id) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('/category-1/inhousePlacement');
            } else {
                res.render('category-1/inhousePlacement', { editResult: result });
            }
        })
        .catch(() => {
            req.flash('error_msg', 'Error while finding your previous data. Please try again.');
            res.redirect('/category-1/inhousePlacement');
        })
});

// student organization load route
router.get('/studentOrganizations/edit/:id', ensureAuthenticated, (req, res) => {
    StudentOrganizations.findOne({ _id: req.params.id })
        .then(result => {
            if (result.user != req.user.id) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('/category-1/studentOrganizations');
            } else {
                res.render('category-1/studentorganizations', { editResult: result });
            }
        })
        .catch(() => {
            req.flash('error_msg', 'Error while finding your previous data. Please try again.');
            res.redirect('/category-1/studentOrganizations');
        })
});

// Industrial visit load route
router.get('/industrialVisitActivities/edit/:id', ensureAuthenticated, (req, res) => {
    IndustrialVisitActivities.findOne({ _id: req.params.id })
        .then(result => {
            if (result.user != req.user.id) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('/category-1/industrialVisitActivities');
            } else {
                res.render('category-1/industrialVisitActivities', { editResult: result });
            }
        })
        .catch(() => {
            req.flash('error_msg', 'Error while finding your previous data. Please try again.');
            res.redirect('/category-1/industrialVisitActivities');
        })
});


// exam assesssment external load route
router.get('/examAssessmentExternal/edit/:id', ensureAuthenticated, (req, res) => {
    ExamAssessmentExternal.findOne({ _id: req.params.id })
        .then(result => {
            if (result.user != req.user.id) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('/category-1/examAssessmentExternal');
            } else {
                res.render('category-1/examAssessmentExternal', { editResult: result });
            }
        })
        .catch(() => {
            req.flash('error_msg', 'Error while finding your previous data. Please try again.');
            res.redirect('/category-1/examAssessmentExternal');
        })
});

// exam activities supervision route
router.get('/examActivitiesSupervision/edit/:id', ensureAuthenticated, (req, res) => {
    ExamActivitiesSupervision.findOne({ _id: req.params.id })
        .then(result => {
            if (result.user != req.user.id) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('/category-1/examActivitiesSupervision');
            } else {
                res.render('category-1/examActivitiesSupervision', { editResult: result });
            }
        })
        .catch(() => {
            req.flash('error_msg', 'Error while finding your previous data. Please try again.');
            res.redirect('/category-1/examActivitiesSupervision');
        })
});

// exam activities college level route
router.get('/examActivitiesCollegeLevel/edit/:id', ensureAuthenticated, (req, res) => {
    ExamActivitiesCollegeLevel.findOne({ _id: req.params.id })
        .then(result => {
            if (result.user != req.user.id) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('/category-1/examActivitiesCollegeLevel');
            } else {
                res.render('category-1/examActivitiesCollegeLevel', { editResult: result });
            }
        })
        .catch(() => {
            req.flash('error_msg', 'Error while finding your previous data. Please try again.');
            res.redirect('/category-1/examActivitiesCollegeLevel');
        })
});

// IT Maintenance level route
router.get('/ITmaintenance/edit/:id', ensureAuthenticated, (req, res) => {
    ITMaintenance.findOne({ _id: req.params.id })
        .then(result => {
            if (result.user != req.user.id) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('/category-1/ITmaintenance');
            } else {
                res.render('category-1/ITmaintenance', { editResult: result });
            }
        })
        .catch(() => {
            req.flash('error_msg', 'Error while finding your previous data. Please try again.');
            res.redirect('/category-1/ITmaintenance');
        })
});

// Load Lakshya route
router.get('/lakshya/edit/:id', ensureAuthenticated, (req, res) => {
    Lakshya.findOne({ _id: req.params.id })
        .then(result => {
            if (result.user != req.user.id) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('/category-1/lakshya');
            } else {
                res.render('category-1/lakshya', { editResult: result });
            }
        })
        .catch(() => {
            req.flash('error_msg', 'Error while finding your previous data. Please try again.');
            res.redirect('/category-1/lakshya');
        })
});

// Load magazine/newletter route
router.get('/magazineNewsletter/edit/:id', ensureAuthenticated, (req, res) => {
    MagazineNewsletter.findOne({ _id: req.params.id })
        .then(result => {
            if (result.user != req.user.id) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('/category-1/magazineNewsletter');
            } else {
                res.render('category-1/magazineNewsletter', { editResult: result });
            }
        })
        .catch(() => {
            req.flash('error_msg', 'Error while finding your previous data. Please try again.');
            res.redirect('/category-1/magazineNewsletter');
        })
});

// sttp load route
router.get('/conductOfSTTP/edit/:id', ensureAuthenticated, (req, res) => {
    STTP.findOne({ _id: req.params.id })
        .then(result => {
            if (result.user != req.user.id) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('/category-1/conductOfSTTP');
            } else {
                res.render('category-1/conductOfSTTP', { editResult: result });
            }
        })
        .catch(() => {
            req.flash('error_msg', 'Error while finding your previous data. Please try again.');
            res.redirect('/category-1/conductOfSTTP');
        })
});

// Dept. UG Project load route
router.get('/departmentUGProjects/edit/:id', ensureAuthenticated, (req, res) => {
    DepartmentUGProjects.findOne({ _id: req.params.id })
        .then(result => {
            if (result.user != req.user.id) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('/category-1/departmentUGProjects');
            } else {
                res.render('category-1/departmentUGProjects', { editResult: result });
            }
        })
        .catch(() => {
            req.flash('error_msg', 'Error while finding your previous data. Please try again.');
            res.redirect('/category-1/departmentUGProjects');
        })
});

//router post

//process Teaching Contribution form New Added

router.post('/teachingContribution', (req, res) => {
    const teachingContributionRecords = {
        academic_year: year,
        lecturesDelivered: req.body.lecturesDelivered,
        lecturesAllocated: req.body.lecturesAllocated,
        tutorialsDelivered: req.body.tutorialsDelivered,
        tutorialsAllocated: req.body.tutorialsAllocated,
        practicalSessionsDelivered: req.body.practicalSessionsDelivered,
        practicalSessionsAllocated: req.body.practicalSessionsAllocated,
        scoreOne: req.body.scoreOne,
        user: req.user.id
    }

    new TeachingContribution(teachingContributionRecords)
        .save()
        .then(teachingContribution => {
            req.flash('success_msg', 'Data entered successfully');
            res.redirect('/category-1/teachingContribution');
        })
        .catch(err => {
            console.log(err);
            req.flash('error_msg', 'Faculty ID not found. Please login again.');
            res.redirect('/category-1/teachingContribution');
        })
});

//process Lectures Excess form New Added

router.post('/lecturesExcess', (req, res) => {
    const lecturesExcessRecords = {
        academic_year: year,
        lecturesTaken: req.body.lecturesTaken,
        tutorialsTaken: req.body.tutorialsTaken,
        practicalSessionsTaken: req.body.practicalSessionsTaken,
        scoreTwo: req.body.scoreTwo,
        user: req.user.id
    }

    new LecturesExcess(lecturesExcessRecords)
        .save()
        .then(lecturesExcess => {
            req.flash('success_msg', 'Data entered successfully');
            res.redirect('/category-1/lecturesExcess');
        })
        .catch(err => {
            console.log(err);
            req.flash('error_msg', 'Faculty ID not found. Please login again.');
            res.redirect('/category-1/lecturesExcess');
        })
});

//process Additional Resources form New Added

router.post('/additionalResources', (req, res) => {
    const additionalResourcesRecords = {
        academic_year: year,
        materials: req.body.materials,
        scoreThree: req.body.scoreThree,
        user: req.user.id

    }

    new AdditionalResources(additionalResourcesRecords)
        .save()
        .then(additionalResources => {
            req.flash('success_msg', 'Data entered successfully');
            res.redirect('/category-1/additionalResources');
        })
        .catch(err => {
            console.log(err);
            req.flash('error_msg', 'Faculty ID not found. Please login again.');
            res.redirect('/category-1/additionalResources');
        })
});

//process Innovative Teaching form New Added

router.post('/innovativeTeaching', (req, res) => {
    const innovativeTeachingRecords = {
        academic_year: year,
        techniques: req.body.techniques,
        scoreFour: req.body.scoreFour,
        user: req.user.id

    }

    new InnovativeTeaching(innovativeTeachingRecords)
        .save()
        .then(innovativeTeaching => {
            req.flash('success_msg', 'Data entered successfully');
            res.redirect('/category-1/innovativeTeaching');
        })
        .catch(err => {
            console.log(err);
            req.flash('error_msg', 'Faculty ID not found. Please login again.');
            res.redirect('/category-1/innovativeTeaching');
        })
});

//process Examination Duties form New Added

router.post('/examinationDuties', (req, res) => {
    const examinationDutiesRecords = {
        academic_year: year,
        invigilation: req.body.invigilation === "on",
        questionPaperSetting: req.body.questionPaperSetting === "on",
        evaluationAnswerScripts: req.body.evaluationAnswerScripts === "on",
        paperModeration: req.body.paperModeration === "on",
        labEvaluation: req.body.labEvaluation === "on",
        scoreFive: req.body.scoreFive,
        user: req.user.id
    }

    new ExaminationDuties(examinationDutiesRecords)
        .save()
        .then(examinationDuties => {
            req.flash('success_msg', 'Data entered successfully');
            res.redirect('/category-1/examinationDuties');
        })
        .catch(err => {
            console.log(err);
            req.flash('error_msg', 'Faculty ID not found. Please login again.');
            res.redirect('/category-1/examinationDuties');
        })
});

//process time table form
router.post('/timeTable', (req, res) => {
    // add preleave data into db
    const timeTableRecords = {
        academic_year: year,
        role: req.body.role,
        department: req.body.department,
        semester: req.body.semester,
        user: req.user.id
    }
    new TimeTable(timeTableRecords)
        .save()
        .then(timetable => {
            req.flash('success_msg', 'Data entered successfully');
            res.redirect('/category-1/classAdvisor');
        })
        .catch(err => {
            console.log(err);
            req.flash('error_msg', 'faculty ID not found please login again.');
            res.redirect('/category-1/timeTable');
        })
});



//process sports activities form
router.post('/sportsActivities', (req, res) => {
    // add preleave data into db
    const sportsActivitiesRecords = {
        academic_year: year,
        sports_name: req.body.sports_name,
        sports_category: req.body.sports_category,
        sports_role: req.body.sports_role,
        sports_ojus_or_other: req.body.sports_ojus_or_other,
        user: req.user.id
    }
    new SportsActivities(sportsActivitiesRecords)
        .save()
        .then(sportsactivities => {
            req.flash('success_msg', 'Data entered successfully');
            res.redirect('/category-1/culturalActivities');
        })
        .catch(err => {
            console.log(err);
            req.flash('error_msg', 'faculty ID not found please login again.');
            res.redirect('/category-1/sportsActivities');
        })
});

//process cultural activities form
router.post('/culturalActivities', (req, res) => {
    // add preleave data into db
    const culturalActivitiesRecords = {
        academic_year: year,
        cultural_name: req.body.cultural_name,
        cultural_category: req.body.cultural_category,
        cultural_role: req.body.cultural_role,
        cultural_ojus_or_other: req.body.cultural_ojus_or_other,
        user: req.user.id
    }
    new CulturalActivities(culturalActivitiesRecords)
        .save()
        .then(culturalactivities => {
            req.flash('success_msg', 'Data entered successfully');
            res.redirect('/category-1/projectBasedLearning');
        })
        .catch(err => {
            console.log(err);
            req.flash('error_msg', 'faculty ID not found please login again.');
            res.redirect('/category-1/culturalActivities');
        })
});

//process PBL activities form
router.post('/projectBasedLearning', (req, res) => {
    let errors = [];

    if (req.body.pbl_start_date > req.body.pbl_end_date) {
        errors.push({ text: 'End Date should not be before start date' });
    }
    if (errors.length > 0) {
        res.render('category-1/projectBasedLearning', {
            errors: errors,
            pbl_subject: req.body.pbl_subject,
            pbl_role: req.body.pbl_role,
            pbl_start_date: req.body.pbl_start_date,
            pbl_end_date: req.body.pbl_end_date,
            pbl_description: req.body.pbl_description,

        });
    }
    else {
        // add preleave data into db
        const projectBasedLearningRecords = {
            academic_year: year,
            pbl_subject: req.body.pbl_subject,
            pbl_role: req.body.pbl_role,
            pbl_start_date: req.body.pbl_start_date,
            pbl_end_date: req.body.pbl_end_date,
            pbl_description: req.body.pbl_description,
            user: req.user.id
        }
        new ProjectBasedLearning(projectBasedLearningRecords)
            .save()
            .then(projectBasedLearning => {
                req.flash('success_msg', 'Data entered successfully');
                res.redirect('/category-1/udaan');//check redirect path
            })
            .catch(err => {
                console.log(err);
                req.flash('error_msg', 'faculty ID not found please login again.');
                res.redirect('/category-1/projectBasedLearning');
            })
    }
});


 



//process placement activities form
router.post('/placementActivities', (req, res) => {
    let errors = [];

    if (!req.body.no_of_companies || req.body.no_of_companies < 0) {
        errors.push({ text: 'Number of companies cannot be less than 0' });
    }
    else if (!req.body.no_of_placed_students || req.body.no_of_placed_students < 0) {
        errors.push({ text: 'Number of placed students cannot be less than 0' });
    }
    if (errors.length > 0) {
        res.render('category-1//placementActivities', {
            errors: errors,
            placement_role: req.body.placement_role,
            no_of_companies: req.body.no_of_companies,
            no_of_placed_students: req.body.no_of_placed_students,
            department: req.body.department
        }
        )
    }
    else {
        // add preleave data into db
        const placementActivitiesRecords = {
            academic_year: year,
            placement_role: req.body.placement_role,
            no_of_companies: req.body.no_of_companies,
            no_of_placed_students: req.body.no_of_placed_students,
            department: req.body.department,
            user: req.user.id
        }
        new PlacementActivities(placementActivitiesRecords)
            .save()
            .then(placementActivities => {
                req.flash('success_msg', 'Data entered successfully');
                res.redirect('/category-1/inhousePlacement');
            })
            .catch(err => {
                console.log(err);
                req.flash('error_msg', 'faculty ID not found please login again.');
                res.redirect('/category-1/placementActivities');
            })
    }
});

//process inhouse placement form
router.post('/inhousePlacement', (req, res) => {
    let errors = [];

    if (!req.body.no_of_participants || req.body.no_of_participants < 0) {
        errors.push({ text: 'Number of participants cannot be less than 0' });
    }
    if (errors.length > 0) {
        res.render('category-1/inhousePlacement', {
            errors: errors,
            trainings_and_workshops: req.body.trainings_and_workshops,
            class_name: req.body.class_name,
            department: req.body.department,
            no_of_participants: req.body.no_of_participants
        }
        )
    }
    else {
        // add preleave data into db
        const inhousePlacementRecords = {
            academic_year: year,
            trainings_and_workshops: req.body.trainings_and_workshops,
            class_name: req.body.class_name,
            department: req.body.department,
            no_of_participants: req.body.no_of_participants,
            user: req.user.id
        }
        new InhousePlacement(inhousePlacementRecords)
            .save()
            .then(inhousePlacement => {
                req.flash('success_msg', 'Data entered successfully');
                res.redirect('/category-1/studentorganizations');
            })
            .catch(err => {
                console.log(err);
                req.flash('error_msg', 'faculty ID not found please login again.');
                res.redirect('/category-1/inhousePlacement');
            })
    }
});

//process student organizations form
router.post('/studentorganizations', (req, res) => {
    let errors = [];

    if (req.body.student_event_start_date > req.body.student_event_end_date) {
        errors.push({ text: 'End Date should not be before start date' });
    }
    else if (!req.body.no_of_participants || req.body.no_of_participants < 0) {
        errors.push({ text: 'Number of participants cannot be less than 0' });
    }
    else if (!req.body.student_event_duration || req.body.student_event_duration < 0) {
        errors.push({ text: 'Event Duration cannot be less than 0' });
    }
    if (errors.length > 0) {
        res.render('category-1/studentorganizations', {
            errors: errors,
            student_organizations_trainings: req.body.student_organizations_trainings,
            class_name: req.body.class_name,
            department: req.body.department,
            no_of_participants: req.body.no_of_participants,
            student_organization_role: req.body.student_organization_role,
            student_event_duration: req.body.student_event_duration,
            student_event_start_date: req.body.student_event_start_date,
            student_event_end_date: req.body.student_event_end_date
        }
        )
    }
    else {
        // add preleave data into db
        const studentOrganizationRecords = {
            academic_year: year,
            student_organizations_trainings: req.body.student_organizations_trainings,
            class_name: req.body.class_name,
            department: req.body.department,
            no_of_participants: req.body.no_of_participants,
            student_organization_role: req.body.student_organization_role,
            student_event_duration: req.body.student_event_duration,
            student_event_start_date: req.body.student_event_start_date,
            student_event_end_date: req.body.student_event_end_date,
            user: req.user.id
        }
        new StudentOrganizations(studentOrganizationRecords)
            .save()
            .then(studentOrganization => {
                req.flash('success_msg', 'Data entered successfully');
                res.redirect('/category-1/industrialVisitActivities');
            })
            .catch(err => {
                console.log(err);
                req.flash('error_msg', 'faculty ID not found please login again.');
                res.redirect('/category-1/studentorganizations');
            })
    }
});

//process Industrial visit activities form
router.post('/industrialVisitActivities', (req, res) => {
    let errors = [];

    if (req.body.iv_start_date > req.body.iv_end_date) {
        errors.push({ text: 'End Date should not be before start date' });
    }
    else if (!req.body.industrial_visit_days || req.body.industrial_visit_days < 0) {
        errors.push({ text: 'Number of days cannot be less than 0' });
    }
    else if (!req.body.industrial_visit_hrs || req.body.industrial_visit_hrs < 0) {
        errors.push({ text: 'Number of hours cannot be less than 0' });
    }
    if (errors.length > 0) {
        res.render('category-1/industrialVisitActivities', {
            errors: errors,
            industrial_visit_role: req.body.industrial_visit_role,
            class_name: req.body.class_name,
            department: req.body.department,
            industrial_visit_days: req.body.industrial_visit_days,
            industrial_visit_organizer: req.body.industrial_visit_organizer,
            name_of_company: req.body.name_of_company,
            iv_description: req.body.iv_description,
            industrial_visit_hrs: req.body.industrial_visit_hrs,
            iv_start_date: req.body.iv_start_date,
            iv_end_date: req.body.iv_end_date
        }
        )
    }
    else {
        // add preleave data into db
        const industrialVisitRecords = {
            academic_year: year,
            industrial_visit_role: req.body.industrial_visit_role,
            class_name: req.body.class_name,
            department: req.body.department,
            industrial_visit_days: req.body.industrial_visit_days,
            industrial_visit_organizer: req.body.industrial_visit_organizer,
            name_of_company: req.body.name_of_company,
            iv_description: req.body.iv_description,
            industrial_visit_hrs: req.body.industrial_visit_hrs,
            iv_start_date: req.body.iv_start_date,
            iv_end_date: req.body.iv_end_date,
            user: req.user.id
        }
        new IndustrialVisitActivities(industrialVisitRecords)
            .save()
            .then(industrialVisit => {
                req.flash('success_msg', 'Data entered successfully');
                res.redirect('/category-1/admissionProcessActivities');
            })
            .catch(err => {
                console.log(err);
                req.flash('error_msg', 'faculty ID not found please login again.');
                res.redirect('/category-1/industrialVisitActivities');
            })
    }
});


//process exam assessment external form
router.post('/examAssessmentExternal', (req, res) => {
    let errors = [];

    if (!req.body.papers_revaluated || req.body.papers_revaluated < 0) {
        errors.push({ text: 'Number of papers evaluated cannot be less than 0' });
    }
    if (!req.body.papers_moderated || req.body.papers_moderated < 0) {
        errors.push({ text: 'Number of papers moderated cannot be less than 0' });
    }
    if (errors.length > 0) {
        res.render('category-1/examAssessmentExternal', {
            errors: errors,
            exam_role_external: req.body.exam_role_external,
            semester: req.body.semester,
            name_of_college_university: req.body.name_of_college_university,
            exam_subject_external: req.body.exam_subject_external,
            outdoor_activities: req.body.outdoor_activities,
            papers_revaluated: req.body.papers_revaluated,
            papers_moderated: req.body.papers_moderated
        }
        )
    }
    else {
        // add preleave data into db
        const examAssessmentRecords = {
            academic_year: year,
            exam_role_external: req.body.exam_role_external,
            semester: req.body.semester,
            name_of_college_university: req.body.name_of_college_university,
            exam_subject_external: req.body.exam_subject_external,
            outdoor_activities: req.body.outdoor_activities,
            papers_revaluated: req.body.papers_revaluated,
            papers_moderated: req.body.papers_moderated,
            user: req.user.id
        }
        new ExamAssessmentExternal(examAssessmentRecords)
            .save()
            .then(examAssessment => {
                req.flash('success_msg', 'Data entered successfully');
                res.redirect('/category-1/examActivitiesSupervision');
            })
            .catch(err => {
                console.log(err);
                req.flash('error_msg', 'faculty ID not found please login again.');
                res.redirect('/category-1/examAssessmentExternal');
            })
    }
});

//process exam assessment external form
router.post('/examActivitiesSupervision', (req, res) => {
    let errors = [];

    if (!req.body.morning_sessions || req.body.morning_sessions < 0) {
        errors.push({ text: 'Number of morning sessions cannot be less than 0' });
    }
    else if (!req.body.evening_sessions || req.body.evening_sessions < 0) {
        errors.push({ text: 'Number of evening sessions cannot be less than 0' });
    }
    else if (!req.body.no_of_supervision_days || req.body.no_of_supervision_days < 0) {
        errors.push({ text: 'Number of supervision days cannot be less than 0' });
    }
    if (errors.length > 0) {
        res.render('category-1/examActivitiesSupervision', {
            errors: errors,
            exam_role: req.body.exam_role,
            exam_name: req.body.exam_name,
            morning_sessions: req.body.morning_sessions,
            evening_sessions: req.body.evening_sessions,
            no_of_supervision_days: req.body.no_of_supervision_days
        }
        )
    }
    else {
        // add preleave data into db
        const examActivitiesSupervisionRecords = {
            academic_year: year,
            exam_role: req.body.exam_role,
            exam_name: req.body.exam_name,
            morning_sessions: req.body.morning_sessions,
            evening_sessions: req.body.evening_sessions,
            no_of_supervision_days: req.body.no_of_supervision_days,
            user: req.user.id
        }
        new ExamActivitiesSupervision(examActivitiesSupervisionRecords)
            .save()
            .then(examActivitiesSupervision => {
                req.flash('success_msg', 'Data entered successfully');
                res.redirect('/category-1/examActivitiesCollegeLevel');
            })
            .catch(err => {
                console.log(err);
                req.flash('error_msg', 'faculty ID not found please login again.');
                res.redirect('/category-1/examActivitiesSupervision');
            })
    }
});

//process exam activities college level form
router.post('/examActivitiesCollegeLevel', (req, res) => {
    // add preleave data into db
    const examActivitiesCollegeLevel = {
        subject_name: req.body.subject_name,
        semester: req.body.semester,
        exam_type: req.body.exam_type,
        user: req.user.id
    }
    new ExamActivitiesCollegeLevel(examActivitiesCollegeLevel)
        .save()
        .then(examActivitiesCollege => {
            req.flash('success_msg', 'Data entered successfully');
            res.redirect('/category-1/ITmaintenance');
        })
        .catch(err => {
            console.log(err);
            req.flash('error_msg', 'faculty ID not found please login again.');
            res.redirect('/category-1/examActivitiesCollegeLevel');
        })
});

//process inhouse placement form
router.post('/ITmaintenance', (req, res) => {
    // add preleave data into db
    const ITmaintenance = {
        academic_year: year,
        class_name: req.body.class_name,
        IT_maintenance_desc: req.body.IT_maintenance_desc,
        IT_maintenance_task: req.body.IT_maintenance_task,
        it_maintenance_date: req.body.it_maintenance_date,
        user: req.user.id
    }
    new ITMaintenance(ITmaintenance)
        .save()
        .then(ITmaintenance => {
            req.flash('success_msg', 'Data entered successfully');
            res.redirect('/category-1/lakshya');
        })
        .catch(err => {
            console.log(err);
            req.flash('error_msg', 'faculty ID not found please login again.');
            res.redirect('/category-1/ITmaintenance');
        })
});

//process lakshya form
router.post('/lakshya', (req, res) => {
    let errors = [];

    if (!req.body.lakshya_no_of_participants || req.body.lakshya_no_of_participants < 0) {
        errors.push({ text: 'Number of participants cannot be less than 0' });
    }
    if (errors.length > 0) {
        res.render('category-1/lakshya', {
            errors: errors,
            lakshya_activities: req.body.lakshya_activities,
            lakshya_description: req.body.lakshya_description,
            lakshya_date: req.body.lakshya_date,
            lakshya_no_of_participants: req.body.lakshya_no_of_participants
        }
        )
    }
    else {
        // add preleave data into db
        const lakshyaRecords = {
            academic_year: year,
            lakshya_activities: req.body.lakshya_activities,
            lakshya_description: req.body.lakshya_description,
            lakshya_date: req.body.lakshya_date,
            lakshya_no_of_participants: req.body.lakshya_no_of_participants,
            user: req.user.id
        }
        new Lakshya(lakshyaRecords)
            .save()
            .then(lakshyaData => {
                req.flash('success_msg', 'Data entered successfully');
                res.redirect('/category-1/magazineNewsletter');
            })
            .catch(err => {
                console.log(err);
                req.flash('error_msg', 'faculty ID not found please login again.');
                res.redirect('/category-1/lakshya');
            })
    }
});

//process magazine/newsletter form
router.post('/magazineNewsletter', (req, res) => {
    // add preleave data into db
    const magazineNewsletterRecords = {
        academic_year: year,
        class_name: req.body.class_name,
        magazine_role: req.body.magazine_role,
        magazineNewsletter_type: req.body.magazineNewsletter_type,
        year_of_publication: req.body.year_of_publication,
        user: req.user.id
    }
    new MagazineNewsletter(magazineNewsletterRecords)
        .save()
        .then(magazineNewsletter => {
            req.flash('success_msg', 'Data entered successfully');
            res.redirect('/category-1/conductOfSTTP');
        })
        .catch(err => {
            console.log(err);
            req.flash('error_msg', 'faculty ID not found please login again.');
            res.redirect('/category-1/magazineNewsletter');
        })
});

//process student organizations form
router.post('/conductOfSTTP', (req, res) => {
    let errors = [];

    if (req.body.sttp_start_date > req.body.sttp_end_date) {
        errors.push({ text: 'End Date should not be before start date' });
    }
    else if (!req.body.no_of_sttp || req.body.no_of_sttp < 0) {
        errors.push({ text: 'Number of STTP cannot be less than 0' });
    }
    else if (!req.body.sttp_duration || req.body.sttp_duration < 0) {
        errors.push({ text: 'Duration cannot be less than 0' });
    }
    else if (!req.body.sttp_participants || req.body.sttp_participants < 0) {
        errors.push({ text: 'Number of participants cannot be less than 0' });
    }
    if (errors.length > 0) {
        res.render('category-1/conductOfSTTP', {
            errors: errors,
            sttp_role: req.body.sttp_role,
            no_of_sttp: req.body.no_of_sttp,
            sttp_technology: req.body.sttp_technology,
            sttp_duration: req.body.sttp_duration,
            sttp_start_date: req.body.sttp_start_date,
            sttp_end_date: req.body.sttp_end_date,
            sttp_participants: req.body.sttp_participants,
            department: req.body.department
        }
        )
    }
    else {
        // add preleave data into db
        const conductOfSTTPRecords = {
            academic_year: year,
            sttp_role: req.body.sttp_role,
            no_of_sttp: req.body.no_of_sttp,
            sttp_technology: req.body.sttp_technology,
            sttp_duration: req.body.sttp_duration,
            sttp_start_date: req.body.sttp_start_date,
            sttp_end_date: req.body.sttp_end_date,
            sttp_participants: req.body.sttp_participants,
            department: req.body.department,
            user: req.user.id
        }
        new STTP(conductOfSTTPRecords)
            .save()
            .then(sttp => {
                req.flash('success_msg', 'Data entered successfully');
                res.redirect('/category-1/departmentUGProjects');
            })
            .catch(err => {
                console.log(err);
                req.flash('error_msg', 'faculty ID not found please login again.');
                res.redirect('/category-1/conductOfSTTP');
            })
    }
});

//process class advisor form
router.post('/departmentUGProjects', (req, res) => {
    let errors = [];

    if (!req.body.project_no_of_students || req.body.project_no_of_students < 0) {
        errors.push({ text: 'Number of students cannot be less than 0' });
    }
    if (errors.length > 0) {
        res.render('category-1/departmentUGProjects', {
            errors: errors,
            dept_project_role: req.body.dept_project_role,
            project_title: req.body.project_title,
            project_no_of_students: req.body.project_no_of_students
        }
        )
    }
    else {
        // add preleave data into db
        const departmentUGProjectRecords = {
            academic_year: year,
            dept_project_role: req.body.dept_project_role,
            project_title: req.body.project_title,
            project_no_of_students: req.body.project_no_of_students,
            user: req.user.id
        }
        new DepartmentUGProjects(departmentUGProjectRecords)
            .save()
            .then(departmentUGProject => {
                req.flash('success_msg', 'Data entered successfully');
                res.redirect('/category-2/papersPublishedinNationalConf');
            })
            .catch(err => {
                console.log(err);
                req.flash('error_msg', 'faculty ID not found please login again.');
                res.redirect('/category-1/departmentUGProjects');
            })
    }
});

// Edit request (PUT request)

// Put route teaching contribution New Added
router.put('/teachingContribution/:id', (req, res) => {
    TeachingContribution.findOne({ _id: req.params.id })
        .then(result => {
            result.lecturesDelivered = req.body.lecturesDelivered,
                result.lecturesAllocated = req.body.lecturesAllocated,
                result.tutorialsDelivered = req.body.tutorialsDelivered,
                result.tutorialsAllocated = req.body.tutorialsAllocated,
                result.practicalSessionsDelivered = req.body.practicalSessionsDelivered,
                result.practicalSessionsAllocated = req.body.practicalSessionsAllocated,
                result.scoreOne = req.body.scoreOne

            result.save()
                .then(() => {
                    req.flash('success_msg', 'Data updated successfully');
                    res.redirect('/category-1/teachingContribution');
                })
                .catch(() => {
                    req.flash('error_msg', 'Data not updated. Please try again.');
                    res.redirect('/category-1/teachingContribution');
                })
        })
        .catch(() => {
            req.flash('error_msg', 'User not found. Please login again.');
            res.redirect('/category-1/teachingContribution');
        })
});

// Put route lectures excess New Added
router.put('/lecturesExcess/:id', (req, res) => {
    LecturesExcess.findOne({ _id: req.params.id })
        .then(result => {
            result.lecturesTaken = req.body.lecturesTaken,
                result.tutorialsTaken = req.body.tutorialsTaken,
                result.practicalSessionsTaken = req.body.practicalSessionsTaken,
                result.scoreTwo = req.body.scoreTwo

            result.save()
                .then(() => {
                    req.flash('success_msg', 'Data updated successfully');
                    res.redirect('/category-1/lecturesExcess');
                })
                .catch(() => {
                    req.flash('error_msg', 'Data not updated. Please try again.');
                    res.redirect('/category-1/lecturesExcess');
                })
        })
        .catch(() => {
            req.flash('error_msg', 'User not found. Please login again.');
            res.redirect('/category-1/lecturesExcess');
        })
});

// Put route Additional Resources New Added
router.put('/additionalResources/:id', (req, res) => {
    AdditionalResources.findOne({ _id: req.params.id })
        .then(result => {
            result.materials = req.body.materials,
                
                result.scoreThree = req.body.scoreThree

            result.save()
                .then(() => {
                    req.flash('success_msg', 'Data updated successfully');
                    res.redirect('/category-1/additionalResources');
                })
                .catch(() => {
                    req.flash('error_msg', 'Data not updated. Please try again.');
                    res.redirect('/category-1/additionalResources');
                })
        })
        .catch(() => {
            req.flash('error_msg', 'User not found. Please login again.');
            res.redirect('/category-1/additionalResources');
        })
});

// Put route Innovative Teaching New Added
router.put('/innovativeTeaching/:id', (req, res) => {
    InnovativeTeaching.findOne({ _id: req.params.id })
        .then(result => {
            result.techniques = req.body.techniques,
                
                result.scoreFour = req.body.scoreFour

            result.save()
                .then(() => {
                    req.flash('success_msg', 'Data updated successfully');
                    res.redirect('/category-1/innovativeTeaching');
                })
                .catch(() => {
                    req.flash('error_msg', 'Data not updated. Please try again.');
                    res.redirect('/category-1/innovativeTeaching');
                })
        })
        .catch(() => {
            req.flash('error_msg', 'User not found. Please login again.');
            res.redirect('/category-1/innovativeTeaching');
        })
});

// Put route Examination Duties New Added
router.put('/examinationDuties/:id', (req, res) => {
    ExaminationDuties.findOne({ _id: req.params.id })
        .then(result => {
            result.invigilation = req.body.invigilation === "on",
                result.questionPaperSetting = req.body.questionPaperSetting === "on",
                result.evaluationAnswerScripts = req.body.evaluationAnswerScripts === "on",
                result.paperModeration = req.body.paperModeration === "on",
                result.labEvaluation = req.body.labEvaluation ==="on",
                result.scoreFive = req.body.scoreFive

            result.save()
                .then(() => {
                    req.flash('success_msg', 'Data updated successfully');
                    res.redirect('/category-1/examinationDuties');
                })
                .catch(() => {
                    req.flash('error_msg', 'Data not updated. Please try again.');
                    res.redirect('/category-1/examinationDuties');
                })
        })
        .catch(() => {
            req.flash('error_msg', 'User not found. Please login again.');
            res.redirect('/category-1/examinationDuties');
        })
});



router.put('/timeTable/:id', (req, res) => {
    TimeTable.findOne({ _id: req.params.id })
        .then(result => {
            result.role = req.body.role,
                result.department = req.body.department,
                result.semester = req.body.semester

            result.save()
                .then(() => {
                    req.flash('success_msg', 'Data updated successfully');
                    res.redirect('/category-1/timeTable');
                })
                .catch(() => {
                    req.flash('error_msg', 'Data not updated. Please try logging in again.');
                    res.redirect('/category-1/timeTable');
                })
        })
        .catch(() => {
            req.flash('error_msg', 'User not found. Please try logging in again.');
            res.redirect('/category-1/timeTable');
        })
});



router.put('/sportsActivities/:id', (req, res) => {
    SportsActivities.findOne({ _id: req.params.id })
        .then(result => {
            result.sports_name = req.body.sports_name,
                result.sports_category = req.body.sports_category,
                result.sports_role = req.body.sports_role,
                result.sports_ojus_or_other = req.body.sports_ojus_or_other

            result.save()
                .then(() => {
                    req.flash('success_msg', 'Data updated successfully');
                    res.redirect('/category-1/sportsActivities');
                })
                .catch(() => {
                    req.flash('error_msg', 'Data not updated. Please try logging in again.');
                    res.redirect('/category-1/sportsActivities');
                })
        })
        .catch(() => {
            req.flash('error_msg', 'User not found. Please try logging in again.');
            res.redirect('/category-1/sportsActivities');
        })
});

router.put('/culturalActivities/:id', (req, res) => {
    CulturalActivities.findOne({ _id: req.params.id })
        .then(result => {
            result.cultural_name = req.body.cultural_name,
                result.cultural_category = req.body.cultural_category,
                result.cultural_role = req.body.cultural_role,
                result.cultural_ojus_or_other = req.body.cultural_ojus_or_other

            result.save()
                .then(() => {
                    req.flash('success_msg', 'Data updated successfully');
                    res.redirect('/category-1/culturalActivities');
                })
                .catch(() => {
                    req.flash('error_msg', 'Data not updated. Please try logging in again.');
                    res.redirect('/category-1/culturalActivities');
                })
        })
        .catch(() => {
            req.flash('error_msg', 'User not found. Please try logging in again.');
            res.redirect('/category-1/culturalActivities');
        })
});

router.put('/projectBasedLearning/:id', (req, res) => {
    let errors = [];
    if (req.body.pbl_start_date > req.body.pbl_end_date) {
        errors.push({ text: 'End Date should not be before start date' });
    }
    if (errors.length > 0) {
        if (req.body.pbl_start_date > req.body.pbl_end_date) {
            req.flash('error_msg', 'End Date should not be before start date');
            res.redirect('/category-1/projectBasedLearning');
        }
    }
    else {
        ProjectBasedLearning.findOne({ _id: req.params.id })
            .then(result => {
                result.pbl_subject = req.body.pbl_subject,
                    result.pbl_role = req.body.pbl_role,
                    result.pbl_start_date = req.body.pbl_start_date,
                    result.pbl_end_date = req.body.pbl_end_date,
                    result.pbl_description = req.body.pbl_description

                result.save()
                    .then(() => {
                        req.flash('success_msg', 'Data updated successfully');
                        res.redirect('/category-1/projectBasedLearning');
                    })
                    .catch(() => {
                        req.flash('error_msg', 'Data not updated. Please try logging in again.');
                        res.redirect('/category-1/projectBasedLearning');
                    })
            })
            .catch(() => {
                req.flash('error_msg', 'User not found. Please try logging in again.');
                res.redirect('/category-1/projectBasedLearning');
            })
    }
});





router.put('/placementActivities/:id', (req, res) => {
    let errors = [];
    if (!req.body.no_of_companies || req.body.no_of_companies < 0) {
        errors.push({ text: 'Number of companies cannot be less than 0' });
    }
    else if (!req.body.no_of_placed_students || req.body.no_of_placed_students < 0) {
        errors.push({ text: 'Number of placed students cannot be less than 0' });
    }
    if (errors.length > 0) {
        if (!req.body.no_of_companies || req.body.no_of_companies < 0) {
            req.flash('error_msg', 'Number of companies cannot be less than 0');
            res.redirect('/category-1/placementActivities');
        }
        else if (!req.body.no_of_placed_students || req.body.no_of_placed_students < 0) {
            req.flash('error_msg', 'Number of placed students cannot be less than 0');
            res.redirect('/category-1/placementActivities');
        }

    }
    else {
        PlacementActivities.findOne({ _id: req.params.id })
            .then(result => {
                result.placement_role = req.body.placement_role,
                    result.no_of_companies = req.body.no_of_companies,
                    result.no_of_placed_students = req.body.no_of_placed_students,
                    result.department = req.body.department

                result.save()
                    .then(() => {
                        req.flash('success_msg', 'Data updated successfully');
                        res.redirect('/category-1/placementActivities');
                    })
                    .catch(() => {
                        req.flash('error_msg', 'Data not updated. Please try logging in again.');
                        res.redirect('/category-1/placementActivities');
                    })
            })
            .catch(() => {
                req.flash('error_msg', 'User not found. Please try logging in again.');
                res.redirect('/category-1/placementActivities');
            })
    }
});

router.put('/inhousePlacement/:id', (req, res) => {
    let errors = [];
    if (!req.body.no_of_participants || req.body.no_of_participants < 0) {
        errors.push({ text: 'Number of participants cannot be less than 0' });
    }
    if (errors.length > 0) {
        if (!req.body.no_of_participants || req.body.no_of_participants < 0) {
            req.flash('error_msg', 'Number of participants cannot be less than 0');
            res.redirect('/category-1/inhousePlacement');
        }
    }
    else {
        InhousePlacement.findOne({ _id: req.params.id })
            .then(result => {
                result.trainings_and_workshops = req.body.trainings_and_workshops,
                    result.class_name = req.body.class_name,
                    result.department = req.body.department,
                    result.no_of_participants = req.body.no_of_participants

                result.save()
                    .then(() => {
                        req.flash('success_msg', 'Data updated successfully');
                        res.redirect('/category-1/inhousePlacement');
                    })
                    .catch(() => {
                        req.flash('error_msg', 'Data not updated. Please try logging in again.');
                        res.redirect('/category-1/inhousePlacement');
                    })
            })
            .catch(() => {
                req.flash('error_msg', 'User not found. Please try logging in again.');
                res.redirect('/category-1/inhousePlacement');
            })
    }
});

router.put('/studentorganizations/:id', (req, res) => {
    let errors = [];
    if (req.body.student_event_start_date > req.body.student_event_end_date) {
        errors.push({ text: 'End Date should not be before start date' });
    }
    else if (!req.body.no_of_participants || req.body.no_of_participants < 0) {
        errors.push({ text: 'Number of participants cannot be less than 0' });
    }
    else if (!req.body.student_event_duration || req.body.student_event_duration < 0) {
        errors.push({ text: 'Event Duration cannot be less than 0' });
    }
    if (errors.length > 0) {
        if (req.body.student_event_start_date > req.body.student_event_end_date) {
            req.flash('error_msg', 'End Date should not be before start date');
            res.redirect('/category-1/studentorganizations');
        }
        else if (!req.body.no_of_participants || req.body.no_of_participants < 0) {
            req.flash('error_msg', 'Number of participants cannot be less than 0');
            res.redirect('/category-1/studentorganizations');
        }
        else if (!req.body.student_event_duration || req.body.student_event_duration < 0) {
            req.flash('error_msg', 'Event Duration cannot be less than 0');
            res.redirect('/category-1/studentorganizations');
        }
    }
    else {
        StudentOrganizations.findOne({ _id: req.params.id })
            .then(result => {
                result.student_organizations_trainings = req.body.student_organizations_trainings,
                    result.class_name = req.body.class_name,
                    result.department = req.body.department,
                    result.no_of_participants = req.body.no_of_participants,
                    result.student_organization_role = req.body.student_organization_role,
                    result.student_event_duration = req.body.student_event_duration,
                    result.student_event_start_date = req.body.student_event_start_date,
                    result.student_event_end_date = req.body.student_event_end_date

                result.save()
                    .then(() => {
                        req.flash('success_msg', 'Data updated successfully');
                        res.redirect('/category-1/studentorganizations');
                    })
                    .catch(() => {
                        req.flash('error_msg', 'Data not updated. Please try logging in again.');
                        res.redirect('/category-1/studentorganizations');
                    })
            })
            .catch(() => {
                req.flash('error_msg', 'User not found. Please try logging in again.');
                res.redirect('/category-1/studentorganizations');
            })
    }
});

router.put('/industrialVisitActivities/:id', (req, res) => {
    let errors = [];
    if (req.body.iv_start_date > req.body.iv_end_date) {
        errors.push({ text: 'End Date should not be before start date' });
    }
    else if (!req.body.industrial_visit_days || req.body.industrial_visit_days < 0) {
        errors.push({ text: 'Number of days cannot be less than 0' });
    }
    else if (!req.body.industrial_visit_hrs || req.body.industrial_visit_hrs < 0) {
        errors.push({ text: 'Number of hours cannot be less than 0' });
    }
    if (errors.length > 0) {
        if (req.body.iv_start_date > req.body.iv_end_date) {
            req.flash('error_msg', 'End Date should not be before start date');
            res.redirect('/category-1/industrialVisitActivities');
        }
        else if (!req.body.industrial_visit_days || req.body.industrial_visit_days < 0) {
            req.flash('error_msg', 'Number of days cannot be less than 0');
            res.redirect('/category-1/industrialVisitActivities');
        }
        else if (!req.body.industrial_visit_hrs || req.body.industrial_visit_hrs < 0) {
            req.flash('error_msg', 'Number of hours cannot be less than 0');
            res.redirect('/category-1/industrialVisitActivities');
        }
    }
    IndustrialVisitActivities.findOne({ _id: req.params.id })
        .then(result => {
            result.industrial_visit_role = req.body.industrial_visit_role,
                result.class_name = req.body.class_name,
                result.department = req.body.department,
                result.industrial_visit_days = req.body.industrial_visit_days,
                result.industrial_visit_organizer = req.body.industrial_visit_organizer,
                result.name_of_company = req.body.name_of_company,
                result.iv_description = req.body.iv_description,
                result.industrial_visit_hrs = req.body.industrial_visit_hrs,
                result.iv_start_date = req.body.iv_start_date,
                result.iv_end_date = req.body.iv_end_date

            result.save()
                .then(() => {
                    req.flash('success_msg', 'Data updated successfully');
                    res.redirect('/category-1/industrialVisitActivities');
                })
                .catch(() => {
                    req.flash('error_msg', 'Data not updated. Please try logging in again.');
                    res.redirect('/category-1/industrialVisitActivities');
                })
        })
        .catch(() => {
            req.flash('error_msg', 'User not found. Please try logging in again.');
            res.redirect('/category-1/industrialVisitActivities');
        })
});



router.put('/examAssessmentExternal/:id', (req, res) => {
    let errors = [];
    if (!req.body.papers_revaluated || req.body.papers_revaluated < 0) {
        errors.push({ text: 'Number of papers evaluated cannot be less than 0' });
    }
    if (!req.body.papers_moderated || req.body.papers_moderated < 0) {
        errors.push({ text: 'Number of papers moderated cannot be less than 0' });
    }
    if (errors.length > 0) {
        if (!req.body.papers_revaluated || req.body.papers_revaluated < 0) {
            req.flash('error_msg', 'Number of papers evaluated cannot be less than 0');
            res.redirect('/category-1/examAssessmentExternal');
        }
        if (!req.body.papers_moderated || req.body.papers_moderated < 0) {
            req.flash('error_msg', 'Number of papers moderated cannot be less than 0');
            res.redirect('/category-1/examAssessmentExternal');
        }
    }
    else {
        ExamAssessmentExternal.findOne({ _id: req.params.id })
            .then(result => {
                result.exam_role_external = req.body.exam_role_external,
                    result.semester = req.body.semester,
                    result.name_of_college_university = req.body.name_of_college_university,
                    result.exam_subject_external = req.body.exam_subject_external,
                    result.outdoor_activities = req.body.outdoor_activities,
                    result.papers_revaluated = req.body.papers_revaluated,
                    result.papers_moderated = req.body.papers_moderated

                result.save()
                    .then(() => {
                        req.flash('success_msg', 'Data updated successfully');
                        res.redirect('/category-1/examAssessmentExternal');
                    })
                    .catch(() => {
                        req.flash('error_msg', 'Data not updated. Please try logging in again.');
                        res.redirect('/category-1/examAssessmentExternal');
                    })
            })
            .catch(() => {
                req.flash('error_msg', 'User not found. Please try logging in again.');
                res.redirect('/category-1/examAssessmentExternal');
            })
    }
});

router.put('/examActivitiesSupervision/:id', (req, res) => {
    let errors = [];
    if (!req.body.morning_sessions || req.body.morning_sessions < 0) {
        errors.push({ text: 'Number of morning sessions cannot be less than 0' });
    }
    else if (!req.body.evening_sessions || req.body.evening_sessions < 0) {
        errors.push({ text: 'Number of evening sessions cannot be less than 0' });


    }
    else if (!req.body.no_of_supervision_days || req.body.no_of_supervision_days < 0) {
        errors.push({ text: 'Number of supervision days cannot be less than 0' });

    }
    if (errors.length > 0) {
        if (!req.body.morning_sessions || req.body.morning_sessions < 0) {
            req.flash('error_msg', 'Number of morning sessions cannot be less than 0');
            res.redirect('/category-1/examActivitiesSupervision');

        }
        else if (!req.body.evening_sessions || req.body.evening_sessions < 0) {
            req.flash('error_msg', 'Number of evening sessions cannot be less than 0');
            res.redirect('/category-1/examActivitiesSupervision');

        }
        else if (!req.body.no_of_supervision_days || req.body.no_of_supervision_days < 0) {
            req.flash('error_msg', 'Number of supervision days cannot be less than 0');
            res.redirect('/category-1/examActivitiesSupervision');

        }

    }
    else {
        ExamActivitiesSupervision.findOne({ _id: req.params.id })
            .then(result => {
                result.exam_role = req.body.exam_role,
                    result.exam_name = req.body.exam_name,
                    result.morning_sessions = req.body.morning_sessions,
                    result.evening_sessions = req.body.evening_sessions,
                    result.no_of_supervision_days = req.body.no_of_supervision_days

                result.save()
                    .then(() => {
                        req.flash('success_msg', 'Data updated successfully');
                        res.redirect('/category-1/examActivitiesSupervision');
                    })
                    .catch(() => {
                        req.flash('error_msg', 'Data not updated. Please try logging in again.');
                        res.redirect('/category-1/examActivitiesSupervision');
                    })
            })
            .catch(() => {
                req.flash('error_msg', 'User not found. Please try logging in again.');
                res.redirect('/category-1/examActivitiesSupervision');
            })
    }
});

router.put('/examActivitiesCollegeLevel/:id', (req, res) => {
    ExamActivitiesCollegeLevel.findOne({ _id: req.params.id })
        .then(result => {
            result.subject_name = req.body.subject_name,
                result.semester = req.body.semester,
                result.exam_type = req.body.exam_type

            result.save()
                .then(() => {
                    req.flash('success_msg', 'Data updated successfully');
                    res.redirect('/category-1/examActivitiesCollegeLevel');
                })
                .catch(() => {
                    req.flash('error_msg', 'Data not updated. Please try logging in again.');
                    res.redirect('/category-1/examActivitiesCollegeLevel');
                })
        })
        .catch(() => {
            req.flash('error_msg', 'User not found. Please try logging in again.');
            res.redirect('/category-1/examActivitiesCollegeLevel');
        })
});

router.put('/ITmaintenance/:id', (req, res) => {
    ITMaintenance.findOne({ _id: req.params.id })
        .then(result => {
            result.class_name = req.body.class_name,
                result.IT_maintenance_desc = req.body.IT_maintenance_desc,
                result.IT_maintenance_task = req.body.IT_maintenance_task,
                result.it_maintenance_date = req.body.it_maintenance_date

            result.save()
                .then(() => {
                    req.flash('success_msg', 'Data updated successfully');
                    res.redirect('/category-1/ITmaintenance');
                })
                .catch(() => {
                    req.flash('error_msg', 'Data not updated. Please try logging in again.');
                    res.redirect('/category-1/ITmaintenance');
                })
        })
        .catch(() => {
            req.flash('error_msg', 'User not found. Please try logging in again.');
            res.redirect('/category-1/ITmaintenance');
        })
});

router.put('/lakshya/:id', (req, res) => {
    let errors = [];
    if (!req.body.lakshya_no_of_participants || req.body.lakshya_no_of_participants < 0) {
        errors.push({ text: 'Number of participants cannot be less than 0' });
    }
    if (errors.length > 0) {
        if (!req.body.lakshya_no_of_participants || req.body.lakshya_no_of_participants < 0) {
            req.flash('error_msg', 'Number of participants cannot be less than 0');
            res.redirect('/category-1/lakshya');
        }
    }
    else {
        Lakshya.findOne({ _id: req.params.id })
            .then(result => {
                result.lakshya_activities = req.body.lakshya_activities,
                    result.lakshya_description = req.body.lakshya_description,
                    result.lakshya_date = req.body.lakshya_date,
                    result.lakshya_no_of_participants = req.body.lakshya_no_of_participants

                result.save()
                    .then(() => {
                        req.flash('success_msg', 'Data updated successfully');
                        res.redirect('/category-1/lakshya');
                    })
                    .catch(() => {
                        req.flash('error_msg', 'Data not updated. Please try logging in again.');
                        res.redirect('/category-1/lakshya');
                    })
            })
            .catch(() => {
                req.flash('error_msg', 'User not found. Please try logging in again.');
                res.redirect('/category-1/lakshya');
            })
    }
});

router.put('/magazineNewsletter/:id', (req, res) => {
    MagazineNewsletter.findOne({ _id: req.params.id })
        .then(result => {
            result.class_name = req.body.class_name,
                result.magazine_role = req.body.magazine_role,
                result.magazineNewsletter_type = req.body.magazineNewsletter_type,
                result.year_of_publication = req.body.year_of_publication

            result.save()
                .then(() => {
                    req.flash('success_msg', 'Data updated successfully');
                    res.redirect('/category-1/magazineNewsletter');
                })
                .catch(() => {
                    req.flash('error_msg', 'Data not updated. Please try logging in again.');
                    res.redirect('/category-1/magazineNewsletter');
                })
        })
        .catch(() => {
            req.flash('error_msg', 'User not found. Please try logging in again.');
            res.redirect('/category-1/magazineNewsletter');
        })
});

router.put('/conductOfSTTP/:id', (req, res) => {
    let errors = [];
    if (req.body.sttp_start_date > req.body.sttp_end_date) {
        errors.push({ text: 'End Date should not be before start date' });
    }
    else if (!req.body.no_of_sttp || req.body.no_of_sttp < 0) {
        errors.push({ text: 'Number of STTP cannot be less than 0' });
    }
    else if (!req.body.sttp_duration || req.body.sttp_duration < 0) {
        errors.push({ text: 'Duration cannot be less than 0' });
    }
    else if (!req.body.sttp_participants || req.body.sttp_participants < 0) {
        errors.push({ text: 'Number of participants cannot be less than 0' });
    }
    if (errors.length > 0) {
        if (req.body.udaan_start_date > req.body.udaan_end_date) {
            req.flash('error_msg', 'End Date should not be before start date');
            res.redirect('/category-1/conductOfSTTP');
        }
        if (req.body.sttp_start_date > req.body.sttp_end_date) {
            req.flash('error_msg', 'End Date should not be before start date');
            res.redirect('/category-1/conductOfSTTP');
        }
        else if (!req.body.no_of_sttp || req.body.no_of_sttp < 0) {
            req.flash('error_msg', 'Number of STTP cannot be less than 0');
            res.redirect('/category-1/conductOfSTTP');
        }
        else if (!req.body.sttp_duration || req.body.sttp_duration < 0) {
            req.flash('error_msg', 'Duration cannot be less than 0');
            res.redirect('/category-1/conductOfSTTP');
        }
        else if (!req.body.sttp_participants || req.body.sttp_participants < 0) {
            req.flash('error_msg', 'Number of participants cannot be less than 0');
        }
    }
    else {
        STTP.findOne({ _id: req.params.id })
            .then(result => {
                result.sttp_role = req.body.sttp_role,
                    result.no_of_sttp = req.body.no_of_sttp,
                    result.sttp_technology = req.body.sttp_technology,
                    result.sttp_duration = req.body.sttp_duration,
                    result.sttp_start_date = req.body.sttp_start_date,
                    result.sttp_end_date = req.body.sttp_end_date,
                    result.sttp_participants = req.body.sttp_participants,
                    result.department = req.body.department

                result.save()
                    .then(() => {
                        req.flash('success_msg', 'Data updated successfully');
                        res.redirect('/category-1/conductOfSTTP');
                    })
                    .catch(() => {
                        req.flash('error_msg', 'Data not updated. Please try logging in again.');
                        res.redirect('/category-1/conductOfSTTP');
                    })
            })
            .catch(() => {
                req.flash('error_msg', 'User not found. Please try logging in again.');
                res.redirect('/category-1/conductOfSTTP');
            })
    }
});

router.put('/departmentUGProjects/:id', (req, res) => {
    let errors = [];
    if (!req.body.project_no_of_students || req.body.project_no_of_students < 0) {
        errors.push({ text: 'Number of students cannot be less than 0' });
    }
    if (errors.length > 0) {
        if (!req.body.project_no_of_students || req.body.project_no_of_students < 0) {
            req.flash('error_msg', 'Number of students cannot be less than 0');
            res.redirect('/category-1/departmentUGProjects');
        }
    }
    else {
        DepartmentUGProjects.findOne({ _id: req.params.id })
            .then(result => {
                result.dept_project_role = req.body.dept_project_role,
                    result.project_title = req.body.project_title,
                    result.project_no_of_students = req.body.project_no_of_students

                result.save()
                    .then(() => {
                        req.flash('success_msg', 'Data updated successfully');
                        res.redirect('/category-1/departmentUGProjects');
                    })
                    .catch(() => {
                        req.flash('error_msg', 'Data not updated. Please try logging in again.');
                        res.redirect('/category-1/departmentUGProjects');
                    })
            })
            .catch(() => {
                req.flash('error_msg', 'User not found. Please try logging in again.');
                res.redirect('/category-1/departmentUGProjects');
            })
    }
});

// Delete data of category-1 forms

//New Added DELETE route teaching Contribution
router.delete('/teachingContribution/delete/:id', (req, res) => {
    TeachingContribution.deleteOne({ _id: req.params.id })
        .then(() => {
            req.flash('success_msg', 'Record deleted successfully');
            res.redirect('/category-1/teachingContribution');
        })
        .catch(() => {
            req.flash('error_msg', 'Record not deleted. Please try again.');
            res.redirect('/category-1/teachingContribution');
        })
});

//New Added DELETE route lectures excess
router.delete('/lecturesExcess/delete/:id', (req, res) => {
    LecturesExcess.deleteOne({ _id: req.params.id })
        .then(() => {
            req.flash('success_msg', 'Record deleted successfully');
            res.redirect('/category-1/lecturesExcess');
        })
        .catch(() => {
            req.flash('error_msg', 'Record not deleted. Please try again.');
            res.redirect('/category-1/lecturesExcess');
        })
});

//New Added DELETE route Additional Resources
router.delete('/additionalResources/delete/:id', (req, res) => {
    AdditionalResources.deleteOne({ _id: req.params.id })
        .then(() => {
            req.flash('success_msg', 'Record deleted successfully');
            res.redirect('/category-1/additionalResources');
        })
        .catch(() => {
            req.flash('error_msg', 'Record not deleted. Please try again.');
            res.redirect('/category-1/additionalResources');
        })
});

//New Added DELETE route Innovative Teaching
router.delete('/innovativeTeaching/delete/:id', (req, res) => {
    InnovativeTeaching.deleteOne({ _id: req.params.id })
        .then(() => {
            req.flash('success_msg', 'Record deleted successfully');
            res.redirect('/category-1/innovativeTeaching');
        })
        .catch(() => {
            req.flash('error_msg', 'Record not deleted. Please try again.');
            res.redirect('/category-1/innovativeTeaching');
        })
});

//New Added DELETE route Examination Duties
router.delete('/examinationDuties/delete/:id', (req, res) => {
    ExaminationDuties.deleteOne({ _id: req.params.id })
        .then(() => {
            req.flash('success_msg', 'Record deleted successfully');
            res.redirect('/category-1/examinationDuties');
        })
        .catch(() => {
            req.flash('error_msg', 'Record not deleted. Please try again.');
            res.redirect('/category-1/examinationDuties');
        })
});

router.delete('/timeTable/delete/:id', (req, res) => {
    TimeTable.deleteOne({ _id: req.params.id })
        .then(() => {
            req.flash('success_msg', 'Data deleted successfully');
            res.redirect('/category-1/timeTable');
        })
        .catch(() => {
            req.flash('error_msg', 'User not found. Please try logging in again.');
            res.redirect('/category-1/timeTable');
        })
});



router.delete('/sportsActivities/delete/:id', (req, res) => {
    SportsActivities.deleteOne({ _id: req.params.id })
        .then(() => {
            req.flash('success_msg', 'Data deleted successfully');
            res.redirect('/category-1/sportsActivities');
        })
        .catch(() => {
            req.flash('error_msg', 'User not found. Please try logging in again.');
            res.redirect('/category-1/sportsActivities');
        })
});

router.delete('/culturalActivities/delete/:id', (req, res) => {
    CulturalActivities.deleteOne({ _id: req.params.id })
        .then(() => {
            req.flash('success_msg', 'Data deleted successfully');
            res.redirect('/category-1/culturalActivities');
        })
        .catch(() => {
            req.flash('error_msg', 'User not found. Please try logging in again.');
            res.redirect('/category-1/culturalActivities');
        })
});

router.delete('/projectBasedLearning/delete/:id', (req, res) => {
    ProjectBasedLearning.deleteOne({ _id: req.params.id })
        .then(() => {
            req.flash('success_msg', 'Data deleted successfully');
            res.redirect('/category-1/projectBasedLearning');
        })
        .catch(() => {
            req.flash('error_msg', 'User not found. Please try logging in again.');
            res.redirect('/category-1/projectBasedLearning');
        })
});



router.delete('/placementActivities/delete/:id', (req, res) => {
    PlacementActivities.deleteOne({ _id: req.params.id })
        .then(() => {
            req.flash('success_msg', 'Data deleted successfully');
            res.redirect('/category-1/placementActivities');
        })
        .catch(() => {
            req.flash('error_msg', 'User not found. Please try logging in again.');
            res.redirect('/category-1/placementActivities');
        })
});

router.delete('/inhousePlacement/delete/:id', (req, res) => {
    InhousePlacement.deleteOne({ _id: req.params.id })
        .then(() => {
            req.flash('success_msg', 'Data deleted successfully');
            res.redirect('/category-1/inhousePlacement');
        })
        .catch(() => {
            req.flash('error_msg', 'User not found. Please try logging in again.');
            res.redirect('/category-1/inhousePlacement');
        })
});

router.delete('/studentorganizations/delete/:id', (req, res) => {
    StudentOrganizations.deleteOne({ _id: req.params.id })
        .then(() => {
            req.flash('success_msg', 'Data deleted successfully');
            res.redirect('/category-1/studentorganizations');
        })
        .catch(() => {
            req.flash('error_msg', 'User not found. Please try logging in again.');
            res.redirect('/category-1/studentorganizations');
        })
});

router.delete('/industrialVisitActivities/delete/:id', (req, res) => {
    IndustrialVisitActivities.deleteOne({ _id: req.params.id })
        .then(() => {
            req.flash('success_msg', 'Data deleted successfully');
            res.redirect('/category-1/industrialVisitActivities');
        })
        .catch(() => {
            req.flash('error_msg', 'User not found. Please try logging in again.');
            res.redirect('/category-1/industrialVisitActivities');
        })
});



router.delete('/examAssessmentExternal/delete/:id', (req, res) => {
    ExamAssessmentExternal.deleteOne({ _id: req.params.id })
        .then(() => {
            req.flash('success_msg', 'Data deleted successfully');
            res.redirect('/category-1/examAssessmentExternal');
        })
        .catch(() => {
            req.flash('error_msg', 'User not found. Please try logging in again.');
            res.redirect('/category-1/examAssessmentExternal');
        })
});

router.delete('/examActivitiesSupervision/delete/:id', (req, res) => {
    ExamActivitiesSupervision.deleteOne({ _id: req.params.id })
        .then(() => {
            req.flash('success_msg', 'Data deleted successfully');
            res.redirect('/category-1/examActivitiesSupervision');
        })
        .catch(() => {
            req.flash('error_msg', 'User not found. Please try logging in again.');
            res.redirect('/category-1/examActivitiesSupervision');
        })
});

router.delete('/examActivitiesCollegeLevel/delete/:id', (req, res) => {
    ExamActivitiesCollegeLevel.deleteOne({ _id: req.params.id })
        .then(() => {
            req.flash('success_msg', 'Data deleted successfully');
            res.redirect('/category-1/examActivitiesCollegeLevel');
        })
        .catch(() => {
            req.flash('error_msg', 'User not found. Please try logging in again.');
            res.redirect('/category-1/examActivitiesCollegeLevel');
        })
});

router.delete('/ITmaintenance/delete/:id', (req, res) => {
    ITMaintenance.deleteOne({ _id: req.params.id })
        .then(() => {
            req.flash('success_msg', 'Data deleted successfully');
            res.redirect('/category-1/ITmaintenance');
        })
        .catch(() => {
            req.flash('error_msg', 'User not found. Please try logging in again.');
            res.redirect('/category-1/ITmaintenance');
        })
});

router.delete('/lakshya/delete/:id', (req, res) => {
    Lakshya.deleteOne({ _id: req.params.id })
        .then(() => {
            req.flash('success_msg', 'Data deleted successfully');
            res.redirect('/category-1/lakshya');
        })
        .catch(() => {
            req.flash('error_msg', 'User not found. Please try logging in again.');
            res.redirect('/category-1/lakshya');
        })
});

router.delete('/magazineNewsletter/delete/:id', (req, res) => {
    MagazineNewsletter.deleteOne({ _id: req.params.id })
        .then(() => {
            req.flash('success_msg', 'Data deleted successfully');
            res.redirect('/category-1/magazineNewsletter');
        })
        .catch(() => {
            req.flash('error_msg', 'User not found. Please try logging in again.');
            res.redirect('/category-1/magazineNewsletter');
        })
});

router.delete('/conductOfSTTP/delete/:id', (req, res) => {
    STTP.deleteOne({ _id: req.params.id })
        .then(() => {
            req.flash('success_msg', 'Data deleted successfully');
            res.redirect('/category-1/conductOfSTTP');
        })
        .catch(() => {
            req.flash('error_msg', 'User not found. Please try logging in again.');
            res.redirect('/category-1/conductOfSTTP');
        })
});

router.delete('/departmentUGProjects/delete/:id', (req, res) => {
    DepartmentUGProjects.deleteOne({ _id: req.params.id })
        .then(() => {
            req.flash('success_msg', 'Data deleted successfully');
            res.redirect('/category-1/departmentUGProjects');
        })
        .catch(() => {
            req.flash('error_msg', 'User not found. Please try logging in again.');
            res.redirect('/category-1/departmentUGProjects');
        })
});




module.exports = router;