const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { ensureAuthenticated } = require('../helpers/auth');
const AcademicYear = require('../config/academicYear');

// let academic_year_id;
let year;

// Load teaching model
require('../models/AcademicPerformance/TeachingLoad')
const TeachingLoad = mongoose.model('teachingload');



// Teaching load route
router.get('/teachingLoad', ensureAuthenticated, (req, res) => {
    AcademicYear.find({ user: req.user.id })
        .then(result => {
            if (!result) {
                req.flash('error_msg', 'Select the academic year before proceeding');
                res.redirect('/');
            }
            // academic_year_id = result[0].user;
            year = result[0].academic_year;
            TeachingLoad.find({ $and: [{ user: req.user.id }, { academic_year: year }] })
                .then(result => {
                    res.render('academicPerformance/teachingLoad', { result });
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



// Load edit pages for teaching load
router.get('/teachingLoad/edit/:id', ensureAuthenticated, (req, res) => {
    TeachingLoad.findOne({ _id: req.params.id })
        .then(result => {
            if (result.user != req.user.id) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('/academicPerformance/teachingLoad');
            } else {
                res.render('academicPerformance/teachingLoad', { editResult: result });
            }
        })
        .catch(() => {
            req.flash('error_msg', 'Error while finding your previous data. Please try again.');
            res.redirect('/academicPerformance/teachingLoad');
        })
});



//process teaching form
router.post('/teachingLoad', (req, res) => {
    let errors = [];

    if (!req.body.theory_subject || req.body.theory_subject > 40 || req.body.theory_subject < 0) {
        errors.push({ text: 'Please enter value between 0 to 40 for theory load' });
    } else if (!req.body.lab_subject || req.body.lab_subject > 40 || req.body.lab_subject < 0) {
        errors.push({ text: 'Please enter value between 0 to 40 for lab load' });
    } else if (!req.body.tutorials || req.body.tutorials > 40 || req.body.tutorials < 0) {
        errors.push({ text: 'Please enter value between 0 to 40 for tutorials load' });
    } else if (!req.body.theory_session || req.body.theory_session > 40 || req.body.theory_session < 0) {
        errors.push({ text: 'Please enter value between 0 to 40 for theory session' });
    } else if (!req.body.practical_session || req.body.practical_session > 40 || req.body.practical_session < 0) {
        errors.push({ text: 'Please enter value between 0 to 40 for practical session' });
    }
    else if (!req.body.Student_feedback || req.body.Student_feedback > 5 || req.body.Student_feedback < 0) {
        errors.push({ text: 'Please enter feedback value between 0 and 5' });
    }
    if (errors.length > 0) {
        res.render('academicPerformance/teachingLoad', {
            errors: errors,
            subject_name: req.body.subject_name,
            class: req.body.class,
            department: req.body.department,
            semester: req.body.semester,
            theory_subject: req.body.theory_subject,
            lab_subject: req.body.lab_subject,
            tutorials: req.body.tutorials,
            theory_session: req.body.theory_session,
            practical_session: req.body.practical_session,
            Student_feedback: req.body.Student_feedback,

        });
    }
    else {
        // add preleave data into db
        const TeachingRecord = {
            academic_year: year,
            subject_name: req.body.subject_name,
            class: req.body.class,
            department: req.body.department,
            semester: req.body.semester,
            theory_subject: req.body.theory_subject,
            lab_subject: req.body.lab_subject,
            tutorials: req.body.tutorials,
            theory_session: req.body.theory_session,
            practical_session: req.body.practical_session,
            Student_feedback: req.body.Student_feedback,
            user: req.user.id

        }
        new TeachingLoad(TeachingRecord)
            .save()
            .then(teaching => {
                req.flash('success_msg', 'Data entered successfully');
                res.redirect('/academicPerformance/teachingAssistant');
            })
            .catch(err => {
                console.log(err);
                req.flash('error_msg', 'faculty ID not found please login again.');
                res.redirect('/academicPerformance/teachingLoad');
            })
    }
});





// Put request (edit form)
router.put('/teachingLoad/:id', (req, res) => {
    let errors = [];

    if (!req.body.theory_subject || req.body.theory_subject > 40 || req.body.theory_subject < 0) {
        errors.push({ text: 'Please enter value between 0 to 40 for theory load' });
    } else if (!req.body.lab_subject || req.body.lab_subject > 40 || req.body.lab_subject < 0) {
        errors.push({ text: 'Please enter value between 0 to 40 for lab load' });
    } else if (!req.body.tutorials || req.body.tutorials > 40 || req.body.tutorials < 0) {
        errors.push({ text: 'Please enter value between 0 to 40 for tutorials load' });
    } else if (!req.body.theory_session || req.body.theory_session > 40 || req.body.theory_session < 0) {
        errors.push({ text: 'Please enter value between 0 to 40 for theory session' });
    } else if (!req.body.practical_session || req.body.practical_session > 40 || req.body.practical_session < 0) {
        errors.push({ text: 'Please enter value between 0 to 40 for practical session' });
    }
    else if (!req.body.Student_feedback || req.body.Student_feedback > 5 || req.body.Student_feedback < 0) {
        errors.push({ text: 'Please enter feedback value between 0 and 5' });
    }

    if (errors.length > 0) {
        if (!req.body.theory_subject || req.body.theory_subject > 40 || req.body.theory_subject < 0) {
            req.flash('error_msg', 'Please enter value between 0 to 40 for theory load');
        } else if (!req.body.lab_subject || req.body.lab_subject > 40 || req.body.lab_subject < 0) {
            req.flash('error_msg', 'Please enter value between 0 to 40 for lab load');
        } else if (!req.body.tutorials || req.body.tutorials > 40 || req.body.tutorials < 0) {
            req.flash('error_msg', 'Please enter value between 0 to 40 for tutorials');
        } else if (!req.body.theory_session || req.body.theory_session > 40 || req.body.theory_session < 0) {
            req.flash('error_msg', 'Please enter value between 0 to 40 for theory sessions');
        } else if (!req.body.practical_session || req.body.practical_session > 40 || req.body.practical_session < 0) {
            req.flash('error_msg', 'Please enter value between 0 to 40 for practical sessions');
        }
        else if (!req.body.Student_feedback || req.body.Student_feedback > 5 || req.body.Student_feedback < 0) {
            req.flash('error_msg', 'Please enter feedback value between 0 to 5');
        }


        res.redirect('/academicPerformance/teachingLoad');
    }
    else {

        TeachingLoad.findOne({ _id: req.params.id })
            .then(result => {
                result.subject_name = req.body.subject_name,
                    result.class = req.body.class,
                    result.department = req.body.department,
                    result.semester = req.body.semester,
                    result.theory_subject = req.body.theory_subject,
                    result.lab_subject = req.body.lab_subject,
                    result.tutorials = req.body.tutorials,
                    result.theory_session = req.body.theory_session,
                    result.practical_session = req.body.practical_session,
                    result.Student_feedback = req.body.Student_feedback


                result.save()
                    .then(result => {
                        req.flash('success_msg', 'Data updated successfully');
                        res.redirect('/academicPerformance/teachingLoad');
                    })
                    .catch(() => {
                        req.flash('error_msg', 'Data not updated. Please try logging in again.');
                        res.redirect('/academicPerformance/teachingLoad');
                    })
            })
            .catch(() => {
                req.flash('error_msg', 'User not found. Please try logging in again.');
                res.redirect('/academicPerformance/teachingLoad');
            })
    }
});



//DELETE DATA
//academic performance data delete
router.delete('/teachingLoad/delete/:id', (req, res) => {
    TeachingLoad.deleteOne({ _id: req.params.id })
        .then(() => {
            req.flash('success_msg', 'Data deleted successfully');
            res.redirect('/academicPerformance/teachingLoad');
        })
        .catch(() => {
            req.flash('error_msg', 'User not found. Please try logging in again.');
            res.redirect('/academicPerformance/teachingLoad');
        })
});



module.exports = router;