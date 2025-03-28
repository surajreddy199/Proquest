const express = require('express');
const mongoose = require('mongoose');
const { ensureAuthenticated } = require('../helpers/auth');
const router = express.Router();
const AcademicYear = require('../config/academicYear');
const multer = require('multer');

let year;

// Load Research Papers Published model
require('../models/Annexure-3/ResearchPapersPublished');
const ResearchPapersPublished = mongoose.model('researchpaperspublished');

// Load resource person model
require('../models/Annexure-3/ResourcePerson');
const ResourcePerson = mongoose.model('resource_person');

// Load resource person model
require('../models/Annexure-3//ContributionToSyllabus');
const ContributionToSyllabus = mongoose.model('Contribution_to_Syllabus');

// Load resource person model
require('../models/Annexure-3//MemberOfUniversityCommitte');
const MemberOfUniversityCommitte = mongoose.model('Member_of_University_Commite');

// Load resource person model
require('../models/Annexure-3//ConsultancyAssignment');
const ConsultancyAssignment = mongoose.model('consultancy_assignment');

// Load resource person model
require('../models/Annexure-3/ExternalProjectsOrCompetition');
const ExternalProjectsOrCompetition = mongoose.model('external_projects_or_competition');

// Resourse person load route
router.get('/resourcePerson', ensureAuthenticated, (req, res) => {
    AcademicYear.find({ user: req.user.id })
        .then(result => {
            if (!result) {
                req.flash('error_msg', 'Select the academic year before proceeding');
                res.redirect('/');
            }
            year = result[0].academic_year;
            ResourcePerson.find({ $and: [{ user: req.user.id }, { academic_year: year }] })
                .then(result => {
                    res.render('annexure-3/resourcePerson', { result });
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

// contribute to syllabus load route
router.get('/contributionToSyllabus', ensureAuthenticated, (req, res) => {
    AcademicYear.find({ user: req.user.id })
        .then(result => {
            if (!result) {
                req.flash('error_msg', 'Select the academic year before proceeding');
                res.redirect('/');
            }
            year = result[0].academic_year;
            ContributionToSyllabus.find({ $and: [{ user: req.user.id }, { academic_year: year }] })
                .then(result => {
                    res.render('annexure-3/contributionToSyllabus', { result });
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

// mumber of university load route
router.get('/memberOfUniversityCommitte', ensureAuthenticated, (req, res) => {
    AcademicYear.find({ user: req.user.id })
        .then(result => {
            if (!result) {
                req.flash('error_msg', 'Select the academic year before proceeding');
                res.redirect('/');
            }
            year = result[0].academic_year;
            MemberOfUniversityCommitte.find({ $and: [{ user: req.user.id }, { academic_year: year }] })
                .then(result => {
                    res.render('annexure-3/memberOfUniversityCommitte', { result });
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

// consultancy assignment load route
router.get('/consultancyAssignment', ensureAuthenticated, (req, res) => {
    AcademicYear.find({ user: req.user.id })
        .then(result => {
            if (!result) {
                req.flash('error_msg', 'Select the academic year before proceeding');
                res.redirect('/');
            }
            year = result[0].academic_year;
            ConsultancyAssignment.find({ $and: [{ user: req.user.id }, { academic_year: year }] })
                .then(result => {
                    res.render('annexure-3/consultancyAssignment', { result })
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

// External project load route
router.get('/externalProjectsOrCompetition', ensureAuthenticated, (req, res) => {
    AcademicYear.find({ user: req.user.id })
        .then(result => {
            if (!result) {
                req.flash('error_msg', 'Select the academic year before proceeding');
                res.redirect('/');
            }
            year = result[0].academic_year;
            ExternalProjectsOrCompetition.find({ $and: [{ user: req.user.id }, { academic_year: year }] })
                .then(result => {
                    res.render('annexure-3/externalProjectsOrCompetition', { result });
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

// Load edit Route for Annexure-3
// Resourse person load route
router.get('/resourcePerson/edit/:id', ensureAuthenticated, (req, res) => {
    ResourcePerson.findOne({ _id: req.params.id })
        .then(result => {
            if (result.user != req.user.id) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('/annexure-3/resourcePerson');
            } else {
                res.render('annexure-3/resourcePerson', { editResult: result });
            }
        })
        .catch(() => {
            req.flash('error_msg', 'Error while finding your previous data. Please try again.');
            res.redirect('/annexure-3/resourcePerson');
        })
});

// contribute to syllabus load route
router.get('/contributionToSyllabus/edit/:id', ensureAuthenticated, (req, res) => {
    ContributionToSyllabus.findOne({ _id: req.params.id })
        .then(result => {
            if (result.user != req.user.id) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('/annexure-3/contributionToSyllabus');
            } else {
                res.render('annexure-3/contributionToSyllabus', { editResult: result });
            }
        })
        .catch(() => {
            req.flash('error_msg', 'Error while finding your previous data. Please try again.');
            res.redirect('/annexure-3/contributionToSyllabus');
        })
});

// mumber of university load route
router.get('/memberOfUniversityCommitte/edit/:id', ensureAuthenticated, (req, res) => {
    MemberOfUniversityCommitte.findOne({ _id: req.params.id })
        .then(result => {
            if (result.user != req.user.id) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('/annexure-3/contributionToSyllabus');
            } else {
                res.render('annexure-3/memberOfUniversityCommitte', { editResult: result });
            }
        })
        .catch(() => {
            req.flash('error_msg', 'Error while finding your previous data. Please try again.');
            res.redirect('/annexure-3/memberOfUniversityCommitte');
        })
});

// consultancy assignment load route
router.get('/consultancyAssignment/edit/:id', ensureAuthenticated, (req, res) => {
    ConsultancyAssignment.findOne({ _id: req.params.id })
        .then(result => {
            if (result.user != req.user.id) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('/annexure-3/consultancyAssignment');
            } else {
                res.render('annexure-3/consultancyAssignment', { editResult: result });
            }
        })
        .catch(() => {
            req.flash('error_msg', 'Error while finding your previous data. Please try again.');
            res.redirect('/annexure-3/consultancyAssignment');
        })
});

// External project load route
router.get('/externalProjectsOrCompetition/edit/:id', ensureAuthenticated, (req, res) => {
    ExternalProjectsOrCompetition.findOne({ _id: req.params.id })
        .then(result => {
            if (result.user != req.user.id) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('/annexure-3/externalProjectsOrCompetition');
            } else {
                res.render('annexure-3/externalProjectsOrCompetition', { editResult: result });
            }
        })
        .catch(() => {
            req.flash('error_msg', 'Error while finding your previous data. Please try again.');
            res.redirect('/annexure-3/externalProjectsOrCompetition');
        })
});


// Processing resource person form
router.post('/resourcePerson', (req, res) => {
    let errors = [];

    if (!req.body.numberofParticipants || req.body.numberofParticipants < 0) {
        errors.push({ text: 'Participants cannot be less than 0' });
    }
    if (errors.length > 0) {
        res.render('annexure-3/resourcePerson', {
            errors: errors,
            topicName: req.body.topicName,
            department: req.body.department,
            nameofInstitute: req.body.nameofInstitute,
            numberofParticipants: req.body.numberofParticipants
        }
        )
    }
    else {
        // add preleave data into db
        const resourcePerson = {
            academic_year: year,
            topicName: req.body.topicName,
            department: req.body.department,
            nameofInstitute: req.body.nameofInstitute,
            numberofParticipants: req.body.numberofParticipants,
            user: req.user.id
        }
        new ResourcePerson(resourcePerson)
            .save()
            .then(resourcePersonRecords => {
                req.flash('success_msg', 'Data entered successfully');
                res.redirect('/annexure-3/contributionToSyllabus');
            })
            .catch(err => {
                console.log(err);
                req.flash('error_msg', 'faculty ID not found please login again.');
                res.redirect('/annexure-3/resourcePerson');
            })
    }
});

// Processing contribution to syllabus form
router.post('/contributionToSyllabus', (req, res) => {

    // add preleave data into db
    const contributionToSyllabus = {
        academic_year: year,
        nameofSub: req.body.nameofSub,
        role: req.body.role,
        nameofUniversity: req.body.nameofUniversity,
        otherDetails: req.body.otherDetails,
        user: req.user.id
    }
    new ContributionToSyllabus(contributionToSyllabus)
        .save()
        .then(contributionToSyllabusRecords => {
            req.flash('success_msg', 'Data entered successfully');
            res.redirect('/annexure-3/memberOfUniversityCommitte');
        })
        .catch(err => {
            console.log(err);
            req.flash('error_msg', 'faculty ID not found please login again.');
            res.redirect('/annexure-3/contributionToSyllabus');
        })
});

// Processing member of university committe form
router.post('/memberOfUniversityCommitte', (req, res) => {
    // add preleave data into db
    const memberOfUniversityCommitte = {
        academic_year: year,
        nameofCommittee: req.body.nameofCommittee,
        rolesAndResponsibility: req.body.rolesAndResponsibility,
        designation: req.body.designation,
        user: req.user.id
    }
    new MemberOfUniversityCommitte(memberOfUniversityCommitte)
        .save()
        .then(memberOfUniversityCommitteRecords => {
            req.flash('success_msg', 'Data entered successfully');
            res.redirect('/annexure-3/consultancyAssignment');
        })
        .catch(err => {
            console.log(err);
            req.flash('error_msg', 'faculty ID not found please login again.');
            res.redirect('/annexure-3/memberOfUniversityCommitte');
        })
});

// Processing consultancy assignment form
router.post('/consultancyAssignment', (req, res) => {
    let errors = [];

    if (!req.body.duration || req.body.duration < 0) {
        errors.push({ text: 'Duration cannot be less than 0' });
    }
    else if (!req.body.numberofVisits || req.body.numberofVisits < 0) {
        errors.push({ text: 'Number of visit cannot be less than 0' });
    }
    if (errors.length > 0) {
        res.render('annexure-3/consultancyAssignment', {
            errors: errors,
            rolesAndResponsilbilty: req.body.rolesAndResponsilbilty,
            typeOfWorkorDomain: req.body.typeOfWorkorDomain,
            organization: req.body.organization,
            duration: req.body.duration,
            numberofVisits: req.body.numberofVisits,
        }
        )
    }
    else {
        // add preleave data into db
        const consultancyAssignment = {
            academic_year: year,
            rolesAndResponsilbilty: req.body.rolesAndResponsilbilty,
            typeOfWorkorDomain: req.body.typeOfWorkorDomain,
            organization: req.body.organization,
            duration: req.body.duration,
            numberofVisits: req.body.numberofVisits,
            user: req.user.id
        }
        new ConsultancyAssignment(consultancyAssignment)
            .save()
            .then(consultancyAssignmentRecords => {
                req.flash('success_msg', 'Data entered successfully');
                res.redirect('/annexure-3/externalProjectsOrCompetition');
            })
            .catch(err => {
                console.log(err);
                req.flash('error_msg', 'faculty ID not found please login again.');
                res.redirect('/annexure-3/consultancyAssignment');
            })
    }
});

// Processing external projects or competitions form
router.post('/externalProjectsOrCompetition', (req, res) => {
    let errors = [];

    if (!req.body.duration || req.body.duration < 0) {
        errors.push({ text: 'Duration cannot be less than 0' });
    }
    if (errors.length > 0) {
        res.render('annexure-3/externalProjectsOrCompetition', {
            errors: errors,
            description: req.body.description,
            contribution: req.body.contribution,
            university: req.body.university,
            duration: req.body.duration,
            comments: req.body.comments
        }
        )
    }
    else {
        // add preleave data into db
        const externalProjectsOrCompetition = {
            academic_year: year,
            description: req.body.description,
            contribution: req.body.contribution,
            university: req.body.university,
            duration: req.body.duration,
            comments: req.body.comments,
            user: req.user.id
        }
        new ExternalProjectsOrCompetition(externalProjectsOrCompetition)
            .save()
            .then(externalProjectsOrCompetitionRecords => {
                req.flash('success_msg', 'Data entered successfully');
                res.redirect('/users/faculty/facultyOverview');
            })
            .catch(err => {
                console.log(err);
                req.flash('error_msg', 'faculty ID not found please login again.');
                res.redirect('/annexure-3/externalProjectsOrCompetition');
            })
    }
});

// PUT request Route
router.put('/resourcePerson/:id', (req, res) => {
    let errors = [];
    if (!req.body.numberofParticipants || req.body.numberofParticipants < 0) {
        errors.push({ text: 'Participants cannot be less than 0' });
    }
    if (errors.length > 0) {

        if (!req.body.numberofParticipants || req.body.numberofParticipants < 0) {
            req.flash('error_msg', 'Participants cannot be less than 0');
            res.redirect('/annexure-3/resourcePerson');
        }
    }
    else {
        ResourcePerson.findOne({ _id: req.params.id })
            .then(result => {
                result.topicName = req.body.topicName,
                    result.department = req.body.department,
                    result.nameofInstitute = req.body.nameofInstitute,
                    result.numberofParticipants = req.body.numberofParticipants

                result.save()
                    .then(() => {
                        req.flash('success_msg', 'Data updated Successfully');
                        res.redirect('/annexure-3/resourcePerson');
                    })
                    .catch(() => {
                        req.flash('error_msg', 'Data not updated. Please try logging in again.');
                        res.redirect('/annexure-3/resourcePerson');
                    })
            })
            .catch(() => {
                req.flash('error_msg', 'User not found. Please try logging in again.');
                res.redirect('/annexure-3/resourcePerson');
            })
    }
});

router.put('/contributionToSyllabus/:id', (req, res) => {
    ContributionToSyllabus.findOne({ _id: req.params.id })
        .then(result => {
            result.nameofSub = req.body.nameofSub,
                result.role = req.body.role,
                result.nameofUniversity = req.body.nameofUniversity,
                result.otherDetails = req.body.otherDetails

            result.save()
                .then(() => {
                    req.flash('success_msg', 'Data updated Successfully');
                    res.redirect('/annexure-3/contributionToSyllabus');
                })
                .catch(() => {
                    req.flash('error_msg', 'Data not updated. Please try logging in again.');
                    res.redirect('/annexure-3/contributionToSyllabus');
                })
        })
        .catch(() => {
            req.flash('error_msg', 'User not found. Please try logging in again.');
            res.redirect('/annexure-3/contributionToSyllabus');
        })
});

router.put('/memberOfUniversityCommitte/:id', (req, res) => {
    MemberOfUniversityCommitte.findOne({ _id: req.params.id })
        .then(result => {
            result.nameofCommittee = req.body.nameofCommittee,
                result.rolesAndResponsibility = req.body.rolesAndResponsibility,
                result.designation = req.body.designation

            result.save()
                .then(() => {
                    req.flash('success_msg', 'Data updated Successfully');
                    res.redirect('/annexure-3/memberOfUniversityCommitte');
                })
                .catch(() => {
                    req.flash('error_msg', 'Data not updated. Please try logging in again.');
                    res.redirect('/annexure-3/memberOfUniversityCommitte');
                })
        })
        .catch(() => {
            req.flash('error_msg', 'User not found. Please try logging in again.');
            res.redirect('/annexure-3/memberOfUniversityCommitte');
        })
});

router.put('/consultancyAssignment/:id', (req, res) => {
    let errors = [];
    if (!req.body.duration || req.body.duration < 0) {
        errors.push({ text: 'Duration cannot be less than 0' });
    }
    else if (!req.body.numberofVisits || req.body.numberofVisits < 0) {
        errors.push({ text: 'Number of visit cannot be less than 0' });
    }
    if (errors.length > 0) {

        if (!req.body.duration || req.body.duration < 0) {
            req.flash('error_msg', 'Duration cannot be less than 0');
            res.redirect('/annexure-3/consultancyAssignment');
        }
        else if (!req.body.numberofVisits || req.body.numberofVisits < 0) {
            req.flash('error_msg', 'Number of visit cannot be less than 0');
            res.redirect('/annexure-3/consultancyAssignment');
        }
    }
    else {
        ConsultancyAssignment.findOne({ _id: req.params.id })
            .then(result => {
                result.rolesAndResponsilbilty = req.body.rolesAndResponsilbilty,
                    result.typeOfWorkorDomain = req.body.typeOfWorkorDomain,
                    result.organization = req.body.organization,
                    result.duration = req.body.duration,
                    result.numberofVisits = req.body.numberofVisits

                result.save()
                    .then(() => {
                        req.flash('success_msg', 'Data updated Successfully');
                        res.redirect('/annexure-3/consultancyAssignment');
                    })
                    .catch(() => {
                        req.flash('error_msg', 'Data not updated. Please try logging in again.');
                        res.redirect('/annexure-3/consultancyAssignment');
                    })
            })
            .catch(() => {
                req.flash('error_msg', 'User not found. Please try logging in again.');
                res.redirect('/annexure-3/consultancyAssignment');
            })
    }
});

router.put('/externalProjectsOrCompetition/:id', (req, res) => {
    let errors = [];
    if (!req.body.duration || req.body.duration < 0) {
        errors.push({ text: 'Duration cannot be less than 0' });
    }
    if (errors.length > 0) {

        if (!req.body.duration || req.body.duration < 0) {
            req.flash('error_msg', 'Duration cannot be less than 0');
            res.redirect('/annexure-3/externalProjectsOrCompetition');
        }
    }
    else {
        ExternalProjectsOrCompetition.findOne({ _id: req.params.id })
            .then(result => {
                result.description = req.body.description,
                    result.contribution = req.body.contribution,
                    result.university = req.body.university,
                    result.duration = req.body.duration,
                    result.comments = req.body.comments

                result.save()
                    .then(() => {
                        req.flash('success_msg', 'Data updated Successfully');
                        res.redirect('/annexure-3/externalProjectsOrCompetition');
                    })
                    .catch(() => {
                        req.flash('error_msg', 'Data not updated. Please try logging in again.');
                        res.redirect('/annexure-3/externalProjectsOrCompetition');
                    })
            })
            .catch(() => {
                req.flash('error_msg', 'User not found. Please try logging in again.');
                res.redirect('/annexure-3/externalProjectsOrCompetition');
            })
    }
});

// Delete Route
router.delete('/resourcePerson/delete/:id', (req, res) => {
    ResourcePerson.deleteOne({ _id: req.params.id })
        .then(() => {
            req.flash('success_msg', 'Data is deleted successfully');
            res.redirect('/annexure-3/resourcePerson');
        })
        .catch(() => {
            req.flash('error_msg', 'User not found. Please try logging in again.');
            res.redirect('/annexure-3/resourcePerson');
        })
});

router.delete('/contributionToSyllabus/delete/:id', (req, res) => {
    ContributionToSyllabus.deleteOne({ _id: req.params.id })
        .then(() => {
            req.flash('success_msg', 'Data is deleted successfully');
            res.redirect('/annexure-3/contributionToSyllabus');
        })
        .catch(() => {
            req.flash('error_msg', 'User not found. Please try logging in again.');
            res.redirect('/annexure-3/contributionToSyllabus');
        })
});

router.delete('/memberOfUniversityCommitte/delete/:id', (req, res) => {
    MemberOfUniversityCommitte.deleteOne({ _id: req.params.id })
        .then(() => {
            req.flash('success_msg', 'Data is deleted successfully');
            res.redirect('/annexure-3/memberOfUniversityCommitte');
        })
        .catch(() => {
            req.flash('error_msg', 'User not found. Please try logging in again.');
            res.redirect('/annexure-3/memberOfUniversityCommitte');
        })
});

router.delete('/consultancyAssignment/delete/:id', (req, res) => {
    ConsultancyAssignment.deleteOne({ _id: req.params.id })
        .then(() => {
            req.flash('success_msg', 'Data is deleted successfully');
            res.redirect('/annexure-3/consultancyAssignment');
        })
        .catch(() => {
            req.flash('error_msg', 'User not found. Please try logging in again.');
            res.redirect('/annexure-3/consultancyAssignment');
        })
});

router.delete('/externalProjectsOrCompetition/delete/:id', (req, res) => {
    ExternalProjectsOrCompetition.deleteOne({ _id: req.params.id })
        .then(() => {
            req.flash('success_msg', 'Data is deleted successfully');
            res.redirect('/annexure-3/externalProjectsOrCompetition');
        })
        .catch(() => {
            req.flash('error_msg', 'User not found. Please try logging in again.');
            res.redirect('/annexure-3/externalProjectsOrCompetition');
        })
});



//testing 




// Configure Multer Storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Save files to "uploads" directory
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage });



//new post method
router.post('/researchPapersPublished', upload.array("journal_document[]"), async (req, res) => {

    try {
        const academicRecord = await AcademicYear.findOne({ user: req.user.id });
        if (!academicRecord) {
            req.flash('error_msg', 'Academic year not found for the user.');
            return res.redirect('/annexure-3/researchPapersPublished');
        }
        const year = academicRecord.academic_year;

        const publicationType = Array.isArray(req.body.publication_type) ? req.body.publication_type[0] : req.body.publication_type;
        const journalTitles = Array.isArray(req.body.journal_title) ? req.body.journal_title : [req.body.journal_title];
        const publicationLinks = Array.isArray(req.body.publication_link) ? req.body.publication_link : [req.body.publication_link];
        const existingDocs = Array.isArray(req.body.journal_document_existing) ? req.body.journal_document_existing : [req.body.journal_document_existing];

        let existingEntry = await ResearchPapersPublished.findOne({
            user: req.user.id,
            academic_year: year,
            publication_type: publicationType
        });
        let fileIndex = 0; // Track files separately from journal index

        let newJournals = journalTitles.map((title, index) => {
            let documentPath = existingDocs[index] || null; // Keep existing files

            // Assign new files only to the correct indexes (journal 03 and 04)
            if (!existingDocs[index] && fileIndex < req.files.length) {
                  documentPath = req.files[fileIndex].path.replace(/\\/g, '/');
                  fileIndex++; // Move to the next file
            }

            return {  
                journal_title: title || '-',
                publication_link: publicationLinks[index] || '-',
                journal_document: documentPath,
                score: publicationType === 'refereed' ? 15 : 10
             };
            });


        
        

        if (existingEntry) {
            let updatedJournals = existingEntry.journals.map(existing => {
                let updated = newJournals.find(j => j.journal_title === existing.journal_title);
                return updated ? updated : existing;
            });

            let newUniqueJournals = newJournals.filter(j => 
                !existingEntry.journals.some(existing => existing.journal_title === j.journal_title)
            );

            existingEntry.journals = [...updatedJournals, ...newUniqueJournals];
            existingEntry.total_score = existingEntry.journals.reduce((sum, journal) => sum + journal.score, 0);
            await existingEntry.save();
        } else {
            await new ResearchPapersPublished({
                academic_year: year,
                publication_type: publicationType,
                journals: newJournals,
                total_score: newJournals.reduce((sum, journal) => sum + journal.score, 0),
                user: req.user.id
            }).save();
        }

        req.flash('success_msg', 'Research paper details saved successfully.');
        res.redirect('/annexure-3/researchPapersPublished');

    } catch (err) {
        console.error("Unexpected Error:", err);
        req.flash('error_msg', 'Unexpected error occurred.');
        res.redirect('/annexure-3/researchPapersPublished');
    }
});

router.get('/researchPapersPublished', ensureAuthenticated, async (req, res) => {
    try {
        // Fetch the academic year for the logged-in user
        const academicRecord = await AcademicYear.findOne({ user: req.user.id });
        if (!academicRecord) {
            req.flash('error_msg', 'Academic year not found for the user.');
            return res.redirect('/dashboard'); // Redirect if academic year is not set
        }

        const year = academicRecord.academic_year; // Get stored academic year

        // Fetch research papers for the logged-in user and selected academic year
        const researchPapers = await ResearchPapersPublished.find({
            user: req.user.id,
            academic_year: year
        });

        res.render('annexure-3/researchPapersPublished', { 
            researchPapers, 
            academic_year: year // Pass the year to the frontend
        });
    } catch (error) {
        console.error("Error fetching research papers:", error);
        req.flash('error_msg', 'Error fetching research papers.');
        res.redirect('/');
    }
});


// old one
// router.get('/researchPapersPublished', ensureAuthenticated, (req, res) => {
//     // console.log("User ID from request:", req.user?.id);  // Log User ID

//     ResearchPapersPublished.find({ user: req.user.id })
//         .then(researchPapers => {
//             // console.log("Fetched Data:", researchPapers);  // Log Fetched Data
            
//             res.render('annexure-3/researchPapersPublished', { researchPapers });
//         })
//         .catch(error => {
//             console.error("Error fetching research papers:", error);
//             req.flash('error_msg', 'Error fetching research papers.');
//             res.redirect('/');
//         });
// });

router.post('/deleteJournal', ensureAuthenticated, async (req, res) => {
    const { publication_type, journal_title } = req.body;

    try {

        // ✅ Fetch the academic year for the logged-in user
        const academicRecord = await AcademicYear.findOne({ user: req.user.id });
        if (!academicRecord) {
            return res.json({ success: false, message: "Academic year not found." });
        }
        const academic_year = academicRecord.academic_year;

        const updatedEntry = await ResearchPapersPublished.findOneAndUpdate(
            { 
                user: req.user.id, 
                publication_type: publication_type,
                academic_year: academic_year
            },
            { $pull: { journals: { journal_title: journal_title } } },
            { new: true }
        );

        if (!updatedEntry) {
            return res.json({ success: false, message: "Journal not found." });
        }
        // **Recalculate total score after deletion**
        const newTotalScore = updatedEntry.journals.reduce((sum, journal) => sum + journal.score, 0);
     
        updatedEntry.total_score = newTotalScore;
        await updatedEntry.save();

        res.json({ success: true, message: "Journal deleted successfully.", newTotalScore });

    } catch (error) {
        console.error("Error deleting journal:", error);
        res.json({ success: false, message: "Server error." });
    }
});






module.exports = router;