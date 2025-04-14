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
router.get('/teachingContribution', ensureAuthenticated, async (req, res) => {
    try {
        const academicRecord = await AcademicYear.findOne({ user: req.user.id });
        if (!academicRecord) {
            req.flash('error_msg', 'Academic year not found for the user.');
            return res.redirect('/dashboard');
        }

        const year = academicRecord.academic_year;

        // Fetch the teaching contribution document for the current academic year
        const teachingContribution = await TeachingContribution.findOne({
            user: req.user.id,
            academic_year: year
        });

        // Extract entries and score
        const teachingContributions = teachingContribution ? teachingContribution.entries : [];
        const scoredOne = teachingContribution ? teachingContribution.scoredOne : 0;

        res.render('category-1/teachingContribution', {
            teachingContributions,
            scoredOne,
            academic_year: year
        });
    } catch (error) {
        console.error("Error fetching teaching contributions:", error);
        req.flash('error_msg', 'Error fetching teaching contributions.');
        res.redirect('/');
    }
});





// Load Lectures Excess Route New Added
router.get('/lecturesExcess', ensureAuthenticated, async (req, res) => {
    try {
        const academicRecord = await AcademicYear.findOne({ user: req.user.id });
        if (!academicRecord) {
            req.flash('error_msg', 'Academic year not found for the user.');
            return res.redirect('/dashboard');
        }

        const year = academicRecord.academic_year;

        // Fetch the lectures excess document for the current academic year
        const lecturesExcess = await LecturesExcess.findOne({
            user: req.user.id,
            academic_year: year
        });

        // Extract entries and score
        const lecturesExcessEntries = lecturesExcess ? lecturesExcess.entries : [];
        const scoredTwo = lecturesExcess ? lecturesExcess.scoredTwo : 0;

        res.render('category-1/lecturesExcess', {
            lecturesExcess: lecturesExcessEntries,
            scoredTwo,
            academic_year: year
        });
    } catch (error) {
        console.error("Error fetching lectures excess entries:", error);
        req.flash('error_msg', 'Error fetching lectures excess entries.');
        res.redirect('/');
    }
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



// Lectures Excess Edit Route New Added


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

// Process Teaching Contribution Form New Added
router.post('/teachingContribution', async (req, res) => {
    console.log("Form Data Received:", req.body);
    try {
        const academicRecord = await AcademicYear.findOne({ user: req.user.id });
        if (!academicRecord) {
            req.flash('error_msg', 'Academic year not found for the user.');
            return res.redirect('/category-1/teachingContribution');
        }

        const year = academicRecord.academic_year;

        // Parse array fields properly
        const subjectNames = Array.isArray(req.body['subject_name[]']) ? req.body['subject_name[]'] : [req.body['subject_name[]']];
        const lecturesDelivered = Array.isArray(req.body['lectures_delivered[]']) ? req.body['lectures_delivered[]'] : [req.body['lectures_delivered[]']];
        const lecturesAllocated = Array.isArray(req.body['lectures_allocated[]']) ? req.body['lectures_allocated[]'] : [req.body['lectures_allocated[]']];
        const tutorialsDelivered = Array.isArray(req.body['tutorials_delivered[]']) ? req.body['tutorials_delivered[]'] : [req.body['tutorials_delivered[]']];
        const tutorialsAllocated = Array.isArray(req.body['tutorials_allocated[]']) ? req.body['tutorials_allocated[]'] : [req.body['tutorials_allocated[]']];
        const practicalSessionsDelivered = Array.isArray(req.body['practical_sessions_delivered[]']) ? req.body['practical_sessions_delivered[]'] : [req.body['practical_sessions_delivered[]']];
        const practicalSessionsAllocated = Array.isArray(req.body['practical_sessions_allocated[]']) ? req.body['practical_sessions_allocated[]'] : [req.body['practical_sessions_allocated[]']];
        const scoredOne = req.body.scoredOne;

        // Sanitize scoredOne
        const sanitizedScoredOne = !Number.isNaN(parseInt(scoredOne, 10)) ? parseInt(scoredOne, 10) : 0;

        // Validate scoredOne range
        if (sanitizedScoredOne < 0 || sanitizedScoredOne > 50) {
            req.flash('error_msg', 'The total score must be between 0 and 50.');
            return res.redirect('/category-1/teachingContribution');
        }

        // Map the entries
        let newEntries = subjectNames.map((subjectName, index) => ({
            subject_name: subjectName || '-',
            lectures_delivered: lecturesDelivered[index] ? parseInt(lecturesDelivered[index], 10) : 0,
            lectures_allocated: lecturesAllocated[index] ? parseInt(lecturesAllocated[index], 10) : 0,
            tutorials_delivered: tutorialsDelivered[index] ? parseInt(tutorialsDelivered[index], 10) : 0,
            tutorials_allocated: tutorialsAllocated[index] ? parseInt(tutorialsAllocated[index], 10) : 0,
            practical_sessions_delivered: practicalSessionsDelivered[index] ? parseInt(practicalSessionsDelivered[index], 10) : 0,
            practical_sessions_allocated: practicalSessionsAllocated[index] ? parseInt(practicalSessionsAllocated[index], 10) : 0
        })).filter(entry => entry.subject_name.trim() !== '-'); // Filter out empty entries

        console.log("Processed Entries:", newEntries);

        // Check for an existing document for the user and academic year
        let existingDocument = await TeachingContribution.findOne({
            user: req.user.id,
            academic_year: year
        });

        if (existingDocument) {
            // Merge new entries with existing entries
            const updatedEntries = [...existingDocument.entries];

            newEntries.forEach(newEntry => {
                const existingIndex = updatedEntries.findIndex(e => e.subject_name === newEntry.subject_name);
                if (existingIndex !== -1) {
                    // Update the existing entry
                    updatedEntries[existingIndex] = { ...updatedEntries[existingIndex], ...newEntry };
                } else {
                    // Add the new entry
                    updatedEntries.push(newEntry);
                }
            });

            existingDocument.entries = updatedEntries;
            existingDocument.scoredOne = sanitizedScoredOne; // Update the shared score
            await existingDocument.save();
        } else {
            // Prevent saving if no valid entries exist
            if (newEntries.length === 0) {
                req.flash('error_msg', 'No valid entries to save.');
                return res.redirect('/category-1/teachingContribution');
            }

            // Create a new document
            await new TeachingContribution({
                academic_year: year,
                entries: newEntries,
                scoredOne: sanitizedScoredOne,
                user: req.user.id
            }).save();
        }

        req.flash('success_msg', 'Teaching contribution details saved successfully.');
        res.redirect('/category-1/teachingContribution');

    } catch (err) {
        console.error("Unexpected Error:", err);
        if (err.name === 'ValidationError') {
            req.flash('error_msg', 'Validation error occurred. Please check your input.');
        } else {
            req.flash('error_msg', 'Unexpected error occurred. Please try again.');
        }
        res.redirect('/category-1/teachingContribution');
    }
});

//process Lectures Excess form New Added

router.post('/lecturesExcess', async (req, res) => {
    console.log("Form Data Received:", req.body);
    try {
        const academicRecord = await AcademicYear.findOne({ user: req.user.id });
        if (!academicRecord) {
            req.flash('error_msg', 'Academic year not found for the user.');
            return res.redirect('/category-1/lecturesExcess');
        }

        const year = academicRecord.academic_year;

        // Parse array fields properly
        const subjectNames = Array.isArray(req.body['subject_name[]']) ? req.body['subject_name[]'] : [req.body['subject_name[]']];
        const lecturesTaken = Array.isArray(req.body['lectures_taken[]']) ? req.body['lectures_taken[]'] : [req.body['lectures_taken[]']];
        const tutorialsTaken = Array.isArray(req.body['tutorials_taken[]']) ? req.body['tutorials_taken[]'] : [req.body['tutorials_taken[]']];
        const practicalSessionsTaken = Array.isArray(req.body['practical_sessions_taken[]']) ? req.body['practical_sessions_taken[]'] : [req.body['practical_sessions_taken[]']];
        const scoredTwo = req.body.scoredTwo;

        // Sanitize scoredTwo
        const sanitizedScoredTwo = !Number.isNaN(parseInt(scoredTwo, 10)) ? parseInt(scoredTwo, 10) : 0;

        // Validate scoredTwo range
        if (sanitizedScoredTwo < 0 || sanitizedScoredTwo > 10) {
            req.flash('error_msg', 'The total score must be between 0 and 10.');
            return res.redirect('/category-1/lecturesExcess');
        }

        // Map the entries
        let newEntries = subjectNames.map((subjectName, index) => ({
            subject_name: subjectName || '-',
            lectures_taken: lecturesTaken[index] ? parseInt(lecturesTaken[index], 10) : 0,
            tutorials_taken: tutorialsTaken[index] ? parseInt(tutorialsTaken[index], 10) : 0,
            practical_sessions_taken: practicalSessionsTaken[index] ? parseInt(practicalSessionsTaken[index], 10) : 0
        })).filter(entry => entry.subject_name.trim() !== '-'); // Filter out empty entries

        console.log("Processed Entries:", newEntries);

        // Check for an existing document for the user and academic year
        let existingDocument = await LecturesExcess.findOne({
            user: req.user.id,
            academic_year: year
        });

        if (existingDocument) {
            // Merge new entries with existing entries
            const updatedEntries = [...existingDocument.entries];

            newEntries.forEach(newEntry => {
                const existingIndex = updatedEntries.findIndex(e => e.subject_name === newEntry.subject_name);
                if (existingIndex !== -1) {
                    // Update the existing entry
                    updatedEntries[existingIndex] = { ...updatedEntries[existingIndex], ...newEntry };
                } else {
                    // Add the new entry
                    updatedEntries.push(newEntry);
                }
            });

            existingDocument.entries = updatedEntries;
            existingDocument.scoredTwo = sanitizedScoredTwo; // Update the shared score
            await existingDocument.save();
        } else {
            // Prevent saving if no valid entries exist
            if (newEntries.length === 0) {
                req.flash('error_msg', 'No valid entries to save.');
                return res.redirect('/category-1/lecturesExcess');
            }

            // Create a new document
            await new LecturesExcess({
                academic_year: year,
                entries: newEntries,
                scoredTwo: sanitizedScoredTwo,
                user: req.user.id
            }).save();
        }

        req.flash('success_msg', 'Lectures excess details saved successfully.');
        res.redirect('/category-1/lecturesExcess');

    } catch (err) {
        console.error("Unexpected Error:", err);
        if (err.name === 'ValidationError') {
            req.flash('error_msg', 'Validation error occurred. Please check your input.');
        } else {
            req.flash('error_msg', 'Unexpected error occurred. Please try again.');
        }
        res.redirect('/category-1/lecturesExcess');
    }
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


// Put route lectures excess New Added


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

// New Added DELETE route for Teaching Contribution
router.post('/deleteTeachingContribution', ensureAuthenticated, async (req, res) => {
    const { subject_name } = req.body;

    try {
        const academicRecord = await AcademicYear.findOne({ user: req.user.id });
        if (!academicRecord) {
            return res.json({ success: false, message: "Academic year not found." });
        }
        const academic_year = academicRecord.academic_year;

        // Pull the entry from the entries array
        const updatedEntry = await TeachingContribution.findOneAndUpdate(
            {
                user: req.user.id,
                academic_year: academic_year
            },
            { $pull: { entries: { subject_name: subject_name } } },
            { new: true } // Return the updated document
        );

        if (!updatedEntry) {
            return res.json({ success: false, message: "Teaching contribution not found." });
        }

        // Check if the entries array is empty
        if (!updatedEntry.entries || updatedEntry.entries.length === 0) {
            // Clear the score in the database
            updatedEntry.scoredOne = 0; // Set to null to indicate no score
            await updatedEntry.save();
        }

        res.json({ success: true, message: "Teaching contribution deleted successfully." });

    } catch (error) {
        console.error("Error deleting teaching contribution:", error);
        res.json({ success: false, message: "Server error." });
    }
});


//New Added DELETE route lectures excess
router.post('/deleteLecturesExcess', ensureAuthenticated, async (req, res) => {
    const { subject_name } = req.body;

    try {
        const academicRecord = await AcademicYear.findOne({ user: req.user.id });
        if (!academicRecord) {
            return res.json({ success: false, message: "Academic year not found." });
        }
        const academic_year = academicRecord.academic_year;

        // Pull the entry from the entries array
        const updatedEntry = await LecturesExcess.findOneAndUpdate(
            {
                user: req.user.id,
                academic_year: academic_year
            },
            { $pull: { entries: { subject_name: subject_name } } },
            { new: true } // Return the updated document
        );

        if (!updatedEntry) {
            return res.json({ success: false, message: "Lectures excess entry not found." });
        }

        // Check if the entries array is empty
        if (!updatedEntry.entries || updatedEntry.entries.length === 0) {
            // Clear the score in the database
            updatedEntry.scoredTwo = 0; // Set to 0 to indicate no score
            await updatedEntry.save();
        }

        res.json({ success: true, message: "Lectures excess entry deleted successfully." });

    } catch (error) {
        console.error("Error deleting lectures excess entry:", error);
        res.json({ success: false, message: "Server error." });
    }
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