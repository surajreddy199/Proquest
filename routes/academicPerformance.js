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

// Load teaching assistant model
require('../models/AcademicPerformance/TeachingAssistant')
const TeachingAssistant = mongoose.model('teachingassistant');

//load new books info model
require('../models/AcademicPerformance/NewBooks');
const NewBooks = mongoose.model('newbooks');

//load added exxperiments info model
require('../models/AcademicPerformance/AddedExp');
const AddedExp = mongoose.model('addedexp');

// Load innovative teaching technique model
require('../models/AcademicPerformance/Innovation')
const Innovation = mongoose.model('innovation');

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

// Teaching assistant route
router.get('/teachingAssistant', ensureAuthenticated, (req, res) => {
    AcademicYear.find({ user: req.user.id })
        .then(result => {
            if (!result) {
                req.flash('error_msg', 'Select the academic year before proceeding');
                res.redirect('/');
            }
            year = result[0].academic_year;
            TeachingAssistant.find({ $and: [{ user: req.user.id }, { academic_year: year }] })
                .then(result => {
                    res.render('academicPerformance/teachingAssistant', { result });
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

// new books load route
router.get('/newBooks', ensureAuthenticated, (req, res) => {
    AcademicYear.find({ user: req.user.id })
        .then(result => {
            if (!result) {
                req.flash('error_msg', 'Select the academic year before proceeding');
                res.redirect('/');
            }
            year = result[0].academic_year;
            NewBooks.find({ $and: [{ user: req.user.id }, { academic_year: year }] })
                .then(result => {
                    res.render('academicPerformance/newBooks', { result });
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

// added experiment load route
router.get('/addedExp', ensureAuthenticated, (req, res) => {
    AcademicYear.find({ user: req.user.id })
        .then(result => {
            if (!result) {
                req.flash('error_msg', 'Select the academic year before proceeding');
                res.redirect('/');
            }
            year = result[0].academic_year;
            AddedExp.find({ $and: [{ user: req.user.id }, { academic_year: year }] })
                .then(result => {
                    res.render('academicPerformance/addedExp', { result });
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

// innovative teaching technique load route
router.get('/innovativeTeaching', ensureAuthenticated, (req, res) => {
    AcademicYear.find({ user: req.user.id })
        .then(result => {
            if (!result) {
                req.flash('error_msg', 'Select the academic year before proceeding');
                res.redirect('/');
            }
            year = result[0].academic_year;
            Innovation.find({ $and: [{ user: req.user.id }, { academic_year: year }] })
                .then(result => {
                    res.render('academicPerformance/innovativeTeaching', { result });
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

// Load edit pages for teaching assistant
router.get('/teachingAssistant/edit/:id', ensureAuthenticated, (req, res) => {
    TeachingAssistant.findOne({ _id: req.params.id })
        .then(result => {
            if (result.user != req.user.id) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('/academicPerformance/teachingAssistant');
            } else {
                res.render('academicPerformance/teachingAssistant', { editResult: result });
            }
        })
        .catch(() => {
            req.flash('error_msg', 'Error while finding your previous data. Please try again.');
            res.redirect('/academicPerformance/teachingAssistant');
        })
});

// Load edit pages for new books
router.get('/newBooks/edit/:id', ensureAuthenticated, (req, res) => {
    NewBooks.findOne({ _id: req.params.id })
        .then(result => {
            if (result.user != req.user.id) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('/academicPerformance/newBooks');
            } else {
                res.render('academicPerformance/newBooks', { editResult: result });
            }
        })
        .catch(() => {
            req.flash('error_msg', 'Error while finding your previous data. Please try again.');
            res.redirect('/academicPerformance/newBooks');
        })
});

// added experiment edit route
router.get('/addedExp/edit/:id', ensureAuthenticated, (req, res) => {
    AddedExp.findOne({ _id: req.params.id })
        .then(result => {
            if (result.user != req.user.id) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('/academicPerformance/addedExp');
            } else {
                res.render('academicPerformance/addedExp', { editResult: result });
            }
        })
        .catch(() => {
            req.flash('error_msg', 'Error while finding your previous data. Please try again.');
            res.redirect('/academicPerformance/addedExp');
        })
});

// innovative teaching technique edit route
router.get('/innovativeTeaching/edit/:id', ensureAuthenticated, (req, res) => {
    Innovation.findOne({ _id: req.params.id })
        .then(result => {
            if (result.user != req.user.id) {
                req.flash('error_msg', 'Not authorized');
                res.redirect('/academicPerformance/innovativeTeaching');
            } else {
                res.render('academicPerformance/innovativeTeaching', { editResult: result });
            }
        })
        .catch(() => {
            req.flash('error_msg', 'Error while finding your previous data. Please try again.');
            res.redirect('/academicPerformance/innovativeTeaching');
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

//process teaching form
router.post('/teachingAssistant', (req, res) => {
    // add preleave data into db
    const teachingAssistantRecord = {
        academic_year: year,
        faculty_name: req.body.faculty_name,
        class: req.body.class,
        semester: req.body.semester,
        subject: req.body.subject,
        user: req.user.id
    }
    new TeachingAssistant(teachingAssistantRecord)
        .save()
        .then(teachingAssistant => {
            req.flash('success_msg', 'Data entered successfully');
            res.redirect('/academicPerformance/newBooks');
        })
        .catch(err => {
            console.log(err);
            req.flash('error_msg', 'faculty ID not found please login again.');
            res.redirect('/academicPerformance/teachingAssistant');
        })
});

//process new books form
router.post('/newBooks', (req, res) => {
    // add preleave data into db
    const NewBooksRecord = {
        academic_year: year,
        subject_name: req.body.subject_name,
        title: req.body.title,
        semester: req.body.semester,
        class: req.body.class,
        publication: req.body.publication,
        author: req.body.author,
        user: req.user.id
    }
    new NewBooks(NewBooksRecord)
        .save()
        .then(newbooks => {
            req.flash('success_msg', 'Data entered successfully');
            res.redirect('/academicPerformance/addedExp');
        })
        .catch(err => {
            console.log(err);
            req.flash('error_msg', 'faculty ID not found please login again.');
            res.redirect('/academicPerformance/newBooks');
        })
});

//process added experiments form
router.post('/addedExp', (req, res) => {
    // add preleave data into db
    const AddedExpRecord = {
        academic_year: year,
        subject_name: req.body.subject_name,
        class: req.body.class,
        semester: req.body.semester,
        exp_name: req.body.exp_name,
        user: req.user.id
    }
    new AddedExp(AddedExpRecord)
        .save()
        .then(newbooks => {
            req.flash('success_msg', 'Data entered successfully');
            res.redirect('/academicPerformance/innovativeTeaching');
        })
        .catch(err => {
            console.log(err);
            req.flash('error_msg', 'faculty ID not found please login again.');
            res.redirect('/academicPerformance/addedExp');
        })
});

//process innovation teaching technique form
router.post('/innovation', (req, res) => {
    // add preleave data into db
    const InnovationTeachingRecords = {
        academic_year: year,
        subject_name: req.body.subject_name,
        class_name: req.body.class_name,
        semester: req.body.semester,
        technique: req.body.technique,
        user: req.user.id
    }
    new Innovation(InnovationTeachingRecords)
        .save()
        .then(innovationrecords => {
            req.flash('success_msg', 'Data entered successfully');
            res.redirect('/leave');
        })
        .catch(err => {
            console.log(err);
            req.flash('error_msg', 'faculty ID not found please login again.');
            res.redirect('/academicPerformance/innovation');
        })
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

router.put('/teachingAssistant/:id', (req, res) => {
    TeachingAssistant.findOne({ _id: req.params.id })
        .then(result => {
            result.faculty_name = req.body.faculty_name,
                result.class = req.body.class,
                result.semester = req.body.semester,
                result.subject = req.body.subject

            result.save()
                .then(result => {
                    req.flash('success_msg', 'Data updated successfully');
                    res.redirect('/academicPerformance/teachingAssistant');
                })
                .catch(() => {
                    req.flash('error_msg', 'Data not updated. Please try logging in again.');
                    res.redirect('/academicPerformance/teachingAssistant');
                })
        })
        .catch(() => {
            req.flash('error_msg', 'User not found. Please try logging in again.');
            res.redirect('/academicPerformance/teachingAssistant');
        })
});

router.put('/newBooks/:id', (req, res) => {
    NewBooks.findOne({ _id: req.params.id })
        .then(result => {
            result.subject_name = req.body.subject_name,
                result.title = req.body.title,
                result.semester = req.body.semester,
                result.class = req.body.class,
                result.publication = req.body.publication,
                result.author = req.body.author,

                result.save()
                    .then(result => {
                        req.flash('success_msg', 'Data updated successfully');
                        res.redirect('/academicPerformance/newBooks');
                    })
                    .catch(() => {
                        req.flash('error_msg', 'Data not updated. Please try logging in again.');
                        res.redirect('/academicPerformance/newBooks');
                    })
        })
        .catch(() => {
            req.flash('error_msg', 'User not found. Please try logging in again.');
            res.redirect('/academicPerformance/newBooks');
        })
});

router.put('/addedExp/:id', (req, res) => {
    AddedExp.findOne({ _id: req.params.id })
        .then(result => {
            result.subject_name = req.body.subject_name,
                result.class = req.body.class,
                result.semester = req.body.semester,
                result.exp_name = req.body.exp_name

            result.save()
                .then(result => {
                    req.flash('success_msg', 'Data updated successfully');
                    res.redirect('/academicPerformance/addedExp');
                })
                .catch(() => {
                    req.flash('error_msg', 'Data not updated. Please try logging in again.');
                    res.redirect('/academicPerformance/addedExp');
                })
        })
        .catch(() => {
            req.flash('error_msg', 'User not found. Please try logging in again.');
            res.redirect('/academicPerformance/addedExp');
        })
});

router.put('/innovativeTeaching/:id', (req, res) => {
    Innovation.findOne({ _id: req.params.id })
        .then(result => {
            result.subject_name = req.body.subject_name,
                result.class_name = req.body.class_name,
                result.semester = req.body.semester,
                result.technique = req.body.technique

            result.save()
                .then(result => {
                    req.flash('success_msg', 'Data updated successfully');
                    res.redirect('/academicPerformance/innovativeTeaching');
                })
                .catch(() => {
                    req.flash('error_msg', 'Data not updated. Please try logging in again.');
                    res.redirect('/academicPerformance/innovativeTeaching');
                })
        })
        .catch(() => {
            req.flash('error_msg', 'User not found. Please try logging in again.');
            res.redirect('/academicPerformance/innovativeTeaching');
        })
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

router.delete('/teachingAssistant/delete/:id', (req, res) => {
    TeachingAssistant.deleteOne({ _id: req.params.id })
        .then(() => {
            req.flash('success_msg', 'Data deleted successfully');
            res.redirect('/academicPerformance/teachingAssistant');
        })
        .catch(() => {
            req.flash('error_msg', 'User not found. Please try logging in again.');
            res.redirect('/academicPerformance/teachingAssistant');
        })
});

router.delete('/newBooks/delete/:id', (req, res) => {
    NewBooks.deleteOne({ _id: req.params.id })
        .then(() => {
            req.flash('success_msg', 'Data deleted successfully');
            res.redirect('/academicPerformance/newBooks');
        })
        .catch(() => {
            req.flash('error_msg', 'User not found. Please try logging in again.');
            res.redirect('/academicPerformance/newBooks');
        })
});

router.delete('/addedExp/delete/:id', (req, res) => {
    AddedExp.deleteOne({ _id: req.params.id })
        .then(() => {
            req.flash('success_msg', 'Data deleted successfully');
            res.redirect('/academicPerformance/addedExp');
        })
        .catch(() => {
            req.flash('error_msg', 'User not found. Please try logging in again.');
            res.redirect('/academicPerformance/addedExp');
        })
})

router.delete('/innovativeTeaching/delete/:id', (req, res) => {
    Innovation.deleteOne({ _id: req.params.id })
        .then(() => {
            req.flash('success_msg', 'Data deleted successfully');
            res.redirect('/academicPerformance/innovativeTeaching');
        })
        .catch(() => {
            req.flash('error_msg', 'User not found. Please try logging in again.');
            res.redirect('/academicPerformance/innovativeTeaching');
        })
})

module.exports = router;