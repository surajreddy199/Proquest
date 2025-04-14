const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const router = express.Router();
const pdfMake = require('pdfmake/build/pdfmake.js');
const pdfFonts = require('pdfmake/build/vfs_fonts.js');
const { calculateCategoryOneTotalScore } = require('../utils/categoryOne');
const { calculateCategoryThreeTotalScore } = require('../utils/categoryThree');
const { calculateCategoryTwoTotalScore } = require('../utils/categoryTwo');



const { groupJournalsByPublicationType } = require('../utils/grouping');
const { groupBooksChaptersByPublicationType } = require('../utils/grouping');
const { groupSponsoredProjectsByProjectType } = require('../utils/grouping');
const { groupCompletedProjectsByProjectType } = require('../utils/grouping');
const { groupProjectOutcomesByType } = require('../utils/grouping');
const { groupResearchGuidanceByType } = require('../utils/grouping');
const { groupTrainingCoursesByType } = require('../utils/grouping');
const { groupConferencePapersByType } = require('../utils/grouping');
const { groupInvitedLecturesByType } = require('../utils/grouping');





var fs = require('fs');
// var Chart = require('chart.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;
const { ensureAuthenticated } = require('../helpers/auth');

var modules = require('../config/modules');
const AcademicYear = require('../config/academicYear');
const ProfessionalDevelopment = require('../models/Category-2/ProfessionalDevelopment');

let facultID;
let facultyName;
let facultyEmail;
let year;

// Load faculty model
require('../models/Users/Faculty');
const Faculty = mongoose.model('users');

// Load faculty marks model
require('../models/Users/FacultyMarks');
const FacultyMarks = mongoose.model('faculty-marks');

// Load Hod marks
require('../models/Users/HodMarks');
const HodMarks = mongoose.model('hod-marks');

// Load HOD model
require('../models/Users/Hod');
const Hod = mongoose.model('hod');

// Load HOD confidential form model
require('../models/Users/Confidential');
const Confidential = mongoose.model('confidential_form');

// Load Manager model
require('../models/Users/ManagerDB');
const Manager = mongoose.model('management_user');

// faculty user login form
router.get('/faculty/login', (req, res) => {
    res.render('users/faculty/login');
});

router.get('/management/login', (req, res) => {
    res.render('users/management/login');
});

// hod user login form
router.get('/hod/login', (req, res) => {
    res.render('users/hod/login');
});

// Faculty Overview form





router.get('/faculty/facultyOverview', ensureAuthenticated, (req, res) => {
    let finalResult;

    // Find the faculty user
    Faculty.findOne({ _id: req.user.id })
        .then(result => {
            if (!result) {
                req.flash('error_msg', 'Not Authorized');
                return res.redirect('back');
            }

            // Find the academic year
            return AcademicYear.find({ user: req.user.id });
        })
        .then(result => {
            if (!result || result.length === 0) {
                req.flash('error_msg', 'Select the academic year before proceeding');
                return res.redirect('/');
            }

            const year = result[0].academic_year;

            // Find faculty marks
            return FacultyMarks.find({ $and: [{ user: req.user.id }, { academic_year: year }] })
                .then(result => {
                    finalResult = result;

                    // Use the utility function to calculate Category 1 total score
                    return calculateCategoryOneTotalScore(req.user.id, year);
                })
                .then(scores => {
                    // Use the utility function to calculate Category 2 total score
                    return calculateCategoryTwoTotalScore(req.user.id, year).then(categoryTwoScores => {
                        // Use the utility function to calculate Category 3 total score
                        return calculateCategoryThreeTotalScore(req.user.id, year).then(categoryThreeScores => {
                            res.render('users/faculty/facultyOverview', {
                                finalResult,
                                teachingContributionScore: scores.teachingContributionScore || 0,
                                lecturesExcessScore: scores.lecturesExcessScore || 0,
                                additionalResourcesScore: scores.additionalResourcesScore || 0,
                                innovativeTeachingScore: scores.innovativeTeachingScore || 0,
                                examinationDutiesScore: scores.examinationDutiesScore || 0,
                                categoryOneTotalScore: scores.categoryOneTotalScore || 0,

                                cocurricularActivitiesScore: categoryTwoScores.cocurricularActivitiesScore || 0,
                                corporateLifeScore: categoryTwoScores.corporateLifeScore || 0,
                                professionalDevelopmentScore: categoryTwoScores.professionalDevelopmentScore || 0,
                                categoryTwoTotalScore: categoryTwoScores.categoryTwoTotalScore || 0,

                                totalThreeOneScore: categoryThreeScores.totalThreeOneScore || 0,
                                totalThreeTwoScore: categoryThreeScores.totalThreeTwoScore || 0,
                                totalThreeThreeOneScore: categoryThreeScores.totalThreeThreeOneScore || 0,
                                totalThreeThreeTwoScore: categoryThreeScores.totalThreeThreeTwoScore || 0,
                                totalThreeThreeThreeScore: categoryThreeScores.totalThreeThreeThreeScore || 0,
                                totalThreeThreeFourScore: categoryThreeScores.totalThreeThreeFourScore || 0,
                                totalThreeFourScore: categoryThreeScores.totalThreeFourScore || 0,
                                totalThreeFiveOneScore: categoryThreeScores.totalThreeFiveOneScore || 0,
                                totalThreeFiveTwoScore: categoryThreeScores.totalThreeFiveTwoScore || 0,
                                totalThreeFiveThreeScore: categoryThreeScores.totalThreeFiveThreeScore || 0,
                                categoryThreeTotalScore: categoryThreeScores.categoryThreeTotalScore || 0,
                                year
                            });
                        });
                    });
                });
        })
        .catch(err => {
            console.error(err);
            req.flash('error_msg', 'Error fetching data. Please try again.');
            res.redirect('back');
        });
});




// Management user view
router.get('/management/viewUsers', ensureAuthenticated, (req, res) => {
    Manager.findOne({ _id: req.user.id })
        .then(result => {
            if (!result) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('back');
            } else {
                var hod = Hod.find({}).exec();
                var faculty = Faculty.find({}).exec();
                Promise.all([hod, faculty])
                    .then(result => {
                        return Promise.all(result);
                    })
                    .then(([hod, faculty]) => {
                        res.render('users/management/viewUsers', { hod, faculty });
                    })
                    .catch(err => {
                        req.flash('error_msg', 'Error while rendering the page.');
                        res.redirect('back');
                    })
            }
        })
        .catch(err => {
            req.flash('error_msg', 'Cannot find the user');
            res.redirect('back');
        })
})

// Delete user management route
// for hod
router.get('/management/deleteUser/hod/:name/:email/:id', ensureAuthenticated, (req, res) => {
    Manager.findOne({ _id: req.user.id })
        .then(result => {
            if (!result) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('back');
            } else {
                Hod.deleteOne({ _id: req.params.id })
                    .then(result => {
                        req.flash('success_msg', 'HoD with name ' + req.params.name + ' and email-id ' + req.params.email + ' Deleted');
                        res.redirect('/users/management/viewUsers');
                    })
                    .catch(err => {
                        req.flash('error_msg', 'Cannot delete the user due to some error');
                        res.redirect('back');
                    })
            }
        })
        .catch(err => {
            req.flash('error_msg', 'Cannot find the user');
            res.redirect('back');
        })
});
//for faculty
router.get('/management/deleteUser/faculty/:name/:email/:id', ensureAuthenticated, (req, res) => {
    Manager.findOne({ _id: req.user.id })
        .then(result => {
            if (!result) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('back');
            } else {
                Faculty.deleteOne({ _id: req.params.id })
                    .then(result => {
                        req.flash('success_msg', 'Faculty with name ' + req.params.name + ' and email-id ' + req.params.email + ' Deleted');
                        res.redirect('/users/management/viewUsers');
                    })
                    .catch(err => {
                        req.flash('error_msg', 'Cannot delete the user due to some error.');
                        res.redirect('back');
                    })
            }
        })
        .catch(err => {
            req.flash('error_msg', 'Cannot find the user.');
            res.redirect('back');
        })
});

// Management route
router.get('/management/home', ensureAuthenticated, (req, res) => {
    Manager.findOne({ _id: req.user.id })
        .then(result => {
            if (!result) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('back');
            } else {
                HodMarks.find({})
                    .sort({ date: 'desc' })
                    .then(result => {
                        if (!result) {
                            req.flash('error_msg', 'No submissions yet.');
                            res.redirect('/users/management/home');
                        } else {
                            res.render('users/management/home', { result });
                        }
                    })
                    .catch(err => {
                        req.flash('error_msg', 'Error while retreving marks.');
                        res.redirect('back');
                    })
            }
        })
        .catch(err => {
            req.flash('error_msg', 'Cannot find the user.');
            res.redirect('back');
        })
});

// Post search route for management user
router.post('/management/search', (req, res) => {
    var fltEmail = req.body.filterEmail;
    var academicYear = req.body.academic_year;
    var dept = req.body.department;
    if (fltEmail != '' && academicYear != '' && dept != '') {
        var filterParameter = { $and: [{ faculty_email: fltEmail }, { $and: [{ academic_year: academicYear }, { department: dept }] }] };
    } else if (fltEmail != '' && academicYear == '' && dept != '') {
        var filterParameter = { $and: [{ faculty_email: fltEmail }, { department: dept }] };
    } else if (fltEmail == '' && academicYear != '' && dept != '') {
        var filterParameter = { $and: [{ academic_year: academicYear }, { department: dept }] };
    } else if (fltEmail == '' && academicYear == '' && dept != '') {
        var filterParameter = { department: dept };
    } else if (fltEmail != '' && academicYear == '' && dept == '') {
        var filterParameter = { faculty_email: fltEmail };
    } else if (fltEmail != '' && academicYear != '' && dept == '') {
        var filterParameter = { $and: [{ faculty_email: fltEmail }, { academic_year: academicYear }] };
    } else {
        var filterParameter = {};
    }
    HodMarks.find(filterParameter)
        .sort({ date: 'desc' })
        .then(result => {
            if (!result) {
                req.flash('error_msg', 'No submissions yet.');
                res.redirect('/users/management/home');
            } else {
                var facultyName = [];
                var marks = [];
                var totalYear = [];
                result.forEach(function (arrayItem) {
                    facultyName.push(arrayItem.faculty_name);
                    marks.push(arrayItem.academicPerformance);
                    totalYear.push(arrayItem.academic_year);
                });
                let name = { facultyName };
                let finalMarks = { marks };
                let year = { totalYear };
                res.render('users/management/home', { result, fltEmail, academicYear, name, finalMarks, year, dept });
            }
        })
        .catch(err => {
            req.flash('error_msg', 'Error while filtering data.');
            res.redirect('back');
        })
});

// HoD Appraisal List route
router.get('/hod/appraisalList', ensureAuthenticated, (req, res) => {
    Hod.findOne({ $and: [{ _id: req.user.id }, { department: req.user.department }] })
        .then(result => {
            if (!result) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('back');
            } else {
                HodMarks.find({ department: req.user.department })
                    .sort({ date: 'desc' })
                    .then(result => {
                        if (!result) {
                            req.flash('error_msg', 'No submissions yet.');
                            res.redirect('/users/hod/home');
                        } else {
                            res.render('users/hod/appraisalList', { result });
                        }
                    })
                    .catch(err => {
                        req.flash('error_msg', 'Error while retreving data.');
                        res.redirect('back');
                    })
            }
        })
        .catch(err => {
            req.flash('error_msg', 'Cannot find the user.');
            res.redirect('back');
        })
});

// Post route for HoD search
router.post('/hod/search', (req, res) => {
    var fltEmail = req.body.filterEmail;
    var academicYear = req.body.academic_year;
    if (fltEmail != '' && academicYear != '') {
        var filterParameter = { $and: [{ faculty_email: fltEmail }, { academic_year: academicYear }] }
    } else if (fltEmail == '' && academicYear != '') {
        var filterParameter = { academic_year: academicYear }
    } else if (fltEmail != '' && academicYear == '') {
        var filterParameter = { faculty_email: fltEmail }
    } else {
        var filterParameter = {};
    }
    HodMarks.find(filterParameter)
        .sort({ date: 'desc' })
        .then(result => {
            if (!result) {
                req.flash('error_msg', 'No submissions yet.');
                res.redirect('/users/hod/home');
            } else {
                res.render('users/hod/appraisalList', { result, fltEmail, academicYear });
            }
        })
        .catch(err => {
            req.flash('error_msg', 'Cannot filter data due to some error.');
            res.redirect('back');
        })
});

// Hod year check
router.get('/hod/check/year/:id', ensureAuthenticated, (req, res) => {
    let facultyDetails;
    Hod.findOne({ $and: [{ _id: req.user.id }, { department: req.user.department }] })
        .then(result => {
            if (!result) {
                req.flash('error-msg', 'Not Authorized');
                res.redirect('back');
            } else {
                var dept = result.department;
                Faculty.find({ $and: [{ _id: req.params.id }, { department: dept }] })
                    .then(result => {
                        if (!result) {
                            req.flash('error_msg', 'Not Authorized');
                            return res.redirect('back');
                        } else {
                            facultyName = result[0].name;
                            facultyEmail = result[0].email;
                            FacultyMarks.find({ user: req.params.id })
                                .sort({ date: 'desc' })
                                .then(result => {
                                    facultID = result[0].user;
                                    res.render('users/hod/checkYear', { result, facultID, facultyName, facultyEmail });
                                })
                                .catch(err => {
                                    req.flash('error_msg', 'No submissions yet.');
                                    res.redirect('/users/hod/home');
                                })
                        }
                    })
                    .catch(err => {
                        if (err) {
                            req.flash('error_msg', 'Not Authorized');
                            res.redirect('back');
                        }
                    })
            }
        })
});

// hod overview form
router.get('/hod/hodOverview/:id/:year', ensureAuthenticated, (req, res) => {
    let finalResult;
    Hod.findOne({ $and: [{ _id: req.user.id }, { department: req.user.department }] })
        .then(result => {
            if (!result) {
                req.flash('error-msg', 'Not Authorized');
                res.redirect('back');
            } else {
                var dept = result.department;
                Faculty.find({ $and: [{ _id: req.params.id }, { department: dept }] })
                    .then(result => {
                        facultyName = result[0].name;
                        if (!result) {
                            req.flash('error_msg', 'Not Authorized');
                            res.redirect('back');
                        } else {
                            FacultyMarks.find({ $and: [{ user: req.params.id }, { academic_year: req.params.year }] })
                                .then(marks => {
                                    finalResult = marks;
                                    facultID = marks[0].user;
                                    year = req.params.year;
                                    //console.log(facultID);
                                    //console.log(finalResult);
                                    var loads = [
                                    


                                    modules.TeachingContribution.findOne({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec(),
                                    modules.LecturesExcess.findOne({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec(),
                                    modules.AdditionalResources.findOne({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec(),
                                    modules.InnovativeTeaching.findOne({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec(),
                                    modules.ExaminationDuties.findOne({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec(),


                                    modules.CocurricularActivities.findOne({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec(),
                                    modules.CorporateLife.findOne({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec(),
                                    modules.ProfessionalDevelopment.findOne({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec(),


                                   
                                    

                                    modules.ResearchPapersPublished.find({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec(),
                                    modules.BooksChaptersPublished.find({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec(),
                                    modules.SponsoredProjects.find({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec(),
                                    modules.ConsultancyProjects.findOne({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec(),
                                    modules.CompletedProjects.find({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec(),
                                    modules.ProjectOutcomes.find({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec(),
                                    modules.ResearchGuidance.find({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec(),
                                    modules.TrainingCourses.find({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec(),
                                    modules.ConferencePapersEntry.find({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec(),
                                    modules.InvitedLectures.find({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec(),
                                    


                                    

                                    HodMarks.findOne({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec()
                                    ];
                                    Promise.all(loads)
                                        .then(result => {
                                            return Promise.all(result);
                                        })
                                        .then(([
                                            
                                            teachingContribution, lecturesExcess, additionalResources, innovativeTeaching, examinationDuties,
                                            cocurricularActivities, corporateLife, professionalDevelopment, papersPublishedNationalConf, papersPublishedInternationalConf, papersPublishedJournals, moocs, swayam, shortTermTraining, seminars,
                                            researchPapersPublished, booksChaptersPublished, sponsoredProjects, consultancyProjects, completedProjects, projectOutcomes, researchGuidance, trainingCourses, conferencePapersEntry, invitedLectures, contributionToSyllabus, memberOfUniversityCommitte, consultancyAssignment, externalProjectsOrCompetition,
                                            hodMarks,
                                        ]) => {

                                            res.render('users/hod/hodOverview', { finalResult, teachingContribution, lecturesExcess, additionalResources, innovativeTeaching, examinationDuties, cocurricularActivities, corporateLife, professionalDevelopment, papersPublishedNationalConf, papersPublishedInternationalConf, papersPublishedJournals, moocs, swayam, shortTermTraining, seminars, researchPapersPublished, booksChaptersPublished, sponsoredProjects, consultancyProjects, completedProjects, projectOutcomes, researchGuidance, trainingCourses, conferencePapersEntry, invitedLectures, contributionToSyllabus, memberOfUniversityCommitte, consultancyAssignment, externalProjectsOrCompetition, hodMarks, year });
                                        })
                                })
                                .catch(err => {
                                    req.flash('error_msg', 'No submissions yet.');
                                    res.redirect('/users/hod/home');
                                })
                        }
                    })
                    .catch(err => {
                        if (err) {
                            req.flash('error_msg', 'Not Authorized');
                            res.redirect('back');
                        }
                    })
            }
        })
});

router.post('/faculty/login',
    passport.authenticate('faculty', { successRedirect: '/', failureRedirect: '/users/faculty/login', failureFlash: true }));

router.post('/hod/login',
    passport.authenticate('hod', { successRedirect: '/users/hod/home', failureRedirect: '/users/hod/login', failureFlash: true }));

router.post('/management/login',
    passport.authenticate('management_user', { successRedirect: '/users/management/home', failureRedirect: '/users/management/login', failureFlash: true }));

// Faculty final overview submission with marks
router.post('/faculty/facultyOverview/:year', async (req, res) => {
    let errors = [];

    try {
        const year = req.params.year;
        const scores = await calculateCategoryOneTotalScore(req.user.id, year);
        const categoryTwoScores = await calculateCategoryTwoTotalScore(req.user.id, year);
        const categoryThreeScores = await calculateCategoryThreeTotalScore(req.user.id, year);


        if (scores.categoryOneTotalScore < 75) {
            errors.push({
                text: `Category 1 total score must be at least 75. Current score: ${scores.categoryOneTotalScore}`
            });
        }
        if (categoryTwoScores.categoryTwoTotalScore < 15) {
            errors.push({
                text: `Category 2 total score must be at least 15. Current score: ${categoryTwoScores.categoryTwoTotalScore}`
            });
        }

        if (errors.length > 0) {
            res.render('users/faculty/facultyOverview', {
                errors,
                ...scores,
                ...categoryTwoScores,
                ...categoryThreeScores
            });
        } else {
            const marks = {
                academic_year: year,
                category_1: scores.categoryOneTotalScore,
                category_2: categoryTwoScores.categoryTwoTotalScore,
                category_3: categoryThreeScores.categoryThreeTotalScore,
                user: req.user.id
            };

            await new FacultyMarks(marks).save();
            req.flash('success_msg', 'Successfully added marks for evaluation');
            res.redirect('/users/faculty/facultyOverview');
        }
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Error calculating scores. Please try again.');
        res.redirect('back');
    }
});

// PDF route POST for faculty
router.post('/faculty/pdf', ensureAuthenticated, (req, res) => {
    let year;

    Faculty.findOne({ _id: req.user.id })
        .then(result => {
            if (!result) {
                req.flash('error_msg', 'Faculty not found');
                return res.redirect('back');
            }

            facultyName = result.name;
            facultyEmail = result.email;

            // Fetch the academic year
            return AcademicYear.findOne({ user: req.user.id });
        })
        .then(result => {
            if (!result) {
                req.flash('error_msg', 'Academic year not found. Please set it before proceeding.');
                return res.redirect('back');
            }

            year = result.academic_year; // Assign the academic year

            var loads = [
           


            modules.TeachingContribution.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
            modules.LecturesExcess.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
            modules.AdditionalResources.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
            modules.InnovativeTeaching.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
            modules.ExaminationDuties.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),



            modules.CocurricularActivities.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
            modules.CorporateLife.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
            modules.ProfessionalDevelopment.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),  

          
            

            modules.ResearchPapersPublished.find({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
            modules.BooksChaptersPublished.find({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
            modules.SponsoredProjects.find({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
            modules.ConsultancyProjects.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
            modules.CompletedProjects.find({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
            modules.ProjectOutcomes.find({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
            modules.ResearchGuidance.find({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
            modules.TrainingCourses.find({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
            modules.ConferencePapersEntry.find({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
            modules.InvitedLectures.find({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec()

            ];

            Promise.all(loads)
                .then(result => {
                    console.log('Year:', year);
                    console.log('User ID:', req.user.id);
                    return Promise.all(result);
                })
                .then(([
                
                    teachingContribution, lecturesExcess, additionalResources, innovativeTeaching, examinationDuties,
                    cocurricularActivities, corporateLife, professionalDevelopment, papersPublishedNationalConf, papersPublishedInternationalConf, papersPublishedJournals, moocs, swayam, shortTermTraining, seminars,
                    researchPapersPublished, booksChaptersPublished, sponsoredProjects, consultancyProjects,completedProjects, projectOutcomes, researchGuidance, trainingCourses, conferencePapersEntry, invitedLectures, contributionToSyllabus, memberOfUniversityCommitte, consultancyAssignment, externalProjectsOrCompetition]) => {
                       
                    
                    if (!teachingContribution) { teachingContribution = { entries: teachingContribution?.entries?.length ? teachingContribution.entries : [{ subject_name: '-', lectures_delivered: '-', lectures_allocated: '-', tutorials_delivered: '-', tutorials_allocated: '-', practical_sessions_delivered: '-', practical_sessions_allocated: '-' }], scoredOne: '-' } }
                    if (!lecturesExcess) { lecturesExcess = { entries: lecturesExcess?.entries?.length ? lecturesExcess.entries : [{ subject_name: '-', lectures_taken: '-', tutorials_taken: '-', practical_sessions_taken: '-' }], scoredTwo: '-' } }
                    if (!additionalResources) { additionalResources = { materials: '-', scoreThree: '-' } }
                    if (!innovativeTeaching) { innovativeTeaching = { techniques: '-', scoreFour: '-' } }
                    if (!examinationDuties) { examinationDuties = { invigilation: '-', questionPaperSetting: '_', evaluationAnswerScripts: '_', paperModeration: '_', labEvaluation: '_', scoreFive: '-' } }
                    if (!cocurricularActivities) { cocurricularActivities = { ncc: '-', nss: '-', otherActivities: '-', otherActivitiesDetails: '-', none: '-', scoreSix: '-' } }
                    if (!corporateLife) { corporateLife = { industryInteractions: '-', academicCommittees: '-', otherContributions: '-', otherContributionsDetails: '-', scoreSeven: '-' } }
                    if (!professionalDevelopment) { professionalDevelopment = { seminars: '-', professionalBody: '-', professionalBodyDetails: '-', document: '-', scoreEight: '-' } }


                 
                    if (!papersPublishedNationalConf) { papersPublishedNationalConf = { title_of_paper_published: '-', published_date: '-', name_of_conference: '-', isbn_issn_number: '-', name_of_coauthor: '-', impact_factor: '-', no_of_citations: '-', rating: '-', link: '-' } }
                    if (!papersPublishedInternationalConf) { papersPublishedInternationalConf = { title_of_paper_published: '-', published_date: '-', name_of_conference: '-', isbn_issn_number: '-', name_of_coauthor: '-', impact_factor: '-', no_of_citations: '-', rating: '-', link: '-' } }
                    if (!papersPublishedJournals) { papersPublishedJournals = { title_of_paper_published: '-', published_date: '-', name_of_conference: '-', isbn_issn_number: '-', name_of_coauthor: '-', impact_factor: '-', no_of_citations: '-', rating: '-', link: '-' } }
                    if (!moocs) { moocs = { name_of_moocs_undertaken: '-', moocs_date: '-', moocs_duartion: '-', certification_status: '-' } }
                    if (!swayam) { swayam = { name_of_swayam_undertaken: '-', swayam_date: '-', swayam_duartion: '-', certification_status: '-' } }
                    if (!shortTermTraining) { shortTermTraining = { short_term_training: '-', techonology: '-', duration_of_course: '-', start_date: '-', end_date: '-', internal_external: '-', name_of_institue: '-' } }
                    if (!seminars) { seminars = { name_of_seminar: '-', techonology: '-', duration_of_course: '-', start_date: '-', end_date: '-', internal_external: '-', name_of_institue: '-' } }
                    if (!researchPapersPublished) {researchPapersPublished = { publication_type: '-', journals: researchPapersPublished?.journals?.length ? researchPapersPublished.journals : [{ journal_title: '-', publication_link: '-', journal_document: '-', score: '-' }], total_score: '-' } }
                    if (!booksChaptersPublished) { booksChaptersPublished = { publication_type: '-', entries: booksChaptersPublished?.entries?.length ? booksChaptersPublished.entries : [{ title: '-', publication_link: '-', document: '-', score: '-' }], booksChaptersTotalScore: '-' } }
                    if (!sponsoredProjects) { sponsoredProjects = { project_type: '-', entries: sponsoredProjects?.entries?.length ? sponsoredProjects.entries : [{ title: '-', funding_agency: '-', amount: '-', document: '-', score: '-' }], sponsoredProjectsTotalScore: '-' } }
                    if (!consultancyProjects) { consultancyProjects = { entries: consultancyProjects?.entries?.length ? consultancyProjects.entries : [{ title: '-', funding_agency: '-', amount: '-', document: '-', score: '-' }], consultancyTotalScore: '-' } }
                    if (!completedProjects) { completedProjects = { project_type: '-', entries: completedProjects?.entries?.length ? completedProjects.entries : [{ title: '-', quality_evaluation: '-', report_accepted: '-', document: '-', score: '-' }], completedProjectsTotalScore: '-' } }
                    if (!projectOutcomes) { projectOutcomes = { outcome_level: '-', entries: projectOutcomes?.entries?.length ? projectOutcomes.entries : [{ title: '-', type: '-', description: '-', document: '-', score: '-' }], projectOutcomesTotalScore: '-' }; }
                    if (!researchGuidance) { researchGuidance = { guidance_type: '-', entries: researchGuidance?.entries?.length ? researchGuidance.entries : [{ candidate_name: '-', status: '-', description: '-', document: '-', score: '-' }], researchGuidanceTotalScore: '-' } }
                    if (!trainingCourses) trainingCourses = { duration_type: '-', academic_year: '-', entries: trainingCourses?.entries?.length ? trainingCourses.entries : [{ programme_title: '-', organizing_institution: '-', duration: '-', course_type: '-', document: '-', score: '-' }], trainingCoursesTotalScore: '-' };
                    if (!conferencePapersEntry) conferencePapersEntry = { event_type: '-', entries: conferencePapersEntry?.entries?.length ? conferencePapersEntry.entries : [{ title: '-', event_name: '-', date: '-', presentation_type: '-', document: '-', score: '-' }], conferencePapersTotalScore: '-' };
                    if (!invitedLectures) { invitedLectures = { lecture_type: '-', entries: invitedLectures?.entries?.length ? invitedLectures.entries : [{ title: '-', event: '-', date: '-', document: '-', score: '-' }], invitedLecturesTotalScore: '-' }; }

                    if (!contributionToSyllabus) { contributionToSyllabus = { nameofSub: '-', role: '-', nameofUniversity: '-', otherDetails: '-' } }
                    if (!memberOfUniversityCommitte) { memberOfUniversityCommitte = { nameofCommittee: '-', rolesAndResponsibility: '-', designation: '-' } }
                    if (!consultancyAssignment) { consultancyAssignment = { rolesAndResponsilbilty: '-', typeOfWorkorDomain: '-', organization: '-', duration: '-', numberofVisits: '-' } }
                    if (!externalProjectsOrCompetition) { externalProjectsOrCompetition = { description: '-', contribution: '-', university: '-', duration: '-', comments: '-' } }


                    // Combine and group journals
                    const groupedJournals = groupJournalsByPublicationType(researchPapersPublished);
                    const groupedBooksChapters = groupBooksChaptersByPublicationType(booksChaptersPublished);
                    const groupedSponsoredProjects = groupSponsoredProjectsByProjectType(sponsoredProjects);
                    const groupedCompletedProjects = groupCompletedProjectsByProjectType(completedProjects);
                    const groupedProjectOutcomes = groupProjectOutcomesByType(projectOutcomes);
                    const groupedResearchGuidance = groupResearchGuidanceByType(researchGuidance);
                    const groupedTrainingCourses = groupTrainingCoursesByType(trainingCourses);
                    const groupedConferencePapers = groupConferencePapersByType(conferencePapersEntry);
                    const groupedInvitedLectures = groupInvitedLecturesByType(invitedLectures);



                    
                

                    //generate pdf
                    const  document = {
                        content: [
                            { text: 'Self Appraisal Report', style: 'header' },
                            { text: 'Academic Year: ' + year, style: 'header' },

                            'Name: ' + facultyName + '\n',
                            'Email ID: ' + facultyEmail + '\n',



                            { text: 'Category-1', style: 'subheader' },

                            { text: '1.1 Teaching Contribution', style: 'subheader' },
                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Subject Name', 'Lectures Delivered', 'Lectures Allocated', 'Tutorials Delivered', 'Tutorials Allocated', 'Practical Sessions Delivered', 'Practical Sessions Allocated'], // Table header
                                        ...teachingContribution.entries.map(entry => [
                                            entry.subject_name || '-', // Default to '-' if undefined
                                            entry.lectures_delivered || '-', // Default to '-' if undefined
                                            entry.lectures_allocated || '-', // Default to '-' if undefined
                                            entry.tutorials_delivered || '-', // Default to '-' if undefined
                                            entry.tutorials_allocated || '-', // Default to '-' if undefined
                                            entry.practical_sessions_delivered || '-', // Default to '-' if undefined
                                            entry.practical_sessions_allocated || '-' // Default to '-' if undefined
                                        ]),
                                        // Add a row for the total score
                                        [{ text: 'Total Score:', colSpan: 6, bold: true, alignment: 'right' }, {}, {}, {}, {}, {}, teachingContribution.scoredOne || '0']
                                    ]
                                }
                            },

                            

                            { text: '1.2 Lectures Excess', style: 'subheader' },
                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Subject Name', 'Lectures Taken', 'Tutorials Taken', 'Practical Sessions Taken'], // Table header
                                        ...lecturesExcess.entries.map(entry => [
                                            entry.subject_name || '-', // Default to '-' if undefined
                                            entry.lectures_taken || '-', // Default to '-' if undefined
                                            entry.tutorials_taken || '-', // Default to '-' if undefined
                                            entry.practical_sessions_taken || '-' // Default to '-' if undefined
                                        ]),
                                        // Add a row for the total score
                                        [{ text: 'Total Score:', colSpan: 3, bold: true, alignment: 'right' }, {}, {}, lecturesExcess.scoredTwo || '0']
                                    ]
                                }
                            },

                            { text: '1.3 Additional Resources ', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Materials', 'Score' ],
                                        [additionalResources.materials, additionalResources.scoreThree]
                                    ]
                                }
                            },

                            { text: '1.4 Innovative Teaching ', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Techniques', 'Score' ],
                                        [innovativeTeaching.techniques, innovativeTeaching.scoreFour]
                                    ]
                                }
                            },

                            { text: '1.5 Examination Duties ', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Invigilation', 'Question Paper Setting', 'Evaluation Answer Scripts', 'Paper Moderation', 'Lab Evaluation', 'Score ' ],
                                        [examinationDuties.invigilation, examinationDuties.questionPaperSetting,examinationDuties.evaluationAnswerScripts,examinationDuties.paperModeration,examinationDuties.labEvaluation, examinationDuties.scoreFive]
                                    ]
                                }
                            },

                            

                            

                            

                            { text: 'Category-2', style: 'subheader' },
                            { text: '2.1 Co-Curricular and Extra Activities', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['NCC', 'NSS', 'Other Activities', 'Other Activities Details', 'None', 'Score'],
                                        [cocurricularActivities.ncc, cocurricularActivities.nss, cocurricularActivities.otherActivities, cocurricularActivities.otherActivitiesDetails, cocurricularActivities.none, cocurricularActivities.scoreSix]
                                    ]
                                }
                            },
                            { text: '2.2 Contribution to Corporate Life and Management', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Industry Interactions', 'Academic Committees', 'Other Contributions', 'Other Contributions Details', 'Score'],
                                        [corporateLife.industryInteractions, corporateLife.academicCommittees, corporateLife.otherContributions, corporateLife.otherContributionsDetails, corporateLife.scoreSeven]
                                    ]
                                }
                            },
                            { text: '2.3 Professional Development Activities', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Seminars', 'Membership in Professional Body', 'Professional Body Details', 'Document', 'Score'],
                                        [
                                            professionalDevelopment.seminars || '-',
                                            professionalDevelopment.professionalBody || '-',
                                            professionalDevelopment.professionalBodyDetails || '-',
                                            { text: 'View Document', link: `http://localhost:5000/${professionalDevelopment.document}`, color: 'blue', target: '_blank' },
                                            professionalDevelopment.scoreEight || '-'
                                        ]
                                    ]
                                }
                            },


















                            
                            { text: 'Category-3', style: 'subheader' },
                            
                            { text: ' 3.1 Research Papers Published', style: 'subheader' },
                            ...Object.keys(groupedJournals).map(publicationType => {
                                // Calculate the total score for the current publication type
                                const totalScore = groupedJournals[publicationType].reduce((sum, journal) => sum + (Number(journal.score) || 0), 0);
                            
                                return [
                                    { text: `Publication Type: ${publicationType}`, style: 'subheader' },
                                    {
                                        style: 'tableExample',
                                        table: {
                                            body: [
                                                ['Journal Description', 'Publication Link', 'Journal Document', 'Score'], // Table header
                                                ...groupedJournals[publicationType].map(journal => [
                                                    journal.journal_title || '-', // Default to '-' if undefined
                                                    { text: 'View', link: journal.publication_link || '#', color: 'blue' }, // Clickable link
                                                    { text: 'Download', link: `http://localhost:5000/${journal.journal_document}`, color: 'blue', target: '_blank' }, // Clickable file
                                                    journal.score || '-' // Default to '-' if undefined
                                                ]),
                                                // Add a row for the total score
                                                [{ text: 'Total Score:', colSpan: 3, bold: true, alignment: 'right' }, {}, {}, totalScore]
                                            ]
                                        }
                                    }
                                ];
                            }),

                            { text: ' 3.2 Books/Chapters Published', style: 'subheader' },
                            ...Object.keys(groupedBooksChapters).map(publicationType => {
                                // Calculate the total score for the current publication type
                                const totalScore = groupedBooksChapters[publicationType].reduce((sum, entry) => sum + (Number(entry.score) || 0), 0);
                            
                                return [
                                    { text: `Publication Type: ${publicationType}`, style: 'subheader' },
                                    {
                                        style: 'tableExample',
                                        table: {
                                            body: [
                                                ['Title', 'Publication Link', 'Document', 'Score'], // Table header
                                                ...groupedBooksChapters[publicationType].map(entry => [
                                                    entry.title || '-', // Default to '-' if undefined
                                                    { text: 'View', link: entry.publication_link || '#', color: 'blue' }, // Clickable link
                                                    { text: 'Download', link: `http://localhost:5000/${entry.document}`, color: 'blue', target: '_blank' }, // Clickable file
                                                    entry.score || '-' // Default to '-' if undefined
                                                ]),
                                                // Add a row for the total score
                                                [{ text: 'Total Score:', colSpan: 3, bold: true, alignment: 'right' }, {}, {}, totalScore]
                                            ]
                                        }
                                    }
                                ];
                            }),

                            { text: ' 3.3 Research Projects', style: 'subheader' },
                            { text: ' 3.3.1 Sponsored Projects Carried Out/Ongoing', style: 'subheader' },
                            ...Object.keys(groupedSponsoredProjects).map(projectType => {
                                // Calculate the total score for the current project type
                                const totalScore = groupedSponsoredProjects[projectType].reduce((sum, entry) => sum + (Number(entry.score) || 0), 0);
                            
                                return [
                                    { text: `Project Type: ${projectType}`, style: 'subheader' },
                                    {
                                        style: 'tableExample',
                                        table: {
                                            body: [
                                                ['Title', 'Funding Agency', 'Amount Mobilized', 'Document', 'Score'], // Table header
                                                ...groupedSponsoredProjects[projectType].map(entry => [
                                                    entry.title || '-', // Default to '-' if undefined
                                                    entry.funding_agency || '-', // Default to '-' if undefined
                                                    entry.amount || '-', // Default to '-' if undefined
                                                    { text: 'Download', link: `http://localhost:5000/${entry.document}`, color: 'blue', target: '_blank' }, // Clickable file
                                                    entry.score || '-' // Default to '-' if undefined
                                                ]),
                                                // Add a row for the total score
                                                [{ text: 'Total Score:', colSpan: 4, bold: true, alignment: 'right' }, {}, {}, {}, totalScore]
                                            ]
                                        }
                                    }
                                ];
                            }),

                            { text: '3.3.2 Consultancy Projects Carried Out/Ongoing', style: 'subheader' },
                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Title', 'Funding Agency', 'Amount Mobilized', 'Document', 'Score'], // Table header
                                        ...consultancyProjects.entries.map(entry => [
                                            entry.title || '-', // Default to '-' if undefined
                                            entry.funding_agency || '-', // Default to '-' if undefined
                                            entry.amount || '-', // Default to '-' if undefined
                                            { text: 'Download', link: `http://localhost:5000/${entry.document}`, color: 'blue', target: '_blank' }, // Clickable file
                                            entry.score || '-' // Default to '-' if undefined
                                        ]),
                                        // Add a row for the total score
                                        [{ text: 'Total Score:', colSpan: 4, bold: true, alignment: 'right' }, {}, {}, {}, consultancyProjects.consultancyTotalScore || '-']
                                    ]
                                }
                            },

                            { text: '3.3.3 Completed Projects', style: 'subheader' },
                            ...Object.keys(groupedCompletedProjects).map(projectType => {
                                // Calculate the total score for the current project type
                                const totalScore = groupedCompletedProjects[projectType].reduce((sum, entry) => sum + (Number(entry.score) || 0), 0);
                            
                                return [
                                    { text: `Project Type: ${projectType}`, style: 'subheader' },
                                    {
                                        style: 'tableExample',
                                        table: {
                                            body: [
                                                ['Title', 'Quality Evaluation', 'Report Accepted', 'Document', 'Score'], // Table header
                                                ...groupedCompletedProjects[projectType].map(entry => [
                                                    entry.title || '-', // Default to '-' if undefined
                                                    (entry.quality_evaluation || '-').toUpperCase(), // Normalize "Yes" or "No" to uppercase
                                                    (entry.report_accepted || '-').toUpperCase(), // Normalize "Yes" or "No" to uppercase
                                                    entry.document
                                                        ? { text: 'Download', link: `http://localhost:5000/${entry.document}`, color: 'blue', target: '_blank' }
                                                        : '-', // Handle missing document gracefully
                                                    entry.score || '-' // Default to '-' if undefined
                                                ]),
                                                // Add a row for the total score
                                                [{ text: 'Total Score:', colSpan: 4, bold: true, alignment: 'right' }, {}, {}, {}, totalScore]
                                            ]
                                        }
                                    }
                                ];
                            }),

                            { text: '3.3.4 Projects Outcome/Outputs', style: 'subheader' },
                            ...Object.keys(groupedProjectOutcomes).map(outcomeType => {
                                // Calculate the total score for the current outcome type
                                const totalScore = groupedProjectOutcomes[outcomeType].reduce((sum, entry) => sum + (Number(entry.score) || 0), 0);
                            
                                return [
                                    { text: `Outcome Type: ${outcomeType}`, style: 'subheader' },
                                    {
                                        style: 'tableExample',
                                        table: {
                                            body: [
                                                ['Title', 'Type', 'Description', 'Document', 'Score'], // Table header
                                                ...groupedProjectOutcomes[outcomeType].map(entry => [
                                                    entry.title || '-', // Default to '-' if undefined
                                                    entry.type || '-', // Default to '-' if undefined
                                                    entry.description || '-', // Default to '-' if undefined
                                                    { text: 'Download', link: `http://localhost:5000/${entry.document}`, color: 'blue', target: '_blank' }, // Clickable file
                                                    entry.score || '-' // Default to '-' if undefined
                                                ]),
                                                // Add a row for the total score
                                                [{ text: 'Total Score:', colSpan: 4, bold: true, alignment: 'right' }, {}, {}, {}, totalScore]
                                            ]
                                        }
                                    }
                                ];
                            }),
                            { text: '3.4 Research Guidance', style: 'subheader' },
                            ...Object.keys(groupedResearchGuidance).map(guidanceType => {
                                // Calculate the total score for the current guidance type
                                const totalScore = groupedResearchGuidance[guidanceType].reduce((sum, entry) => sum + (Number(entry.score) || 0), 0);
                            
                                return [
                                    { text: `Guidance Type: ${guidanceType}`, style: 'subheader' },
                                    {
                                        style: 'tableExample',
                                        table: {
                                            body: [
                                                ['Candidate Name', 'Status', 'Description', 'Document', 'Score'], // Table header
                                                ...groupedResearchGuidance[guidanceType].map(entry => [
                                                    entry.candidate_name || '-', // Default to '-' if undefined
                                                    entry.status || '-', // Default to '-' if undefined
                                                    entry.description || '-', // Default to '-' if undefined
                                                    { text: 'Download', link: `http://localhost:5000/${entry.document}`, color: 'blue', target: '_blank' }, // Clickable file
                                                    entry.score || '-' // Default to '-' if undefined
                                                ]),
                                                // Add a row for the total score
                                                [{ text: 'Total Score:', colSpan: 4, bold: true, alignment: 'right' }, {}, {}, {}, totalScore]
                                            ]
                                        }
                                    }
                                ];
                            }),
                            { text: '3.5.1 Training Courses', style: 'subheader' },
                            ...Object.keys(groupedTrainingCourses).map(durationType => {
                                // Calculate the total score for the current duration type
                                const totalScore = groupedTrainingCourses[durationType].reduce((sum, entry) => sum + (Number(entry.score) || 0), 0);
                            
                                return [
                                    { text: `Duration Type: ${durationType}`, style: 'subheader' },
                                    {
                                        style: 'tableExample',
                                        table: {
                                            body: [
                                                ['Programme Title', 'Organizing Institution', 'Duration', 'Course Type', 'Document', 'Score'], // Table header
                                                ...groupedTrainingCourses[durationType].map(entry => [
                                                    entry.programme_title || '-', // Default to '-' if undefined
                                                    entry.organizing_institution || '-', // Default to '-' if undefined
                                                    entry.duration || '-', // Default to '-' if undefined
                                                    entry.course_type || '-', // Default to '-' if undefined
                                                    { text: 'Download', link: `http://localhost:5000/${entry.document}`, color: 'blue', target: '_blank' }, // Clickable file
                                                    entry.score || '-' // Default to '-' if undefined
                                                ]),
                                                // Add a row for the total score
                                                [{ text: 'Total Score:', colSpan: 5, bold: true, alignment: 'right' }, {}, {}, {}, {}, totalScore]
                                            ]
                                        }
                                    }
                                ];
                            }),
                            { text: '3.5.2 Conference Papers Entry', style: 'subheader' },
                            ...Object.keys(groupedConferencePapers).map(eventType => {
                                // Calculate the total score for the current event type
                                const totalScore = groupedConferencePapers[eventType].reduce((sum, entry) => sum + (Number(entry.score) || 0), 0);
                            
                                return [
                                    { text: `Event Type: ${eventType}`, style: 'subheader' },
                                    {
                                        style: 'tableExample',
                                        table: {
                                            body: [
                                                ['Title', 'Event Name', 'Date', 'Presentation Type', 'Document', 'Score'], // Table header
                                                ...groupedConferencePapers[eventType].map(entry => [
                                                    entry.title || '-', // Default to '-' if undefined
                                                    entry.event_name || '-', // Default to '-' if undefined
                                                    entry.date || '-', // Default to '-' if undefined
                                                    entry.presentation_type || '-', // Default to '-' if undefined
                                                    { text: 'Download', link: `http://localhost:5000/${entry.document}`, color: 'blue', target: '_blank' }, // Clickable file
                                                    entry.score || '-' // Default to '-' if undefined
                                                ]),
                                                // Add a row for the total score
                                                [{ text: 'Total Score:', colSpan: 5, bold: true, alignment: 'right' }, {}, {}, {}, {}, totalScore]
                                            ]
                                        }
                                    }
                                ];
                            }),
                            { text: '3.5.3 Invited Lectures or Presentations for Conferences/Symposia', style: 'subheader' },
                            ...Object.keys(groupedInvitedLectures).map(lectureType => {
                                // Calculate the total score for the current lecture type
                                const totalScore = groupedInvitedLectures[lectureType].reduce((sum, entry) => sum + (Number(entry.score) || 0), 0);
                            
                                return [
                                    { text: `Lecture Type: ${lectureType}`, style: 'subheader' },
                                    {
                                        style: 'tableExample',
                                        table: {
                                            body: [
                                                ['Title', 'Event', 'Date', 'Document', 'Score'], // Table header
                                                ...groupedInvitedLectures[lectureType].map(entry => [
                                                    entry.title || '-', // Default to '-' if undefined
                                                    entry.event || '-', // Default to '-' if undefined
                                                    entry.date || '-', // Default to '-' if undefined
                                                    { text: 'Download', link: `http://localhost:5000/${entry.document}`, color: 'blue', target: '_blank' }, // Clickable file
                                                    entry.score || '-' // Default to '-' if undefined
                                                ]),
                                                // Add a row for the total score
                                                [{ text: 'Total Score:', colSpan: 4, bold: true, alignment: 'right' }, {}, {}, {}, totalScore]
                                            ]
                                        }
                                    }
                                ];
                            }),



                            
                            
                            

                            

                            

                        ],
                        styles: {
                            header: {
                                fontSize: 18,
                                bold: true,
                                margin: [0, 0, 0, 10]
                            },
                            subheader: {
                                fontSize: 16,
                                bold: true,
                                margin: [0, 10, 0, 5]
                            },
                            tableExample: {
                                margin: [0, 5, 0, 15]
                            },
                            tableHeader: {
                                bold: true,
                                fontSize: 13,
                                color: 'black'
                            }
                        },
                        defaultStyle: {
                            // alignment: 'justify'
                        }

                    };

                    const pdfDoc = pdfMake.createPdf(document);
                    pdfDoc.getBase64(data => {
                        res.writeHead(200, {
                            'Content-Type': 'application/pdf',
                            'Content-Disposition': `attachment;filename=${facultyName}.pdf`
                        });
                        // console.log('PDF Content:', JSON.stringify(document.content, null, 2));
                        const download = Buffer.from(data.toString('utf-8'), 'base64');
                        res.end(download);
                    });
                })
                .catch(err => {
                    console.error('Error fetching data:', err);
                    req.flash('error_msg', 'Error generating PDF. Please try again.');
                    res.redirect('back');
                });
        });
});

// PDF route POST for HOD
router.post('/hod/pdf/:id', ensureAuthenticated, (req, res) => {
    const year = req.body.academic_year; // Get the academic year from the request body
    

    Faculty.findOne({ _id: req.params.id })
        .then(result => {
            if (!result) {
                req.flash('error_msg', 'Faculty not found');
                return res.redirect('back');
            }

            facultyName = result.name;
            facultyEmail = result.email;

        

            var loads = [
            


            modules.TeachingContribution.findOne({ $and: [{ user: req.params.id }, { academic_year: year }] }).exec(),
            modules.LecturesExcess.findOne({ $and: [{ user: req.params.id }, { academic_year: year }] }).exec(),
            modules.AdditionalResources.findOne({ $and: [{ user: req.params.id }, { academic_year: year }] }).exec(),
            modules.InnovativeTeaching.findOne({ $and: [{ user: req.params.id }, { academic_year: year }] }).exec(),
            modules.ExaminationDuties.findOne({ $and: [{ user: req.params.id }, { academic_year: year }] }).exec(),






            modules.CocurricularActivities.findOne({ $and: [{ user: req.params.id }, { academic_year: year }] }).exec(),
            modules.CorporateLife.findOne({ $and: [{ user: req.params.id }, { academic_year: year }] }).exec(),
            modules.ProfessionalDevelopment.findOne({ $and: [{ user: req.params.id }, { academic_year: year }] }).exec(),
            
           
            

            modules.ResearchPapersPublished.find({ $and: [{ user: req.params.id }, { academic_year: year }] }).exec(),
            modules.BooksChaptersPublished.find({ $and: [{ user: req.params.id }, { academic_year: year }] }).exec(),
            modules.SponsoredProjects.find({ $and: [{ user: req.params.id }, { academic_year: year }] }).exec(),
            modules.ConsultancyProjects.findOne({ $and: [{ user: req.params.id }, { academic_year: year }] }).exec(),
            modules.CompletedProjects.find({ $and: [{ user: req.params.id }, { academic_year: year }] }).exec(),
            modules.ProjectOutcomes.find({ $and: [{ user: req.params.id }, { academic_year: year }] }).exec(),
            modules.ResearchGuidance.find({ $and: [{ user: req.params.id }, { academic_year: year }] }).exec(),
            modules.TrainingCourses.find({ $and: [{ user: req.params.id }, { academic_year: year }] }).exec(),
            modules.ConferencePapersEntry.find({ $and: [{ user: req.params.id }, { academic_year: year }] }).exec(),
            modules.InvitedLectures.find({ $and: [{ user: req.params.id }, { academic_year: year }] }).exec()


            
            ];

            Promise.all(loads)
                .then(result => {
                    return Promise.all(result);
                })
                .then(([
                
                    teachingContribution, lecturesExcess, additionalResources, innovativeTeaching, examinationDuties,
                    cocurricularActivities, corporateLife, professionalDevelopment, papersPublishedNationalConf, papersPublishedInternationalConf, papersPublishedJournals, moocs, swayam, shortTermTraining, seminars,
                    researchPapersPublished, booksChaptersPublished, sponsoredProjects, consultancyProjects, completedProjects, projectOutcomes, researchGuidance, trainingCourses, conferencePapersEntry, invitedLectures, contributionToSyllabus, memberOfUniversityCommitte, consultancyAssignment, externalProjectsOrCompetition]) => {
                    
                    if (!teachingContribution) { teachingContribution = { entries: teachingContribution?.entries?.length ? teachingContribution.entries : [{ subject_name: '-', lectures_delivered: '-', lectures_allocated: '-', tutorials_delivered: '-', tutorials_allocated: '-', practical_sessions_delivered: '-', practical_sessions_allocated: '-' }], scoredOne: '-' } }
                    if (!lecturesExcess) { lecturesExcess = { entries: lecturesExcess?.entries?.length ? lecturesExcess.entries : [{ subject_name: '-', lectures_taken: '-', tutorials_taken: '-', practical_sessions_taken: '-' }], scoredTwo: '-' } }
                    if (!additionalResources) { additionalResources = { materials: '-', scoreThree: '-' } }
                    if (!innovativeTeaching) { innovativeTeaching = { techniques: '-', scoreFour: '-' } }
                    if (!examinationDuties) { examinationDuties = { invigilation: '-', questionPaperSetting: '-', evaluationAnswerScripts: '-', paperModeration: '_', labEvaluation: '_', scoreFive: '-' } }


                    if (!cocurricularActivities) { cocurricularActivities = { ncc: '-', nss: '-', otherActivities: '-', otherActivitiesDetails: '-', none: '-', scoreSix: '-' } }
                    if (!corporateLife) { corporateLife = { industryInteractions: '-', academicCommittees: '-', otherContributions: '-', otherContributionsDetails: '-', scoreSeven: '-' } }
                    if (!professionalDevelopment) { professionalDevelopment = { seminars: '-', professionalBody: '-', professionalBodyDetails: '-', document: '-', scoreEight: '-' } }



        
                    if (!researchPapersPublished) {researchPapersPublished = { publication_type: '-', journals: researchPapersPublished?.journals?.length ? researchPapersPublished.journals : [{ journal_title: '-', publication_link: '-', journal_document: '-', score: '-' }], total_score: '-' } }
                    if (!booksChaptersPublished) { booksChaptersPublished = { publication_type: '-', entries: booksChaptersPublished?.entries?.length ? booksChaptersPublished.entries : [{ title: '-', publication_link: '-', document: '-', score: '-' }], booksChaptersTotalScore: '-' } }
                    if (!sponsoredProjects) { sponsoredProjects = { project_type: '-', entries: sponsoredProjects?.entries?.length ? sponsoredProjects.entries : [{ title: '-', funding_agency: '-', amount: '-', document: '-', score: '-' }], sponsoredProjectsTotalScore: '-' } }
                    if (!consultancyProjects) { consultancyProjects = { entries: consultancyProjects?.entries?.length ? consultancyProjects.entries : [{ title: '-', funding_agency: '-', amount: '-', document: '-', score: '-' }], consultancyTotalScore: '-' } }
                    if (!completedProjects) { completedProjects = { project_type: '-', entries: completedProjects?.entries?.length ? completedProjects.entries : [{ title: '-', quality_evaluation: '-', report_accepted: '-', document: '-', score: '-' }], completedProjectsTotalScore: '-' } }
                    if (!projectOutcomes) { projectOutcomes = { outcome_level: '-', entries: projectOutcomes?.entries?.length ? projectOutcomes.entries : [{ title: '-', type: '-', description: '-', document: '-', score: '-' }], projectOutcomesTotalScore: '-' } }
                    if (!researchGuidance) { researchGuidance = { guidance_type: '-', entries: researchGuidance?.entries?.length ? researchGuidance.entries : [{ candidate_name: '-', status: '-', description: '-', document: '-', score: '-' }], researchGuidanceTotalScore: '-' } }
                    if (!trainingCourses) trainingCourses = { duration_type: '-', academic_year: '-', entries: trainingCourses?.entries?.length ? trainingCourses.entries : [{ programme_title: '-', organizing_institution: '-', duration: '-', course_type: '-', document: '-', score: '-' }], trainingCoursesTotalScore: '-' };
                    if (!conferencePapersEntry) conferencePapersEntry = { event_type: '-', entries: conferencePapersEntry?.entries?.length ? conferencePapersEntry.entries : [{ title: '-', event_name: '-', date: '-', presentation_type: '-', document: '-', score: '-' }], conferencePapersTotalScore: '-' };
                    if (!invitedLectures) { invitedLectures = { lecture_type: '-', entries: invitedLectures?.entries?.length ? invitedLectures.entries : [{ title: '-', event: '-', date: '-', document: '-', score: '-' }], invitedLecturesTotalScore: '-' }; }






                    // Combine and group journals
                    const groupedJournals = groupJournalsByPublicationType(researchPapersPublished);
                    const groupedBooksChapters = groupBooksChaptersByPublicationType(booksChaptersPublished);
                    const groupedSponsoredProjects = groupSponsoredProjectsByProjectType(sponsoredProjects);
                    const groupedCompletedProjects = groupCompletedProjectsByProjectType(completedProjects);
                    const groupedProjectOutcomes = groupProjectOutcomesByType(projectOutcomes);
                    const groupedResearchGuidance = groupResearchGuidanceByType(researchGuidance);
                    const groupedTrainingCourses = groupTrainingCoursesByType(trainingCourses);
                    const groupedConferencePapers = groupConferencePapersByType(conferencePapersEntry);
                    const groupedInvitedLectures = groupInvitedLecturesByType(invitedLectures);

                    document = {
                        content: [
                            { text: 'Self Appraisal Report', style: 'header' },
                            { text: 'Academic Year: ' + year, style: 'header' },

                            'Name: ' + facultyName + '\n',
                            'Email ID: ' + facultyEmail + '\n',

                            
                            { text: 'Category-1', style: 'subheader' },

                            { text: '1.1 Teaching Contribution', style: 'subheader' },
                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Subject Name', 'Lectures Delivered', 'Lectures Allocated', 'Tutorials Delivered', 'Tutorials Allocated', 'Practical Sessions Delivered', 'Practical Sessions Allocated'], // Table header
                                        ...teachingContribution.entries.map(entry => [
                                            entry.subject_name || '-', // Default to '-' if undefined
                                            entry.lectures_delivered || '-', // Default to '-' if undefined
                                            entry.lectures_allocated || '-', // Default to '-' if undefined
                                            entry.tutorials_delivered || '-', // Default to '-' if undefined
                                            entry.tutorials_allocated || '-', // Default to '-' if undefined
                                            entry.practical_sessions_delivered || '-', // Default to '-' if undefined
                                            entry.practical_sessions_allocated || '-' // Default to '-' if undefined
                                        ]),
                                        // Add a row for the total score
                                        [{ text: 'Total Score:', colSpan: 6, bold: true, alignment: 'right' }, {}, {}, {}, {}, {}, teachingContribution.scoredOne || '0']
                                    ]
                                }
                            },
                        
                           
                            
                            { text: '1.2 Lectures Excess', style: 'subheader' },
                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Subject Name', 'Lectures Taken', 'Tutorials Taken', 'Practical Sessions Taken'], // Table header
                                        ...lecturesExcess.entries.map(entry => [
                                            entry.subject_name || '-', // Default to '-' if undefined
                                            entry.lectures_taken || '-', // Default to '-' if undefined
                                            entry.tutorials_taken || '-', // Default to '-' if undefined
                                            entry.practical_sessions_taken || '-' // Default to '-' if undefined
                                        ]),
                                        // Add a row for the total score
                                        [{ text: 'Total Score:', colSpan: 3, bold: true, alignment: 'right' }, {}, {}, lecturesExcess.scoredTwo || '0']
                                    ]
                                }
                            },

                            { text: '1.3 Additional Resources ', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Materials', 'Score' ],
                                        [additionalResources.materials, additionalResources.scoreThree]
                                    ]
                                }
                            },

                            { text: '1.4 Innovative Teaching ', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Techniques', 'Score' ],
                                        [innovativeTeaching.techniques, innovativeTeaching.scoreFour]
                                    ]
                                }
                            },

                            { text: '1.5 Examination Duties ', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Invigilation', 'Question Paper Setting', 'Evaluation Answer Scripts', 'Paper Moderation', 'Lab Evaluation', 'Score' ],
                                        [examinationDuties.invigilation, examinationDuties.questionPaperSetting,examinationDuties.evaluationAnswerScripts,examinationDuties.paperModeration,examinationDuties.labEvaluation, examinationDuties.scoreFive]
                                    ]
                                }
                            },

                           

                           

                            { text: 'Category-2', style: 'subheader' },
                            { text: '2.1 Co-Curricular and Extra Activities', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['NCC', 'NSS', 'Other Activities', 'Other Activities Details', 'None', 'Score'],
                                        [cocurricularActivities.ncc, cocurricularActivities.nss, cocurricularActivities.otherActivities, cocurricularActivities.otherActivitiesDetails, cocurricularActivities.none, cocurricularActivities.scoreSix]
                                    ]
                                }
                            },
                            { text: '2.2 Contribution to Corporate Life and Management', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Industry Interactions', 'Academic Committees', 'Other Contributions', 'Other Contributions Details', 'Score'],
                                        [corporateLife.industryInteractions, corporateLife.academicCommittees, corporateLife.otherContributions, corporateLife.otherContributionsDetails, corporateLife.scoreSeven]
                                    ]
                                }
                            },
                            { text: '2.3 Professional Development Activities', style: 'subheader' },

                            {
                              style: 'tableExample',
                              table: {
                                  body: [
                                      ['Seminars', 'Membership in Professional Body', 'Professional Body Details', 'Document', 'Score'],
                                      [
                                          professionalDevelopment.seminars || '-',
                                          professionalDevelopment.professionalBody || '-',
                                          professionalDevelopment.professionalBodyDetails || '-',
                                          { text: 'View Document', link: `http://localhost:5000/${professionalDevelopment.document}`, color: 'blue', target: '_blank' },
                                          professionalDevelopment.scoreEight || '-'
                                      ]
                                  ]
                              }
                            },


                            






                            
                            { text: 'Category-3', style: 'subheader' },

                            { text: ' 3.1 Research Papers Published', style: 'subheader' },
                            ...Object.keys(groupedJournals).map(publicationType => {
                                // Calculate the total score for the current publication type
                                const totalScore = groupedJournals[publicationType].reduce((sum, journal) => sum + (Number(journal.score) || 0), 0);
                            
                                return [
                                    { text: `Publication Type: ${publicationType}`, style: 'subheader' },
                                    {
                                        style: 'tableExample',
                                        table: {
                                            body: [
                                                ['Journal Description', 'Publication Link', 'Journal Document', 'Score'], // Table header
                                                ...groupedJournals[publicationType].map(journal => [
                                                    journal.journal_title || '-', // Default to '-' if undefined
                                                    { text: 'View', link: journal.publication_link || '#', color: 'blue' }, // Clickable link
                                                    { text: 'Download', link: `http://localhost:5000/${journal.journal_document}`, color: 'blue', target: '_blank' }, // Clickable file
                                                    journal.score || '-' // Default to '-' if undefined
                                                ]),
                                                // Add a row for the total score
                                                [{ text: 'Total Score:', colSpan: 3, bold: true, alignment: 'right' }, {}, {}, totalScore]
                                            ]
                                        }
                                    }
                                ];
                            }),

                            { text: ' 3.2 Books/Chapters Published', style: 'subheader' },
                            ...Object.keys(groupedBooksChapters).map(publicationType => {
                                // Calculate the total score for the current publication type
                                const totalScore = groupedBooksChapters[publicationType].reduce((sum, entry) => sum + (Number(entry.score) || 0), 0);
                            
                                return [
                                    { text: `Publication Type: ${publicationType}`, style: 'subheader' },
                                    {
                                        style: 'tableExample',
                                        table: {
                                            body: [
                                                ['Title', 'Publication Link', 'Document', 'Score'], // Table header
                                                ...groupedBooksChapters[publicationType].map(entry => [
                                                    entry.title || '-', // Default to '-' if undefined
                                                    { text: 'View', link: entry.publication_link || '#', color: 'blue' }, // Clickable link
                                                    { text: 'Download', link: `http://localhost:5000/${entry.document}`, color: 'blue', target: '_blank' }, // Clickable file
                                                    entry.score || '-' // Default to '-' if undefined
                                                ]),
                                                // Add a row for the total score
                                                [{ text: 'Total Score:', colSpan: 3, bold: true, alignment: 'right' }, {}, {}, totalScore]
                                            ]
                                        }
                                    }
                                ];
                            }),

                            { text: ' 3.3 Research Projects', style: 'subheader' },
                            { text: ' 3.3.1 Sponsored Projects Carried Out/Ongoing', style: 'subheader' },
                            ...Object.keys(groupedSponsoredProjects).map(projectType => {
                                // Calculate the total score for the current project type
                                const totalScore = groupedSponsoredProjects[projectType].reduce((sum, entry) => sum + (Number(entry.score) || 0), 0);
                            
                                return [
                                    { text: `Project Type: ${projectType}`, style: 'subheader' },
                                    {
                                        style: 'tableExample',
                                        table: {
                                            body: [
                                                ['Title', 'Funding Agency', 'Amount Mobilized', 'Document', 'Score'], // Table header
                                                ...groupedSponsoredProjects[projectType].map(entry => [
                                                    entry.title || '-', // Default to '-' if undefined
                                                    entry.funding_agency || '-', // Default to '-' if undefined
                                                    entry.amount || '-', // Default to '-' if undefined
                                                    { text: 'Download', link: `http://localhost:5000/${entry.document}`, color: 'blue', target: '_blank' }, // Clickable file
                                                    entry.score || '-' // Default to '-' if undefined
                                                ]),
                                                // Add a row for the total score
                                                [{ text: 'Total Score:', colSpan: 4, bold: true, alignment: 'right' }, {}, {}, {}, totalScore]
                                            ]
                                        }
                                    }
                                ];
                            }),
                            { text: '3.3.2 Consultancy Projects Carried Out/Ongoing', style: 'subheader' },
                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Title', 'Funding Agency', 'Amount Mobilized', 'Document', 'Score'], // Table header
                                        ...consultancyProjects.entries.map(entry => [
                                            entry.title || '-', // Default to '-' if undefined
                                            entry.funding_agency || '-', // Default to '-' if undefined
                                            entry.amount || '-', // Default to '-' if undefined
                                            { text: 'Download', link: `http://localhost:5000/${entry.document}`, color: 'blue', target: '_blank' }, // Clickable file
                                            entry.score || '-' // Default to '-' if undefined
                                        ]),
                                        // Add a row for the total score
                                        [{ text: 'Total Score:', colSpan: 4, bold: true, alignment: 'right' }, {}, {}, {}, consultancyProjects.consultancyTotalScore || '-']
                                    ]
                                }
                            },

                            { text: '3.3.3 Completed Projects', style: 'subheader' },
                            ...Object.keys(groupedCompletedProjects).map(projectType => {
                                // Calculate the total score for the current project type
                                const totalScore = groupedCompletedProjects[projectType].reduce((sum, entry) => sum + (Number(entry.score) || 0), 0);
                            
                                return [
                                    { text: `Project Type: ${projectType}`, style: 'subheader' },
                                    {
                                        style: 'tableExample',
                                        table: {
                                            body: [
                                                ['Title', 'Quality Evaluation', 'Report Accepted', 'Document', 'Score'], // Table header
                                                ...groupedCompletedProjects[projectType].map(entry => [
                                                    entry.title || '-', // Default to '-' if undefined
                                                    (entry.quality_evaluation || '-').toUpperCase(), // Normalize "Yes" or "No" to uppercase
                                                    (entry.report_accepted || '-').toUpperCase(), // Normalize "Yes" or "No" to uppercase
                                                    entry.document
                                                        ? { text: 'Download', link: `http://localhost:5000/${entry.document}`, color: 'blue', target: '_blank' }
                                                        : '-', // Handle missing document gracefully
                                                    entry.score || '-' // Default to '-' if undefined
                                                ]),
                                                // Add a row for the total score
                                                [{ text: 'Total Score:', colSpan: 4, bold: true, alignment: 'right' }, {}, {}, {}, totalScore]
                                            ]
                                        }
                                    }
                                ];
                            }),
                            { text: '3.3.4 Projects Outcome/Outputs', style: 'subheader' },
                            ...Object.keys(groupedProjectOutcomes).map(outcomeType => {
                                // Calculate the total score for the current outcome type
                                const totalScore = groupedProjectOutcomes[outcomeType].reduce((sum, entry) => sum + (Number(entry.score) || 0), 0);
                            
                                return [
                                    { text: `Outcome Type: ${outcomeType}`, style: 'subheader' },
                                    {
                                        style: 'tableExample',
                                        table: {
                                            body: [
                                                ['Title', 'Type', 'Description', 'Document', 'Score'], // Table header
                                                ...groupedProjectOutcomes[outcomeType].map(entry => [
                                                    entry.title || '-', // Default to '-' if undefined
                                                    entry.type || '-', // Default to '-' if undefined
                                                    entry.description || '-', // Default to '-' if undefined
                                                    { text: 'Download', link: `http://localhost:5000/${entry.document}`, color: 'blue', target: '_blank' }, // Clickable file
                                                    entry.score || '-' // Default to '-' if undefined
                                                ]),
                                                // Add a row for the total score
                                                [{ text: 'Total Score:', colSpan: 4, bold: true, alignment: 'right' }, {}, {}, {}, totalScore]
                                            ]
                                        }
                                    }
                                ];
                            }),
                            { text: '3.4 Research Guidance', style: 'subheader' },
                            ...Object.keys(groupedResearchGuidance).map(guidanceType => {
                                // Calculate the total score for the current guidance type
                                const totalScore = groupedResearchGuidance[guidanceType].reduce((sum, entry) => sum + (Number(entry.score) || 0), 0);
                            
                                return [
                                    { text: `Guidance Type: ${guidanceType}`, style: 'subheader' },
                                    {
                                        style: 'tableExample',
                                        table: {
                                            body: [
                                                ['Candidate Name', 'Status', 'Description', 'Document', 'Score'], // Table header
                                                ...groupedResearchGuidance[guidanceType].map(entry => [
                                                    entry.candidate_name || '-', // Default to '-' if undefined
                                                    entry.status || '-', // Default to '-' if undefined
                                                    entry.description || '-', // Default to '-' if undefined
                                                    { text: 'Download', link: `http://localhost:5000/${entry.document}`, color: 'blue', target: '_blank' }, // Clickable file
                                                    entry.score || '-' // Default to '-' if undefined
                                                ]),
                                                // Add a row for the total score
                                                [{ text: 'Total Score:', colSpan: 4, bold: true, alignment: 'right' }, {}, {}, {}, totalScore]
                                            ]
                                        }
                                    }
                                ];
                            }),
                            { text: '3.5.1 Training Courses', style: 'subheader' },
                            ...Object.keys(groupedTrainingCourses).map(durationType => {
                                // Calculate the total score for the current duration type
                                const totalScore = groupedTrainingCourses[durationType].reduce((sum, entry) => sum + (Number(entry.score) || 0), 0);
                            
                                return [
                                    { text: `Duration Type: ${durationType}`, style: 'subheader' },
                                    {
                                        style: 'tableExample',
                                        table: {
                                            body: [
                                                ['Programme Title', 'Organizing Institution', 'Duration', 'Course Type', 'Document', 'Score'], // Table header
                                                ...groupedTrainingCourses[durationType].map(entry => [
                                                    entry.programme_title || '-', // Default to '-' if undefined
                                                    entry.organizing_institution || '-', // Default to '-' if undefined
                                                    entry.duration || '-', // Default to '-' if undefined
                                                    entry.course_type || '-', // Default to '-' if undefined
                                                    { text: 'Download', link: `http://localhost:5000/${entry.document}`, color: 'blue', target: '_blank' }, // Clickable file
                                                    entry.score || '-' // Default to '-' if undefined
                                                ]),
                                                // Add a row for the total score
                                                [{ text: 'Total Score:', colSpan: 5, bold: true, alignment: 'right' }, {}, {}, {}, {}, totalScore]
                                            ]
                                        }
                                    }
                                ];
                            }),
                            { text: '3.5.2 Conference Papers Entry', style: 'subheader' },
                            ...Object.keys(groupedConferencePapers).map(eventType => {
                                // Calculate the total score for the current event type
                                const totalScore = groupedConferencePapers[eventType].reduce((sum, entry) => sum + (Number(entry.score) || 0), 0);
                            
                                return [
                                    { text: `Event Type: ${eventType}`, style: 'subheader' },
                                    {
                                        style: 'tableExample',
                                        table: {
                                            body: [
                                                ['Title', 'Event Name', 'Date', 'Presentation Type', 'Document', 'Score'], // Table header
                                                ...groupedConferencePapers[eventType].map(entry => [
                                                    entry.title || '-', // Default to '-' if undefined
                                                    entry.event_name || '-', // Default to '-' if undefined
                                                    entry.date || '-', // Default to '-' if undefined
                                                    entry.presentation_type || '-', // Default to '-' if undefined
                                                    { text: 'Download', link: `http://localhost:5000/${entry.document}`, color: 'blue', target: '_blank' }, // Clickable file
                                                    entry.score || '-' // Default to '-' if undefined
                                                ]),
                                                // Add a row for the total score
                                                [{ text: 'Total Score:', colSpan: 5, bold: true, alignment: 'right' }, {}, {}, {}, {}, totalScore]
                                            ]
                                        }
                                    }
                                ];
                            }),
                            { text: '3.5.3 Invited Lectures or Presentations for Conferences/Symposia', style: 'subheader' },
                            ...Object.keys(groupedInvitedLectures).map(lectureType => {
                                // Calculate the total score for the current lecture type
                                const totalScore = groupedInvitedLectures[lectureType].reduce((sum, entry) => sum + (Number(entry.score) || 0), 0);
                            
                                return [
                                    { text: `Lecture Type: ${lectureType}`, style: 'subheader' },
                                    {
                                        style: 'tableExample',
                                        table: {
                                            body: [
                                                ['Title', 'Event', 'Date', 'Document', 'Score'], // Table header
                                                ...groupedInvitedLectures[lectureType].map(entry => [
                                                    entry.title || '-', // Default to '-' if undefined
                                                    entry.event || '-', // Default to '-' if undefined
                                                    entry.date || '-', // Default to '-' if undefined
                                                    { text: 'Download', link: `http://localhost:5000/${entry.document}`, color: 'blue', target: '_blank' }, // Clickable file
                                                    entry.score || '-' // Default to '-' if undefined
                                                ]),
                                                // Add a row for the total score
                                                [{ text: 'Total Score:', colSpan: 4, bold: true, alignment: 'right' }, {}, {}, {}, totalScore]
                                            ]
                                        }
                                    }
                                ];
                            }),
                            
                            
                            

                            

                        ],
                        styles: {
                            header: {
                                fontSize: 18,
                                bold: true,
                                margin: [0, 0, 0, 10]
                            },
                            subheader: {
                                fontSize: 16,
                                bold: true,
                                margin: [0, 10, 0, 5]
                            },
                            tableExample: {
                                margin: [0, 5, 0, 15]
                            },
                            tableHeader: {
                                bold: true,
                                fontSize: 13,
                                color: 'black'
                            }
                        },
                        defaultStyle: {
                            // alignment: 'justify'
                        }

                    }

                    const pdfDoc = pdfMake.createPdf(document);
                    pdfDoc.getBase64(data => {
                        res.writeHead(200, {
                            'Content-Type': 'application/pdf',
                            'Content-Disposition': `attachment;filename=${facultyName}.pdf`
                        });
                        const download = Buffer.from(data.toString('utf-8'), 'base64');
                        res.end(download);
                    });
                })
                .catch(err => {
                    console.error('Error fetching data:', err);
                    req.flash('error_msg', 'Error generating PDF. Please try again.');
                    res.redirect('back');
                });
        });
});

router.get('/hod/home', ensureAuthenticated, (req, res) => {
    let facultyDetails;
    Hod.findOne({ _id: req.user.id })
        .then(result => {
            if (!result) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('back');
            } else {
                var dept = result.department;
                Faculty.find({ department: dept })
                    .sort({ date: 'desc' })
                    .then(result => {
                        facultyDetails = result;
                        res.render('users/hod/home', {
                            faculty: result
                        });
                    })
                    .catch(() => {
                        req.flash('error_msg', 'Perticular faculty not found.');
                        res.redirect('back');
                    })
            }
        })
        .catch(() => {
            req.flash('error_msg', 'Cannot find the user.');
            res.redirect('back');
        })
});

// Delete faculty from HOD route
router.get('/hod/deleteFaculty/:id', ensureAuthenticated, (req, res) => {
    Hod.findOne({ _id: req.user.id })
        .then(result => {
            if (!result) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('back');
            } else {
                Faculty.deleteOne({ _id: req.params.id })
                    .then(() => {
                        req.flash('success_msg', 'User deleted successfully');
                        res.redirect('/users/hod/home');
                    })
                    .catch(() => {
                        req.flash('error_msg', 'Cannot find the user. Please try again');
                        res.redirect('back');
                    })
            }
        })
});

var facultyA1, facultyA2, facultyA3, facultyDept;
router.post('/hod/finalSubmit/:id/:year', (req, res) => {

    let errors = [];
    if (req.body.value1 == '' || req.body.value2 == '' || req.body.value3 == '' || req.body.value4 == '' || req.body.value5 == '') {
        errors.push({ text: 'Please mark all the buttons' });
    } else {
        const faculty = Faculty.find({ _id: req.params.id }).exec();
        const facultymarks = FacultyMarks.find({ $and: [{ user: req.params.id }, { academic_year: req.params.year }] }).exec();
        Promise.all([faculty, facultymarks]).then(result => {
            return Promise.all(result);
        }).then(([result, facultymarks]) => {
            facultyName = result[0].name;
            facultyEmail = result[0].email;
            facultyDept = result[0].department;
            facultyA1 = facultymarks[0].category_1;
            facultyA2 = facultymarks[0].category_2;
            facultyA3 = facultymarks[0].category_3;

            let finalValue = +req.body.value1 + +req.body.value2 + +req.body.value3 + +req.body.value4 + +req.body.value5
            // console.log(facultyName);
            // console.log(facultyEmail);
            const finalSubmitData = {
                academic_year: year,
                faculty_name: facultyName,
                faculty_email: facultyEmail,
                department: facultyDept,
                category_1: req.body.category_1,
                category_2: req.body.category_2,
                category_3: req.body.category_3,
                confidential: finalValue,
                facultyA1: facultyA1,
                facultyA2: facultyA2,
                facultyA3: facultyA3,
                user: facultID
            }
            new HodMarks(finalSubmitData)
                .save()
                .then(confidential_form => {
                    req.flash('success_msg', 'Marks added successfully');
                    res.redirect('/users/hod/home');
                })
                .catch(() => {
                    req.flash('error_msg', 'Cannot save the data. Please try logging in again.');
                    res.redirect('back');
                })
        })
    }
});

// Register faculty
router.get('/hod/registerFaculty', ensureAuthenticated, (req, res) => {
    Hod.findOne({ _id: req.user.id })
        .then(result => {
            if (!result) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('back');
            } else {
                var dept = result.department;
                res.render('users/hod/registerFaculty', { dept });
            }
        })
        .catch(() => {
            req.flash('error_msg', 'Cannot find the user.');
            res.redirect('back');
        })
});

// Register Form POST
router.post('/registerFaculty', (req, res) => {
    let errors = [];
    if (req.body.password != req.body.password2) {
        errors.push({ text: 'Password do not match' });
    }
    if (req.body.password.length < 4) {
        errors.push({ text: 'Password must be atleast 4 characters' });
    }
    if (errors.length > 0) {
        res.render('users/hod/registerFaculty', {
            errors: errors,
            name: req.body.name,
            email: req.body.email,
            department: req.body.department,
            password: req.body.password,
            password2: req.body.password2
        });
    } else {
        Faculty.findOne({ email: req.body.email })
            .then(user => {
                if (user) {
                    req.flash('error_msg', 'Email already registered');
                    res.redirect('/users/hod/registerFaculty');
                } else {
                    const newUser = new Faculty({
                        name: req.body.name,
                        email: req.body.email,
                        type: req.body.type,
                        department: req.body.department,
                        password: req.body.password
                    });

                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;
                            newUser.save()
                                .then(user => {
                                    req.flash('success_msg', 'New user added to the appraisal system');
                                    res.redirect('/users/hod/registerFaculty')
                                });
                        });
                    });
                }
            })
            .catch(() => {
                req.flash('error_msg', 'Cannot find the user.');
                res.redirect('back');
            })
    }
});

// mangament user creation 
router.get('/management/registerUser', ensureAuthenticated, (req, res) => {
    Manager.findOne({ _id: req.user.id })
        .then(result => {
            if (!result) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('back');
            } else {
                res.render('users/management/registerUser');
            }
        }).catch(() => {
            req.flash('error_msg', 'Not Authorized');
            res.redirect('back');
        })
});

// Post route for user creation by manager
router.post('/management/registerUser', (req, res) => {
    var type = req.body.type;
    if (type === 'faculty') {
        let errors = [];
        if (req.body.password != req.body.password2) {
            errors.push({ text: 'Password do not match' });
        }
        if (req.body.password.length < 4) {
            errors.push({ text: 'Password must be atleast 4 characters' });
        }
        if (errors.length > 0) {
            res.render('users/management/registerUser', {
                errors: errors,
                name: req.body.name,
                email: req.body.email,
                type: req.body.type,
                department: req.body.department,
                password: req.body.password,
                password2: req.body.password2
            });
        } else {
            Faculty.findOne({ email: req.body.email })
                .then(user => {
                    if (user) {
                        req.flash('error_msg', 'Email already registered');
                        res.redirect('/users/management/registerUser');
                    } else {
                        const newUser = new Faculty({
                            name: req.body.name,
                            email: req.body.email,
                            type: req.body.type,
                            department: req.body.department,
                            password: req.body.password
                        });

                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(newUser.password, salt, (err, hash) => {
                                if (err) throw err;
                                newUser.password = hash;
                                newUser.save()
                                    .then(user => {
                                        req.flash('success_msg', 'New user added to the appraisal system as faculty');
                                        res.redirect('/users/management/registerUser')
                                    });
                            });
                        });
                    }
                })
        }
    } else if (type === 'hod') {
        let errors = [];
        if (req.body.password != req.body.password2) {
            errors.push({ text: 'Password do not match' });
        }
        if (req.body.password.length < 4) {
            errors.push({ text: 'Password must be atleast 4 characters' });
        }
        if (errors.length > 0) {
            res.render('users/management/registerUser', {
                errors: errors,
                name: req.body.name,
                email: req.body.email,
                type: req.body.type,
                department: req.body.department,
                password: req.body.password,
                password2: req.body.password2
            });
        } else {
            Hod.findOne({ email: req.body.email })
                .then(user => {
                    if (user) {
                        req.flash('error_msg', 'Email already registered');
                        res.redirect('/users/management/registerUser');
                    } else {
                        const newUser = new Hod({
                            name: req.body.name,
                            email: req.body.email,
                            type: req.body.type,
                            department: req.body.department,
                            password: req.body.password
                        });

                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(newUser.password, salt, (err, hash) => {
                                if (err) throw err;
                                newUser.password = hash;
                                newUser.save()
                                    .then(user => {
                                        req.flash('success_msg', 'New user added to the appraisal system as HoD');
                                        res.redirect('/users/management/registerUser')
                                    })
                                    .catch(err => {
                                        req.flash('error_msg', 'There was some technical error.');
                                        return res.redirect('back');
                                    });
                            });
                        });
                    }
                });
        }
    }
});

// reset route faculty
router.get('/faculty/forgot', (req, res) => {
    res.render('users/faculty/forgot');
});

router.get('/faculty/reset', (req, res) => {
    res.render('users/faculty/reset');
});

// reset route hod
router.get('/hod/forgot', (req, res) => {
    res.render('users/hod/forgot');
});

router.get('/hod/reset', (req, res) => {
    res.render('users/hod/reset');
});

// reset route management
router.get('/manager/forgot', (req, res) => {
    res.render('users/management/forgot');
});

router.get('/manager/reset', (req, res) => {
    res.render('users/management/reset');
});

// Logout user
router.get('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err); // Handle error if any
        }
        req.flash('success_msg', 'You are logged out');
        res.redirect('/');
    });
});


module.exports = router;