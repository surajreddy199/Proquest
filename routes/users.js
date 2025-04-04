const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const router = express.Router();
const pdfMake = require('pdfmake/build/pdfmake.js');
const pdfFonts = require('pdfmake/build/vfs_fonts.js');
const { calculateCategoryOneTotalScore } = require('../utils/categoryOne');
const { groupJournalsByPublicationType } = require('../utils/grouping');
const { groupBooksChaptersByPublicationType } = require('../utils/grouping');

var fs = require('fs');
// var Chart = require('chart.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;
const { ensureAuthenticated } = require('../helpers/auth');

var modules = require('../config/modules');
const AcademicYear = require('../config/academicYear');

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


//main
// router.get('/faculty/facultyOverview', ensureAuthenticated, (req, res) => {
//     let finalResult;
//     Faculty.findOne({ _id: req.user.id })
//         .then(result => {
//             if (!result) {
//                 req.flash('error_msg', 'Not Authorized');
//                 return res.redirect('back');
//             } else {
//                 AcademicYear.find({ user: req.user.id })
//                     .then(result => {
//                         if (!result || result.length === 0) {
//                             req.flash('error_msg', 'Select the academic year before proceeding');
//                             return res.redirect('/');
//                         }
//                         year = result[0].academic_year;

//                         FacultyMarks.find({ $and: [{ user: req.user.id }, { academic_year: year }] })
//                             .then(result => {
//                                 finalResult = result;

//                                 // Fetch all required data for Category 1 and other modules
//                                 const loads = [
//                                     modules.TeachingContribution.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
//                                     modules.LecturesExcess.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
//                                     modules.AdditionalResources.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
//                                     modules.InnovativeTeaching.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
//                                     modules.ExaminationDuties.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec()
//                                 ];

//                                 Promise.all(loads)
//                                     .then(([teachingContribution, lecturesExcess, additionalResources, innovativeTeaching, examinationDuties]) => {
//                                         // Calculate total score for Category 1
                                        
//                                         const teachingContributionScore = teachingContribution ? teachingContribution.scoreOne || 0 : 0;
//                                         const lecturesExcessScore = lecturesExcess ? lecturesExcess.scoreTwo || 0 : 0;
//                                         const additionalResourcesScore = additionalResources ? additionalResources.scoreThree || 0 : 0;
//                                         const innovativeTeachingScore = innovativeTeaching ? innovativeTeaching.scoreFour || 0 : 0;
//                                         const examinationDutiesScore = examinationDuties ? examinationDuties.scoreFive || 0 : 0;

//                                         const categoryOneTotalScore =
//                                             teachingContributionScore +
//                                             lecturesExcessScore +
//                                             additionalResourcesScore +
//                                             innovativeTeachingScore +
//                                             examinationDutiesScore;

//                                              // Debugging logs
//                                         console.log('Category 1 Scores:', {
//                                             teachingContributionScore,
//                                             lecturesExcessScore,
//                                             additionalResourcesScore,
//                                             innovativeTeachingScore,
//                                             examinationDutiesScore,
//                                             categoryOneTotalScore,
//                                         });

//                                         // Render the page with all the data
//                                         res.render('users/faculty/facultyOverview', {
//                                             finalResult,
//                                             teachingContribution,
//                                             lecturesExcess,
//                                             additionalResources,
//                                             innovativeTeaching,
//                                             examinationDuties,
//                                             teachingContributionScore,
//                                             lecturesExcessScore,
//                                             additionalResourcesScore,
//                                             innovativeTeachingScore,
//                                             examinationDutiesScore,
//                                             categoryOneTotalScore
//                                         });
//                                     })
//                                     .catch(err => {
//                                         console.error(err);
//                                         req.flash('error_msg', 'Error fetching data. Please try again.');
//                                         res.redirect('back');
//                                     });
//                             })
//                             .catch(err => {
//                                 console.error(err);
//                                 req.flash('error_msg', 'Error fetching faculty marks. Please try again.');
//                                 res.redirect('back');
//                             });
//                     })
//                     .catch(err => {
//                         console.error(err);
//                         req.flash('error_msg', 'Academic year not selected.');
//                         res.redirect('back');
//                     });
//             }
//         })
//         .catch(err => {
//             console.error(err);
//             req.flash('error_msg', 'Cannot find the user.');
//             res.redirect('back');
//         });
// });


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
                    // Debugging logs
                    // console.log('Category 1 Scores:', scores);
                    // console.log('Final Result:', finalResult);

                    // Render the page with all the data
                    res.render('users/faculty/facultyOverview', {
                        finalResult,
                        teachingContributionScore: scores.teachingContributionScore || 0,
                        lecturesExcessScore: scores.lecturesExcessScore || 0,
                        additionalResourcesScore: scores.additionalResourcesScore || 0,
                        innovativeTeachingScore: scores.innovativeTeachingScore || 0,
                        examinationDutiesScore: scores.examinationDutiesScore || 0,
                        categoryOneTotalScore: scores.categoryOneTotalScore || 0
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
                                    var loads = [modules.TeachingLoad.findOne({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec(),
                                    

                                    modules.Leave.findOne({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec(),

                                    modules.TeachingContribution.findOne({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec(),
                                    modules.LecturesExcess.findOne({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec(),
                                    modules.AdditionalResources.findOne({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec(),
                                    modules.InnovativeTeaching.findOne({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec(),
                                    modules.ExaminationDuties.findOne({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec(),


                                   
                                    modules.PapersPublishedNationalConf.findOne({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec(),
                                    modules.PapersPublishedInternationalConf.findOne({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec(),
                                    modules.PapersPublishedJournals.findOne({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec(),
                                    modules.Moocs.findOne({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec(),
                                    modules.Swayam.findOne({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec(),
                                    modules.ShortTermTraining.findOne({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec(),
                                    modules.Seminars.findOne({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec(),

                                    modules.ResearchPapersPublished.findOne({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec(),
                                    modules.BooksChaptersPublished.findOne({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec(),

                                    modules.ResourcePerson.findOne({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec(),
                                    modules.ContributionToSyllabus.findOne({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec(),
                                    modules.MemberOfUniversityCommitte.findOne({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec(),
                                    modules.ConsultancyAssignment.findOne({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec(),
                                    modules.ExternalProjectsOrCompetition.findOne({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec(),

                                    HodMarks.findOne({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec()
                                    ];
                                    Promise.all(loads)
                                        .then(result => {
                                            return Promise.all(result);
                                        })
                                        .then(([teachingLoad,
                                            leave,
                                            teachingContribution, lecturesExcess, additionalResources, innovativeTeaching, examinationDuties,
                                            papersPublishedNationalConf, papersPublishedInternationalConf, papersPublishedJournals, moocs, swayam, shortTermTraining, seminars,
                                            researchPapersPublished,booksChaptersPublished, resourcePerson, contributionToSyllabus, memberOfUniversityCommitte, consultancyAssignment, externalProjectsOrCompetition,
                                            hodMarks,
                                        ]) => {

                                            res.render('users/hod/hodOverview', { finalResult, teachingLoad, leave, teachingContribution, lecturesExcess, additionalResources, innovativeTeaching, examinationDuties, papersPublishedNationalConf, papersPublishedInternationalConf, papersPublishedJournals, moocs, swayam, shortTermTraining, seminars, researchPapersPublished, booksChaptersPublished, resourcePerson, contributionToSyllabus, memberOfUniversityCommitte, consultancyAssignment, externalProjectsOrCompetition, hodMarks, year });
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

    // Validate inputs
    if (!req.body.academicPerformance || req.body.academicPerformance > 40 || req.body.academicPerformance < 0) {
        errors.push({ text: 'Please enter marks between 0 to 40 for AP' });
    }
    if (!req.body.leaveRecord || req.body.leaveRecord > 40 || req.body.leaveRecord < 0) {
        errors.push({ text: 'Please enter marks between 0 to 40 for Leave' });
    }
    if (!req.body.category_2 || req.body.category_2 > 40 || req.body.category_2 < 0) {
        errors.push({ text: 'Please enter marks between 0 to 40 for Cat 02' });
    }
    if (!req.body.category_3 || req.body.category_3 > 40 || req.body.category_3 < 0) {
        errors.push({ text: 'Please enter marks between 0 to 40 for Cat 03' });
    }


    try {
        const year = req.params.year;
        const scores = await calculateCategoryOneTotalScore(req.user.id, year);

        if (scores.categoryOneTotalScore < 75) {
            errors.push({
                text: `Category 1 total score must be at least 75. Current score: ${scores.categoryOneTotalScore}`
            });
        }

        if (errors.length > 0) {
            res.render('users/faculty/facultyOverview', {
                errors,
                academicPerformance: req.body.academicPerformance,
                leaveRecord: req.body.leaveRecord,
                ...scores,
                category_2: req.body.category_2,
                category_3: req.body.category_3
            });
        } else {
            const marks = {
                academic_year: year,
                academicPerformance: req.body.academicPerformance,
                leaveRecord: req.body.leaveRecord,
                category_1: scores.categoryOneTotalScore,
                category_2: req.body.category_2,
                category_3: req.body.category_3,
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

            var loads = [modules.TeachingLoad.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
           

            modules.Leave.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),

            modules.TeachingContribution.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
            modules.LecturesExcess.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
            modules.AdditionalResources.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
            modules.InnovativeTeaching.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
            modules.ExaminationDuties.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),

          
            modules.PapersPublishedNationalConf.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
            modules.PapersPublishedInternationalConf.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
            modules.PapersPublishedJournals.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
            modules.Moocs.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
            modules.Swayam.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
            modules.ShortTermTraining.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
            modules.Seminars.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),

            modules.ResearchPapersPublished.find({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
            modules.BooksChaptersPublished.find({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
            modules.ResourcePerson.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
            modules.ContributionToSyllabus.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
            modules.MemberOfUniversityCommitte.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
            modules.ConsultancyAssignment.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
            modules.ExternalProjectsOrCompetition.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec()
            ];

            Promise.all(loads)
                .then(result => {
                    console.log('Year:', year);
                    console.log('User ID:', req.user.id);
                    return Promise.all(result);
                })
                .then(([teachingLoad,
                    leave,
                    teachingContribution, lecturesExcess, additionalResources, innovativeTeaching, examinationDuties,
                    papersPublishedNationalConf, papersPublishedInternationalConf, papersPublishedJournals, moocs, swayam, shortTermTraining, seminars,
                    researchPapersPublished, booksChaptersPublished, resourcePerson, contributionToSyllabus, memberOfUniversityCommitte, consultancyAssignment, externalProjectsOrCompetition]) => {
                       

                   
                    if (!leave) { leave = { pre_casual_leave: '-', pre_outdoor_leave: '-', pre_medical_leave: '-', pre_special_leave: '-', post_casual_leave: '-', post_outdoor_leave: '-', post_medical_leave: '-', post_special_leave: '-' } }
                    if (!teachingContribution) { teachingContribution = { lecturesDelivered: '-', lecturesAllocated: '-', tutorialsDelivered: '-', tutorialsAllocated: '-', practicalSessionsDelivered: '-', practicalSessionsAllocated: '-', scoreOne: '-' } }
                    if (!lecturesExcess) { lecturesExcess = { lecturesTaken: '-', tutorialsTaken: '-', practicalSessionsTaken: '-', scoreTwo: '-' } }
                    if (!additionalResources) { additionalResources = { materials: '-', scoreThree: '-' } }
                    if (!innovativeTeaching) { innovativeTeaching = { techniques: '-', scoreFour: '-' } }
                    if (!examinationDuties) { examinationDuties = { invigilation: '-', questionPaperSetting: '_', evaluationAnswerScripts: '_', paperModeration: '_', labEvaluation: '_', scoreFive: '-' } }

                 
                    if (!papersPublishedNationalConf) { papersPublishedNationalConf = { title_of_paper_published: '-', published_date: '-', name_of_conference: '-', isbn_issn_number: '-', name_of_coauthor: '-', impact_factor: '-', no_of_citations: '-', rating: '-', link: '-' } }
                    if (!papersPublishedInternationalConf) { papersPublishedInternationalConf = { title_of_paper_published: '-', published_date: '-', name_of_conference: '-', isbn_issn_number: '-', name_of_coauthor: '-', impact_factor: '-', no_of_citations: '-', rating: '-', link: '-' } }
                    if (!papersPublishedJournals) { papersPublishedJournals = { title_of_paper_published: '-', published_date: '-', name_of_conference: '-', isbn_issn_number: '-', name_of_coauthor: '-', impact_factor: '-', no_of_citations: '-', rating: '-', link: '-' } }
                    if (!moocs) { moocs = { name_of_moocs_undertaken: '-', moocs_date: '-', moocs_duartion: '-', certification_status: '-' } }
                    if (!swayam) { swayam = { name_of_swayam_undertaken: '-', swayam_date: '-', swayam_duartion: '-', certification_status: '-' } }
                    if (!shortTermTraining) { shortTermTraining = { short_term_training: '-', techonology: '-', duration_of_course: '-', start_date: '-', end_date: '-', internal_external: '-', name_of_institue: '-' } }
                    if (!seminars) { seminars = { name_of_seminar: '-', techonology: '-', duration_of_course: '-', start_date: '-', end_date: '-', internal_external: '-', name_of_institue: '-' } }
                    if (!researchPapersPublished) {researchPapersPublished = { publication_type: '-', journals: researchPapersPublished?.journals?.length ? researchPapersPublished.journals : [{ journal_title: '-', publication_link: '-', journal_document: '-', score: '-' }], total_score: '-' } }
                    if (!booksChaptersPublished) { booksChaptersPublished = { publication_type: '-', entries: booksChaptersPublished?.entries?.length ? booksChaptersPublished.entries : [{ title: '-', publication_link: '-', document: '-', score: '-' }], booksChaptersTotalScore: '-' } }
                    if (!resourcePerson) { resourcePerson = { topicName: '-', department: '-', nameofInstitute: '-', numberofParticipants: '-' } }
                    if (!contributionToSyllabus) { contributionToSyllabus = { nameofSub: '-', role: '-', nameofUniversity: '-', otherDetails: '-' } }
                    if (!memberOfUniversityCommitte) { memberOfUniversityCommitte = { nameofCommittee: '-', rolesAndResponsibility: '-', designation: '-' } }
                    if (!consultancyAssignment) { consultancyAssignment = { rolesAndResponsilbilty: '-', typeOfWorkorDomain: '-', organization: '-', duration: '-', numberofVisits: '-' } }
                    if (!externalProjectsOrCompetition) { externalProjectsOrCompetition = { description: '-', contribution: '-', university: '-', duration: '-', comments: '-' } }


                    // Combine and group journals
                    const groupedJournals = groupJournalsByPublicationType(researchPapersPublished);
                    const groupedBooksChapters = groupBooksChaptersByPublicationType(booksChaptersPublished);

                    // Debugging logs
console.log('BooksChaptersPublished:', JSON.stringify(booksChaptersPublished, null, 2));
console.log('Grouped Books/Chapters:', JSON.stringify(groupedBooksChapters, null, 2));

                    
                

                    //generate pdf
                    const  document = {
                        content: [
                            { text: 'Self Appraisal Report', style: 'header' },
                            { text: 'Academic Year: ' + year, style: 'header' },

                            'Name: ' + facultyName + '\n',
                            'Email ID: ' + facultyEmail + '\n',

                            

                        
                            { text: 'Leave Record', style: 'subheader' },
                            { text: '1. Pre-Sanctioned Leave Record', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Causal Leave', 'Outdoor Leave', 'Medical Leave', 'Special Leave'],
                                        [leave.pre_casual_leave, leave.pre_outdoor_leave, leave.pre_medical_leave, leave.pre_special_leave]
                                    ]
                                }
                            },
                            { text: '1. Post-Sanctioned Leave Record', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Causal Leave', 'Outdoor Leave', 'Medical Leave', 'Special Leave'],
                                        [leave.post_casual_leave, leave.post_outdoor_leave, leave.post_medical_leave, leave.post_special_leave]
                                    ]
                                }
                            },
                            { text: 'Category-1', style: 'subheader' },

                            { text: '1.1 Teaching Contribution ', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['lecturesDelivered', 'lecturesAllocated', 'tutorialsDelivered', 'tutorialsAllocated', 'practicalSessionsDelivered', 'practicalSessionsAllocated', 'scoreOne' ],
                                        [teachingContribution.lecturesDelivered, teachingContribution.lecturesAllocated,teachingContribution.tutorialsDelivered,teachingContribution.tutorialsAllocated,teachingContribution.practicalSessionsDelivered,teachingContribution.practicalSessionsAllocated,teachingContribution.scoreOne]
                                    ]
                                }
                            },

                            { text: '1.2 Lectures in Excess ', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['lecturesTaken', 'tutorialsTaken', 'practicalSessionsTaken', 'scoreTwo' ],
                                        [lecturesExcess.lecturesTaken, lecturesExcess.tutorialsTaken, lecturesExcess.practicalSessionsTaken, lecturesExcess.scoreTwo]
                                    ]
                                }
                            },

                            { text: '1.3 Additional Resources ', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['materials', 'scoreThree' ],
                                        [additionalResources.materials, additionalResources.scoreThree]
                                    ]
                                }
                            },

                            { text: '1.4 Innovative Teaching ', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['techniques', 'scoreFour' ],
                                        [innovativeTeaching.techniques, innovativeTeaching.scoreFour]
                                    ]
                                }
                            },

                            { text: '1.5 Examination Duties ', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['invigilation', 'questionPaperSetting', 'evaluationAnswerScripts', 'paperModeration', 'labEvaluation', 'scoreFive' ],
                                        [examinationDuties.invigilation, examinationDuties.questionPaperSetting,examinationDuties.evaluationAnswerScripts,examinationDuties.paperModeration,examinationDuties.labEvaluation, examinationDuties.scoreFive]
                                    ]
                                }
                            },

                            

                            

                            

                            { text: 'Category-2', style: 'subheader' },
                            { text: '2.1 Papers Published In National Conference', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Title of Paper', 'Month/Year', 'Name of Conference', 'ISBN/ISSN Number', 'Name of co-authors', 'Impact Factor of Conference', 'No. of citations ', 'Rating', 'Online Link'],
                                        [papersPublishedNationalConf.title_of_paper_published, papersPublishedNationalConf.published_date, papersPublishedNationalConf.name_of_conference, papersPublishedNationalConf.isbn_issn_number, papersPublishedNationalConf.name_of_coauthor, papersPublishedNationalConf.impact_factor, papersPublishedNationalConf.no_of_citations, papersPublishedNationalConf.rating, papersPublishedNationalConf.link]
                                    ]
                                }
                            },

                            { text: ' 2.2 Papers Published In International Conference', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Title of Paper', 'Month/Year', 'Name of Conference', 'ISBN/ISSN Number', 'Name of co-authors', 'Impact Factor of Conference', 'No. of citations ', 'Rating', 'Online Link'],
                                        [papersPublishedInternationalConf.title_of_paper_published, papersPublishedInternationalConf.published_date, papersPublishedInternationalConf.name_of_conference, papersPublishedInternationalConf.isbn_issn_number, papersPublishedInternationalConf.name_of_coauthor, papersPublishedInternationalConf.impact_factor, papersPublishedInternationalConf.no_of_citations, papersPublishedInternationalConf.rating, papersPublishedInternationalConf.link]
                                    ]
                                }
                            },

                            { text: ' 2.3 Papers Published In Journals', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Title of Paper', 'Month/Year', 'Name of Conference', 'ISBN/ISSN Number', 'Name of co-authors', 'Impact Factor of Conference', 'No. of citations ', 'Rating', 'Online Link'],
                                        [papersPublishedJournals.title_of_paper_published, papersPublishedJournals.published_date, papersPublishedJournals.name_of_conference, papersPublishedJournals.isbn_issn_number, papersPublishedJournals.name_of_coauthor, papersPublishedJournals.impact_factor, papersPublishedJournals.no_of_citations, papersPublishedJournals.rating,
                                        papersPublishedJournals.link]
                                    ]
                                }
                            },

                            { text: '2.4 MOOCS', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Name of courses', 'Month/Year', 'Duration(hrs)', 'Certification Completed?'],
                                        [moocs.name_of_moocs_undertaken, moocs.moocs_date, moocs.moocs_duartion, moocs.certification_status]
                                    ]
                                }
                            },

                            { text: ' 2.5 Swayam', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Name of courses', 'Month/Year', 'Duration(hrs)', 'Certification Completed?'],
                                        [swayam.name_of_swayam_undertaken, swayam.swayam_date, swayam.swayam_duartion, swayam.certification_status]
                                    ]
                                }
                            },

                            { text: ' 2.6 Short-Term Traning', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Name of STTPs Conducted', 'Techonology', 'Duration(months)', 'Start Date', 'End Date', 'Internal/External', 'Name of Institute where atteneded '],
                                        [shortTermTraining.short_term_training, shortTermTraining.techonology, shortTermTraining.duration_of_course, shortTermTraining.start_date, shortTermTraining.end_date, shortTermTraining.internal_external, shortTermTraining.name_of_institue]
                                    ]
                                }
                            },

                            { text: '2.7 Seminars', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Name of Seminar', 'Techonology', 'Duration(months)', 'Start Date', 'End Date', 'Internal/External', 'Name of Institute where atteneded '],
                                        [seminars.name_of_seminar, seminars.techonology, seminars.duration_of_course, seminars.start_date, seminars.end_date, seminars.internal_external, seminars.name_of_institue]
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
                                                    { text: 'Download', link: `http://localhost:5000/${journal.journal_document}`, color: 'blue' }, // Clickable file
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
                                                    { text: 'Download', link: `http://localhost:5000/${entry.document}`, color: 'blue' }, // Clickable file
                                                    entry.score || '-' // Default to '-' if undefined
                                                ]),
                                                // Add a row for the total score
                                                [{ text: 'Total Score:', colSpan: 3, bold: true, alignment: 'right' }, {}, {}, totalScore]
                                            ]
                                        }
                                    }
                                ];
                            }),
                            
                            
                            

                            { text: ' 3.1 Resource Person in STTP/Training Course/Lecture Talks', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Topic Name', 'Department', 'Name of Institute', 'No. of Participants'],
                                        [resourcePerson.topicName, resourcePerson.department, resourcePerson.nameofInstitute, resourcePerson.numberofParticipants]
                                    ]
                                }
                            },

                            { text: '  3.2 Contribution To Syllabus Framing', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Subject Name', 'Role', 'Name of University', 'Other Details'],
                                        [contributionToSyllabus.nameofSub, contributionToSyllabus.role, contributionToSyllabus.nameofUniversity, contributionToSyllabus.otherDetails]
                                    ]
                                }
                            },

                            { text: ' 3.3 Member Of University Committe', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Name of Committee', 'Roles and Responsibility', 'Designation'],
                                        [memberOfUniversityCommitte.nameofCommittee, memberOfUniversityCommitte.rolesAndResponsibility, memberOfUniversityCommitte.designation]
                                    ]
                                }
                            },

                            { text: ' 3.4 Consultancy Assignment', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Roles and Responsibility', 'Type of Work/Domain', 'Organization', 'Duration', 'No. of visits'],
                                        [consultancyAssignment.rolesAndResponsilbilty, consultancyAssignment.typeOfWorkorDomain, consultancyAssignment.organization, consultancyAssignment.duration, consultancyAssignment.numberofVisits]
                                    ]
                                }
                            },


                            { text: ' 3.5 External Projects Or Competitions Participations', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Description', 'Contribution', 'University', 'Duration', 'Comments'],
                                        [externalProjectsOrCompetition.description, externalProjectsOrCompetition.contribution, externalProjectsOrCompetition.university, externalProjectsOrCompetition.duration, externalProjectsOrCompetition.comments]
                                    ]
                                }
                            },

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
router.post('/hod/pdf/:id', (req, res) => {
    Faculty.find({ _id: req.params.id })
        .then(result => {
            facultyName = result[0].name;
            facultyEmail = result[0].email;
            var loads = [modules.TeachingLoad.findOne({ $and: [{ user: req.params.id }, { academic_year: year }] }).exec(),
            

            modules.Leave.findOne({ $and: [{ user: req.params.id }, { academic_year: year }] }).exec(),

            modules.TeachingContribution.findOne({ $and: [{ user: req.params.id }, { academic_year: year }] }).exec(),
            modules.LecturesExcess.findOne({ $and: [{ user: req.params.id }, { academic_year: year }] }).exec(),
            modules.AdditionalResources.findOne({ $and: [{ user: req.params.id }, { academic_year: year }] }).exec(),
            modules.InnovativeTeaching.findOne({ $and: [{ user: req.params.id }, { academic_year: year }] }).exec(),
            modules.ExaminationDuties.findOne({ $and: [{ user: req.params.id }, { academic_year: year }] }).exec(),
            
           
            modules.PapersPublishedNationalConf.findOne({ $and: [{ user: req.params.id }, { academic_year: year }] }).exec(),
            modules.PapersPublishedInternationalConf.findOne({ $and: [{ user: req.params.id }, { academic_year: year }] }).exec(),
            modules.PapersPublishedJournals.findOne({ $and: [{ user: req.params.id }, { academic_year: year }] }).exec(),
            modules.Moocs.findOne({ $and: [{ user: req.params.id }, { academic_year: year }] }).exec(),
            modules.Swayam.findOne({ $and: [{ user: req.params.id }, { academic_year: year }] }).exec(),
            modules.ShortTermTraining.findOne({ $and: [{ user: req.params.id }, { academic_year: year }] }).exec(),
            modules.Seminars.findOne({ $and: [{ user: req.params.id }, { academic_year: year }] }).exec(),

            modules.ResearchPapersPublished.findOne({ $and: [{ user: req.params.id }, { academic_year: year }] }).exec(),
            modules.BooksChaptersPublished.findOne({ $and: [{ user: req.params.id }, { academic_year: year }] }).exec(),
            modules.ResourcePerson.findOne({ $and: [{ user: req.params.id }, { academic_year: year }] }).exec(),
            modules.ContributionToSyllabus.findOne({ $and: [{ user: req.params.id }, { academic_year: year }] }).exec(),
            modules.MemberOfUniversityCommitte.findOne({ $and: [{ user: req.params.id }, { academic_year: year }] }).exec(),
            modules.ConsultancyAssignment.findOne({ $and: [{ user: req.params.id }, { academic_year: year }] }).exec(),
            modules.ExternalProjectsOrCompetition.findOne({ $and: [{ user: req.params.id }, { academic_year: year }] }).exec()
            ];

            Promise.all(loads)
                .then(result => {
                    return Promise.all(result);
                })
                .then(([teachingLoad,
                    leave,
                    teachingContribution, lecturesExcess, additionalResources, innovativeTeaching, examinationDuties,
                    papersPublishedNationalConf, papersPublishedInternationalConf, papersPublishedJournals, moocs, swayam, shortTermTraining, seminars,
                    researchPapersPublished,booksChaptersPublished, resourcePerson, contributionToSyllabus, memberOfUniversityCommitte, consultancyAssignment, externalProjectsOrCompetition]) => {
                    
                    if (!leave) { leave = { pre_casual_leave: '-', pre_outdoor_leave: '-', pre_medical_leave: '-', pre_special_leave: '-', post_casual_leave: '-', post_outdoor_leave: '-', post_medical_leave: '-', post_special_leave: '-' } }
                    if (!teachingContribution) { teachingContribution = { lecturesDelivered: '-', lecturesAllocated: '-', tutorialsDelivered: '-', tutorialsAllocated: '-', practicalSessionsDelivered: '-', practicalSessionsAllocated: '-', scoreOne: '-' } }
                    if (!lecturesExcess) { lecturesExcess = { lecturesTaken: '-', tutorialsTaken: '-', practicalSessionsTaken: '-', scoreTwo: '-' } }
                    if (!additionalResources) { additionalResources = { materials: '-', scoreThree: '-' } }
                    if (!innovativeTeaching) { innovativeTeaching = { techniques: '-', scoreFour: '-' } }
                    if (!examinationDuties) { examinationDuties = { invigilation: '-', questionPaperSetting: '-', evaluationAnswerScripts: '-', paperModeration: '_', labEvaluation: '_', scoreFive: '-' } }


                    if (!papersPublishedNationalConf) { papersPublishedNationalConf = { title_of_paper_published: '-', published_date: '-', name_of_conference: '-', isbn_issn_number: '-', name_of_coauthor: '-', impact_factor: '-', no_of_citations: '-', rating: '-', link: '-' } }
                    if (!papersPublishedInternationalConf) { papersPublishedInternationalConf = { title_of_paper_published: '-', published_date: '-', name_of_conference: '-', isbn_issn_number: '-', name_of_coauthor: '-', impact_factor: '-', no_of_citations: '-', rating: '-', link: '-' } }
                    if (!papersPublishedJournals) { papersPublishedJournals = { title_of_paper_published: '-', published_date: '-', name_of_conference: '-', isbn_issn_number: '-', name_of_coauthor: '-', impact_factor: '-', no_of_citations: '-', rating: '-', link: '-' } }
                    if (!moocs) { moocs = { name_of_moocs_undertaken: '-', moocs_date: '-', moocs_duartion: '-', certification_status: '-' } }
                    if (!swayam) { swayam = { name_of_swayam_undertaken: '-', swayam_date: '-', swayam_duartion: '-', certification_status: '-' } }
                    if (!shortTermTraining) { shortTermTraining = { short_term_training: '-', techonology: '-', duration_of_course: '-', start_date: '-', end_date: '-', internal_external: '-', name_of_institue: '-' } }
                    if (!seminars) { seminars = { name_of_seminar: '-', techonology: '-', duration_of_course: '-', start_date: '-', end_date: '-', internal_external: '-', name_of_institue: '-' } }
                    if (!researchPapersPublished) {researchPapersPublished = { publication_type: '-', journals: researchPapersPublished?.journals?.length ? researchPapersPublished.journals : [{ journal_title: '-', publication_link: '-', journal_document: '-', score: '-' }], total_score: '-' } }
                    if (!booksChaptersPublished) { booksChaptersPublished = { publication_type: '-', entries: booksChaptersPublished?.entries?.length ? booksChaptersPublished.entries : [{ title: '-', publication_link: '-', document: '-', score: '-' }], booksChaptersTotalScore: '-' } }
                    if (!resourcePerson) { resourcePerson = { topicName: '-', department: '-', nameofInstitute: '-', numberofParticipants: '-' } }
                    if (!contributionToSyllabus) { contributionToSyllabus = { nameofSub: '-', role: '-', nameofUniversity: '-', otherDetails: '-' } }
                    if (!memberOfUniversityCommitte) { memberOfUniversityCommitte = { nameofCommittee: '-', rolesAndResponsibility: '-', designation: '-' } }
                    if (!consultancyAssignment) { consultancyAssignment = { rolesAndResponsilbilty: '-', typeOfWorkorDomain: '-', organization: '-', duration: '-', numberofVisits: '-' } }
                    if (!externalProjectsOrCompetition) { externalProjectsOrCompetition = { description: '-', contribution: '-', university: '-', duration: '-', comments: '-' } }

                    document = {
                        content: [
                            { text: 'Self Appraisal Report', style: 'header' },
                            { text: 'Academic Year: ' + teachingContribution.academic_year, style: 'header' },

                            'Name: ' + facultyName + '\n',
                            'Email ID: ' + facultyEmail + '\n',

                            // { text: 'Academic Performance', style: 'subheader' },
                            // { text: '1. Teaching Load', style: 'subheader' },

                            // {
                            //     style: 'tableExample',
                            //     table: {
                            //         body: [
                            //             ['Subject Name', 'Class', 'Department', 'Semester', 'Theory Load', 'Lab Load', 'Tutorials Load ', 'Theory sessions', 'Practical Sessions', 'Feedback'],
                            //             [teachingLoad.subject_name, teachingLoad.class, teachingLoad.department, teachingLoad.semester, teachingLoad.theory_subject, teachingLoad.lab_subject, teachingLoad.tutorials, teachingLoad.theory_session, teachingLoad.practical_session, teachingLoad.Student_feedback]
                            //         ]
                            //     }
                            // },

                            
                            { text: 'Leave Record', style: 'subheader' },
                            { text: '1. Pre-Sanctioned Leave Record', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Causal Leave', 'Outdoor Leave', 'Medical Leave', 'Special Leave'],
                                        [leave.pre_casual_leave, leave.pre_outdoor_leave, leave.pre_medical_leave, leave.pre_special_leave]
                                    ]
                                }
                            },
                            { text: '1. Post-Sanctioned Leave Record', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Causal Leave', 'Outdoor Leave', 'Medical Leave', 'Special Leave'],
                                        [leave.post_casual_leave, leave.post_outdoor_leave, leave.post_medical_leave, leave.post_special_leave]
                                    ]
                                }
                            },
                            { text: 'Category-1', style: 'subheader' },
                        
                           
                            { text: '1.1 Teaching Contribution ', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['lecturesDelivered', 'lecturesAllocated', 'tutorialsDelivered', 'tutorialsAllocated', 'practicalSessionsDelivered', 'practicalSessionsAllocated', 'scoreOne' ],
                                        [teachingContribution.lecturesDelivered, teachingContribution.lecturesAllocated,teachingContribution.tutorialsDelivered,teachingContribution.tutorialsAllocated,teachingContribution.practicalSessionsDelivered,teachingContribution.practicalSessionsAllocated,teachingContribution.scoreOne]
                                    ]
                                }
                            },
                            { text: '1.2 Lectures in Excess ', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['lecturesTaken', 'tutorialsTaken', 'practicalSessionsTaken', 'scoreTwo' ],
                                        [lecturesExcess.lecturesTaken, lecturesExcess.tutorialsTaken, lecturesExcess.practicalSessionsTaken, lecturesExcess.scoreTwo]
                                    ]
                                }
                            },

                            { text: '1.3 Additional Resources ', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['materials', 'scoreThree' ],
                                        [additionalResources.materials, additionalResources.scoreThree]
                                    ]
                                }
                            },

                            { text: '1.4 Innovative Teaching ', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['techniques', 'scoreFour' ],
                                        [innovativeTeaching.techniques, innovativeTeaching.scoreFour]
                                    ]
                                }
                            },

                            { text: '1.5 Examination Duties ', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['invigilation', 'questionPaperSetting', 'evaluationAnswerScripts', 'paperModeration', 'labEvaluation', 'scoreFive' ],
                                        [examinationDuties.invigilation, examinationDuties.questionPaperSetting,examinationDuties.evaluationAnswerScripts,examinationDuties.paperModeration,examinationDuties.labEvaluation, examinationDuties.scoreFive]
                                    ]
                                }
                            },

                           

                           

                            { text: 'Category-2', style: 'subheader' },
                            { text: '2.1 Papers Published In National Conference', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Title of Paper', 'Month/Year', 'Name of Conference', 'ISBN/ISSN Number', 'Name of co-authors', 'Impact Factor of Conference', 'No. of citations ', 'Rating', 'Online Link'],
                                        [papersPublishedNationalConf.title_of_paper_published, papersPublishedNationalConf.published_date, papersPublishedNationalConf.name_of_conference, papersPublishedNationalConf.isbn_issn_number, papersPublishedNationalConf.name_of_coauthor, papersPublishedNationalConf.impact_factor, papersPublishedNationalConf.no_of_citations, papersPublishedNationalConf.rating, papersPublishedNationalConf.link]
                                    ]
                                }
                            },

                            { text: ' 2.2 Papers Published In International Conference', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Title of Paper', 'Month/Year', 'Name of Conference', 'ISBN/ISSN Number', 'Name of co-authors', 'Impact Factor of Conference', 'No. of citations ', 'Rating', 'Online Link'],
                                        [papersPublishedInternationalConf.title_of_paper_published, papersPublishedInternationalConf.published_date, papersPublishedInternationalConf.name_of_conference, papersPublishedInternationalConf.isbn_issn_number, papersPublishedInternationalConf.name_of_coauthor, papersPublishedInternationalConf.impact_factor, papersPublishedInternationalConf.no_of_citations, papersPublishedInternationalConf.rating, papersPublishedInternationalConf.link]
                                    ]
                                }
                            },

                            { text: ' 2.3 Papers Published In Journals', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Title of Paper', 'Month/Year', 'Name of Conference', 'ISBN/ISSN Number', 'Name of co-authors', 'Impact Factor of Conference', 'No. of citations ', 'Rating', 'Online Link'],
                                        [papersPublishedJournals.title_of_paper_published, papersPublishedJournals.published_date, papersPublishedJournals.name_of_conference, papersPublishedJournals.isbn_issn_number, papersPublishedJournals.name_of_coauthor, papersPublishedJournals.impact_factor, papersPublishedJournals.no_of_citations, papersPublishedJournals.rating,
                                        papersPublishedJournals.link]
                                    ]
                                }
                            },

                            { text: '2.4 MOOCS', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Name of courses', 'Month/Year', 'Duration(hrs)', 'Certification Completed?'],
                                        [moocs.name_of_moocs_undertaken, moocs.moocs_date, moocs.moocs_duartion, moocs.certification_status]
                                    ]
                                }
                            },

                            { text: ' 2.5 Swayam', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Name of courses', 'Month/Year', 'Duration(hrs)', 'Certification Completed?'],
                                        [swayam.name_of_swayam_undertaken, swayam.swayam_date, swayam.swayam_duartion, swayam.certification_status]
                                    ]
                                }
                            },

                            { text: ' 2.6 Short-Term Traning', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Name of STTPs Conducted', 'Techonology', 'Duration(months)', 'Start Date', 'End Date', 'Internal/External', 'Name of Institute where atteneded '],
                                        [shortTermTraining.short_term_training, shortTermTraining.techonology, shortTermTraining.duration_of_course, shortTermTraining.start_date, shortTermTraining.end_date, shortTermTraining.internal_external, shortTermTraining.name_of_institue]
                                    ]
                                }
                            },

                            { text: '2.7 Seminars', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Name of Seminar', 'Techonology', 'Duration(months)', 'Start Date', 'End Date', 'Internal/External', 'Name of Institute where atteneded '],
                                        [seminars.name_of_seminar, seminars.techonology, seminars.duration_of_course, seminars.start_date, seminars.end_date, seminars.internal_external, seminars.name_of_institue]
                                    ]
                                }
                            },
                            { text: 'Category-3', style: 'subheader' },

                            { text: ' 3.1 Research Papers Published', style: 'subheader' },
                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Publication Type', 'Journal Description', 'Publication Link', 'Journal Document', 'Score'],
                                        ...researchPapersPublished.journals.map(journal => [
                                            researchPapersPublished.publication_type, 
                                            journal.journal_title, 
                                            { text: 'View', link: journal.publication_link, color: 'blue' }, // Clickable link
                                            { text: 'Download', link: journal.journal_document, color: 'blue' }, // Clickable file
                                            journal.score
                                        ]),
                                        [{ text: 'Total Score:', colSpan: 4, bold: true, alignment: 'right' }, {}, {}, {}, researchPapersPublished.total_score]
                                    ]
                                }
                            },
                            { text: ' 3.2 Books/Chapters Published', style: 'subheader' },
                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Publication Type', 'Title', 'Publication Link', 'Document', 'Score'],
                                        ...booksChaptersPublished.entries.map(entry => [
                                            booksChaptersPublished.publication_type,
                                            entry.title,
                                            { text: 'View', link: entry.publication_link, color: 'blue' }, // Clickable link
                                            { text: 'Download', link: entry.document, color: 'blue' }, // Clickable file
                                            entry.score
                                        ]),
                                        [{ text: 'Total Score:', colSpan: 4, bold: true, alignment: 'right' }, {}, {}, {}, booksChaptersPublished.booksChaptersTotalScore]
                                    ]
                                }
                            },
                            
                            
                            { text: ' 3.1 Resource Person in STTP/Training Course/Lecture Talks', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Topic Name', 'Department', 'Name of Institute', 'No. of Participants'],
                                        [resourcePerson.topicName, resourcePerson.department, resourcePerson.nameofInstitute, resourcePerson.numberofParticipants]
                                    ]
                                }
                            },

                            { text: '  3.2 Contribution To Syllabus Framing', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Subject Name', 'Role', 'Name of University', 'Other Details'],
                                        [contributionToSyllabus.nameofSub, contributionToSyllabus.role, contributionToSyllabus.nameofUniversity, contributionToSyllabus.otherDetails]
                                    ]
                                }
                            },

                            { text: ' 3.3 Member Of University Committe', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Name of Committee', 'Roles and Responsibility', 'Designation'],
                                        [memberOfUniversityCommitte.nameofCommittee, memberOfUniversityCommitte.rolesAndResponsibility, memberOfUniversityCommitte.designation]
                                    ]
                                }
                            },

                            { text: ' 3.4 Consultancy Assignment', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Roles and Responsibility', 'Type of Work/Domain', 'Organization', 'Duration', 'No. of visits'],
                                        [consultancyAssignment.rolesAndResponsilbilty, consultancyAssignment.typeOfWorkorDomain, consultancyAssignment.organization, consultancyAssignment.duration, consultancyAssignment.numberofVisits]
                                    ]
                                }
                            },


                            { text: ' 3.5 External Projects Or Competitions Participations', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Description', 'Contribution', 'University', 'Duration', 'Comments'],
                                        [externalProjectsOrCompetition.description, externalProjectsOrCompetition.contribution, externalProjectsOrCompetition.university, externalProjectsOrCompetition.duration, externalProjectsOrCompetition.comments]
                                    ]
                                }
                            },

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
        })
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

var facultyAP, facultyLeave, facultyA1, facultyA2, facultyA3, facultyDept;
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
            facultyAP = facultymarks[0].academicPerformance;
            facultyLeave = facultymarks[0].leaveRecord;
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
                academicPerformance: req.body.academicPerformance,
                leaveRecord: req.body.leaveRecord,
                category_1: req.body.category_1,
                category_2: req.body.category_2,
                category_3: req.body.category_3,
                confidential: finalValue,
                facultyAP: facultyAP,
                facultyLeave: facultyLeave,
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