const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { ensureAuthenticated } = require('../helpers/auth');
const AcademicYear = require('../config/academicYear');
const { calculateCategoryOneTotalScore } = require('../utils/categoryOne');
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
router.get('/facultyOverview', ensureAuthenticated, async (req, res) => {
    try {
        const yearRecord = await AcademicYear.findOne({ user: req.user.id }).exec();
        if (!yearRecord) {
            req.flash('error_msg', 'Select the academic year before proceeding');
            return res.redirect('/');
        }
        const year = yearRecord.academic_year;

        const scores = await calculateCategoryOneTotalScore(req.user.id, year);

        if (scores.categoryOneTotalScore < 75) {
            req.flash('error_msg', 'Total score for Category 01 should be at least 75. Please review your scores.');
            return res.redirect('/category-1/facultyOverview');
        }

        res.render('facultyOverview', scores);
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Error fetching data. Please try again.');
        res.redirect('/');
    }
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






module.exports = router;