const express = require('express');
const mongoose = require('mongoose');
const { ensureAuthenticated } = require('../helpers/auth');
const router = express.Router();
const AcademicYear = require('../config/academicYear');
const multer = require('multer');

let year;

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
                    res.render('category-3/contributionToSyllabus', { result });
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
                    res.render('category-3/memberOfUniversityCommitte', { result });
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
                    res.render('category-3/consultancyAssignment', { result })
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
                    res.render('category-3/externalProjectsOrCompetition', { result });
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
router.get('/contributionToSyllabus/edit/:id', ensureAuthenticated, (req, res) => {
    ContributionToSyllabus.findOne({ _id: req.params.id })
        .then(result => {
            if (result.user != req.user.id) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('/category-3/contributionToSyllabus');
            } else {
                res.render('category-3/contributionToSyllabus', { editResult: result });
            }
        })
        .catch(() => {
            req.flash('error_msg', 'Error while finding your previous data. Please try again.');
            res.redirect('/category-3/contributionToSyllabus');
        })
});

// mumber of university load route
router.get('/memberOfUniversityCommitte/edit/:id', ensureAuthenticated, (req, res) => {
    MemberOfUniversityCommitte.findOne({ _id: req.params.id })
        .then(result => {
            if (result.user != req.user.id) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('/category-3/contributionToSyllabus');
            } else {
                res.render('category-3/memberOfUniversityCommitte', { editResult: result });
            }
        })
        .catch(() => {
            req.flash('error_msg', 'Error while finding your previous data. Please try again.');
            res.redirect('/category-3/memberOfUniversityCommitte');
        })
});

// consultancy assignment load route
router.get('/consultancyAssignment/edit/:id', ensureAuthenticated, (req, res) => {
    ConsultancyAssignment.findOne({ _id: req.params.id })
        .then(result => {
            if (result.user != req.user.id) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('/category-3/consultancyAssignment');
            } else {
                res.render('category-3/consultancyAssignment', { editResult: result });
            }
        })
        .catch(() => {
            req.flash('error_msg', 'Error while finding your previous data. Please try again.');
            res.redirect('/category-3/consultancyAssignment');
        })
});

// External project load route
router.get('/externalProjectsOrCompetition/edit/:id', ensureAuthenticated, (req, res) => {
    ExternalProjectsOrCompetition.findOne({ _id: req.params.id })
        .then(result => {
            if (result.user != req.user.id) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('/category-3/externalProjectsOrCompetition');
            } else {
                res.render('category-3/externalProjectsOrCompetition', { editResult: result });
            }
        })
        .catch(() => {
            req.flash('error_msg', 'Error while finding your previous data. Please try again.');
            res.redirect('/category-3/externalProjectsOrCompetition');
        })
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
            res.redirect('/category-3/memberOfUniversityCommitte');
        })
        .catch(err => {
            console.log(err);
            req.flash('error_msg', 'faculty ID not found please login again.');
            res.redirect('/category-3/contributionToSyllabus');
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
            res.redirect('/category-3/consultancyAssignment');
        })
        .catch(err => {
            console.log(err);
            req.flash('error_msg', 'faculty ID not found please login again.');
            res.redirect('/category-3/memberOfUniversityCommitte');
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
        res.render('category-3/consultancyAssignment', {
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
                res.redirect('/category-3/externalProjectsOrCompetition');
            })
            .catch(err => {
                console.log(err);
                req.flash('error_msg', 'faculty ID not found please login again.');
                res.redirect('/category-3/consultancyAssignment');
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
        res.render('category-3/externalProjectsOrCompetition', {
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
                res.redirect('/category-3/externalProjectsOrCompetition');
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
                    res.redirect('/category-3/contributionToSyllabus');
                })
                .catch(() => {
                    req.flash('error_msg', 'Data not updated. Please try logging in again.');
                    res.redirect('/category-3/contributionToSyllabus');
                })
        })
        .catch(() => {
            req.flash('error_msg', 'User not found. Please try logging in again.');
            res.redirect('/category-3/contributionToSyllabus');
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
                    res.redirect('/category-3/memberOfUniversityCommitte');
                })
                .catch(() => {
                    req.flash('error_msg', 'Data not updated. Please try logging in again.');
                    res.redirect('/category-3/memberOfUniversityCommitte');
                })
        })
        .catch(() => {
            req.flash('error_msg', 'User not found. Please try logging in again.');
            res.redirect('/category-3/memberOfUniversityCommitte');
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
            res.redirect('/category-3/consultancyAssignment');
        }
        else if (!req.body.numberofVisits || req.body.numberofVisits < 0) {
            req.flash('error_msg', 'Number of visit cannot be less than 0');
            res.redirect('/category-3/consultancyAssignment');
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
                        res.redirect('/category-3/consultancyAssignment');
                    })
                    .catch(() => {
                        req.flash('error_msg', 'Data not updated. Please try logging in again.');
                        res.redirect('/category-3/consultancyAssignment');
                    })
            })
            .catch(() => {
                req.flash('error_msg', 'User not found. Please try logging in again.');
                res.redirect('/category-3/consultancyAssignment');
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
            res.redirect('/category-3/externalProjectsOrCompetition');
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
                        res.redirect('/category-3/externalProjectsOrCompetition');
                    })
                    .catch(() => {
                        req.flash('error_msg', 'Data not updated. Please try logging in again.');
                        res.redirect('/category-3/externalProjectsOrCompetition');
                    })
            })
            .catch(() => {
                req.flash('error_msg', 'User not found. Please try logging in again.');
                res.redirect('/category-3/externalProjectsOrCompetition');
            })
    }
});

// Delete Route


router.delete('/contributionToSyllabus/delete/:id', (req, res) => {
    ContributionToSyllabus.deleteOne({ _id: req.params.id })
        .then(() => {
            req.flash('success_msg', 'Data is deleted successfully');
            res.redirect('/category-3/contributionToSyllabus');
        })
        .catch(() => {
            req.flash('error_msg', 'User not found. Please try logging in again.');
            res.redirect('/category-3/contributionToSyllabus');
        })
});

router.delete('/memberOfUniversityCommitte/delete/:id', (req, res) => {
    MemberOfUniversityCommitte.deleteOne({ _id: req.params.id })
        .then(() => {
            req.flash('success_msg', 'Data is deleted successfully');
            res.redirect('/category-3/memberOfUniversityCommitte');
        })
        .catch(() => {
            req.flash('error_msg', 'User not found. Please try logging in again.');
            res.redirect('/category-3/memberOfUniversityCommitte');
        })
});

router.delete('/consultancyAssignment/delete/:id', (req, res) => {
    ConsultancyAssignment.deleteOne({ _id: req.params.id })
        .then(() => {
            req.flash('success_msg', 'Data is deleted successfully');
            res.redirect('/category-3/consultancyAssignment');
        })
        .catch(() => {
            req.flash('error_msg', 'User not found. Please try logging in again.');
            res.redirect('/category-3/consultancyAssignment');
        })
});

router.delete('/externalProjectsOrCompetition/delete/:id', (req, res) => {
    ExternalProjectsOrCompetition.deleteOne({ _id: req.params.id })
        .then(() => {
            req.flash('success_msg', 'Data is deleted successfully');
            res.redirect('/category-3/externalProjectsOrCompetition');
        })
        .catch(() => {
            req.flash('error_msg', 'User not found. Please try logging in again.');
            res.redirect('/category-3/externalProjectsOrCompetition');
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



//Research Papers Published post method
router.post('/researchPapersPublished', upload.array("journal_document[]"), async (req, res) => {

    try {
        const academicRecord = await AcademicYear.findOne({ user: req.user.id });
        if (!academicRecord) {
            req.flash('error_msg', 'Academic year not found for the user.');
            return res.redirect('/category-3/researchPapersPublished');
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
        res.redirect('/category-3/researchPapersPublished');

    } catch (err) {
        console.error("Unexpected Error:", err);
        req.flash('error_msg', 'Unexpected error occurred.');
        res.redirect('/category-3/researchPapersPublished');
    }
});


// Books/Chapters Published post method
router.post('/booksChaptersPublished', upload.array("document[]"), async (req, res) => {
    try {
        const academicRecord = await AcademicYear.findOne({ user: req.user.id });
        if (!academicRecord) {
            req.flash('error_msg', 'Academic year not found for the user.');
            return res.redirect('/category-3/booksChaptersPublished');
        }
        const year = academicRecord.academic_year;

        const publicationType = Array.isArray(req.body.publication_type) ? req.body.publication_type[0] : req.body.publication_type;
        
        const titles = Array.isArray(req.body.title) ? req.body.title : [req.body.title];
        const publicationLinks = Array.isArray(req.body.publication_link) ? req.body.publication_link : [req.body.publication_link];
        const existingDocs = Array.isArray(req.body.document_existing) ? req.body.document_existing : [req.body.document_existing];

        let existingEntry = await BooksChaptersPublished.findOne({
            user: req.user.id,
            academic_year: year,
            publication_type: publicationType
        });

        let fileIndex = 0; // Track files separately from titles index

        let newEntries = titles.map((title, index) => {
            let documentPath = existingDocs[index] || null; // Keep existing files

            if (!existingDocs[index] && fileIndex < req.files.length) {
                documentPath = req.files[fileIndex].path.replace(/\\/g, '/');
                fileIndex++; // Move to the next file
            }

            return {
                title: title || '-',
                publication_link: publicationLinks[index] || '-',
                document: documentPath,
                score: publicationType === 'text_reference_book_international' ? 50 :
                       publicationType === 'chapter_edited_book_international' ? 10 :
                       publicationType === 'subject_book_national' ? 25 :
                       publicationType === 'chapter_edited_book_national' ? 5 :
                       publicationType === 'subject_book_local' ? 15 :
                       publicationType === 'chapter_edited_book_local' ? 3 :
                       publicationType === 'chapter_knowledge_volume_international' ? 10 :
                       publicationType === 'chapter_knowledge_volume_national' ? 5 : 0
            };
        });

        if (existingEntry) {
            let updatedEntries = existingEntry.entries.map(existing => {
                let updated = newEntries.find(e => e.title === existing.title);
                return updated ? updated : existing;
            });

            let newUniqueEntries = newEntries.filter(e =>
                !existingEntry.entries.some(existing => existing.title === e.title)
            );

            existingEntry.entries = [...updatedEntries, ...newUniqueEntries];
            existingEntry.booksChaptersTotalScore = existingEntry.entries.reduce((sum, entry) => sum + entry.score, 0);
            await existingEntry.save();
        } else {
            await new BooksChaptersPublished({
                academic_year: year,
                publication_type: publicationType,
                entries: newEntries,
                booksChaptersTotalScore: newEntries.reduce((sum, entry) => sum + entry.score, 0),
                user: req.user.id
            }).save();
        }

        req.flash('success_msg', 'Books/Chapters details saved successfully.');
        res.redirect('/category-3/booksChaptersPublished');

    } catch (err) {
        console.error("Unexpected Error:", err);
        req.flash('error_msg', 'Unexpected error occurred.');
        res.redirect('/category-3/booksChaptersPublished');
    }
});

// Sponsored Projects post method
router.post('/sponsoredProjects', upload.array("document[]"), async (req, res) => {
    try {
        const academicRecord = await AcademicYear.findOne({ user: req.user.id });
        if (!academicRecord) {
            req.flash('error_msg', 'Academic year not found for the user.');
            return res.redirect('/category-3/sponsoredProjects');
        }
        const year = academicRecord.academic_year;

        const projectType = Array.isArray(req.body.project_type) ? req.body.project_type[0] : req.body.project_type;
        const titles = Array.isArray(req.body.title) ? req.body.title : [req.body.title];
        const fundingAgencies = Array.isArray(req.body.funding_agency) ? req.body.funding_agency : [req.body.funding_agency];
        const amounts = Array.isArray(req.body.amount) ? req.body.amount : [req.body.amount];
        const existingDocs = Array.isArray(req.body.document_existing) ? req.body.document_existing : [req.body.document_existing];

        console.log(req.body);

        let existingEntry = await SponsoredProjects.findOne({
            user: req.user.id,
            academic_year: year,
            project_type: projectType
        });

        let fileIndex = 0;

        let newEntries = titles.map((title, index) => {
            let documentPath = existingDocs[index] || null;

            if (!existingDocs[index] && fileIndex < req.files.length) {
                documentPath = req.files[fileIndex].path.replace(/\\/g, '/');
                fileIndex++;
            }

            return {
                title: title || '-',
                funding_agency: fundingAgencies[index] || '-',
                amount: amounts[index] || 0,
                document: documentPath,
                score: projectType === 'major_above_30_lakhs' ? 20 :
                       projectType === 'major_5_to_30_lakhs' ? 15 :
                       projectType === 'minor_50k_to_5_lakhs' ? 10 : 0
            };
        });

        if (existingEntry) {
            let updatedEntries = existingEntry.entries.map(existing => {
                let updated = newEntries.find(e => e.title === existing.title);
                return updated ? updated : existing;
            });

            let newUniqueEntries = newEntries.filter(e =>
                !existingEntry.entries.some(existing => existing.title === e.title)
            );

            existingEntry.entries = [...updatedEntries, ...newUniqueEntries];
            existingEntry.sponsoredProjectsTotalScore = existingEntry.entries.reduce((sum, entry) => sum + entry.score, 0);
            await existingEntry.save();
        } else {
            await new SponsoredProjects({
                academic_year: year,
                project_type: projectType,
                entries: newEntries,
                sponsoredProjectsTotalScore: newEntries.reduce((sum, entry) => sum + entry.score, 0),
                user: req.user.id
            }).save();
        }

        req.flash('success_msg', 'Sponsored projects details saved successfully.');
        res.redirect('/category-3/sponsoredProjects');

    } catch (err) {
        console.error("Unexpected Error:", err);
        req.flash('error_msg', 'Unexpected error occurred.');
        res.redirect('/category-3/sponsoredProjects');
    }
});

// Consultancy Projects post method
router.post('/consultancyProjects', upload.array("document[]"), async (req, res) => {
    try {
        const academicRecord = await AcademicYear.findOne({ user: req.user.id });
        if (!academicRecord) {
            req.flash('error_msg', 'Academic year not found for the user.');
            return res.redirect('/category-3/consultancyProjects');
        }
        const year = academicRecord.academic_year;

        const titles = Array.isArray(req.body.title) ? req.body.title : [req.body.title];
        const fundingAgencies = Array.isArray(req.body.funding_agency) ? req.body.funding_agency : [req.body.funding_agency];
        const amounts = Array.isArray(req.body.amount) ? req.body.amount : [req.body.amount];
        const existingDocs = Array.isArray(req.body.document_existing) ? req.body.document_existing : [req.body.document_existing];

        let existingEntry = await ConsultancyProjects.findOne({
            user: req.user.id,
            academic_year: year
        });

        let fileIndex = 0;

        let newEntries = titles.map((title, index) => {
            let documentPath = existingDocs[index] || null;

            if (!existingDocs[index] && fileIndex < req.files.length) {
                documentPath = req.files[fileIndex].path.replace(/\\/g, '/');
                fileIndex++;
            }

            return {
                title: title || '-',
                funding_agency: fundingAgencies[index] || '-',
                amount: amounts[index] || 0,
                document: documentPath,
                score: Math.floor((amounts[index] || 0) / 200000) * 10 // Calculate score dynamically
            };
        });

        if (existingEntry) {
            let updatedEntries = existingEntry.entries.map(existing => {
                let updated = newEntries.find(e => e.title === existing.title);
                return updated ? updated : existing;
            });

            let newUniqueEntries = newEntries.filter(e =>
                !existingEntry.entries.some(existing => existing.title === e.title)
            );

            existingEntry.entries = [...updatedEntries, ...newUniqueEntries];
            existingEntry.consultancyTotalScore = existingEntry.entries.reduce((sum, entry) => sum + entry.score, 0);
            await existingEntry.save();
        } else {
            await new ConsultancyProjects({
                academic_year: year,
                entries: newEntries,
                consultancyTotalScore: newEntries.reduce((sum, entry) => sum + entry.score, 0),
                user: req.user.id
            }).save();
        }
        // console.log("New Consultancy Projects Data:", newEntries);   //checklast

        req.flash('success_msg', 'Consultancy projects details saved successfully.');
        res.redirect('/category-3/consultancyProjects');

    } catch (err) {
        console.error("Unexpected Error:", err);
        req.flash('error_msg', 'Unexpected error occurred.');
        res.redirect('/category-3/consultancyProjects');
    }
});

// Completed Projects post method
router.post('/completedProjects', upload.array("document[]"), async (req, res) => {
    try {
        const academicRecord = await AcademicYear.findOne({ user: req.user.id });
        if (!academicRecord) {
            req.flash('error_msg', 'Academic year not found for the user.');
            return res.redirect('/category-3/completedProjects');
        }
        const year = academicRecord.academic_year;

        const projectType = Array.isArray(req.body.project_type) ? req.body.project_type[0] : req.body.project_type;
        const titles = Array.isArray(req.body.title) ? req.body.title : [req.body.title];
        const qualityEvaluations = Array.isArray(req.body.quality_evaluation) ? req.body.quality_evaluation : [req.body.quality_evaluation];
        const reportAccepted = Array.isArray(req.body.report_accepted) ? req.body.report_accepted : [req.body.report_accepted];
        const existingDocs = Array.isArray(req.body.document_existing) ? req.body.document_existing : [req.body.document_existing];

        let fileIndex = 0;

        let newEntries = titles.map((title, index) => {
            let documentPath = existingDocs[index] || null;

            if (!existingDocs[index] && fileIndex < req.files.length) {
                documentPath = req.files[fileIndex].path.replace(/\\/g, '/');
                fileIndex++;
            }

            return {
                title: title || '-',
                quality_evaluation: qualityEvaluations[index], // Use the value directly
                report_accepted: reportAccepted[index], // Use the value directly
                document: documentPath,
                score: projectType === 'Major' ? 20 : 10,
                project_type: projectType
            };
        });

        let existingEntry = await CompletedProjects.findOne({
            user: req.user.id,
            academic_year: year,
            project_type: projectType
        });

        if (existingEntry) {
            let updatedEntries = existingEntry.entries.map(existing => {
                let updated = newEntries.find(e => e.title === existing.title);
                return updated ? updated : existing;
            });

            let newUniqueEntries = newEntries.filter(e =>
                !existingEntry.entries.some(existing => existing.title === e.title)
            );

            existingEntry.entries = [...updatedEntries, ...newUniqueEntries];
            existingEntry.completedProjectsTotalScore = existingEntry.entries.reduce((sum, entry) => sum + entry.score, 0);
            await existingEntry.save();
        } else {
            await new CompletedProjects({
                academic_year: year,
                project_type: projectType,
                entries: newEntries,
                completedProjectsTotalScore: newEntries.reduce((sum, entry) => sum + entry.score, 0),
                user: req.user.id
            }).save();
        }

        req.flash('success_msg', 'Completed projects details saved successfully.');
        res.redirect('/category-3/completedProjects');

    } catch (err) {
        console.error("Unexpected Error:", err);
        req.flash('error_msg', 'Unexpected error occurred.');
        res.redirect('/category-3/completedProjects');
    }
});

// Project Outcomes POST method
router.post('/projectOutcomes', upload.array("document[]"), async (req, res) => {
    try {
        const academicRecord = await AcademicYear.findOne({ user: req.user.id });
        if (!academicRecord) {
            req.flash('error_msg', 'Academic year not found for the user.');
            return res.redirect('/category-3/projectOutcomes');
        }

        const year = academicRecord.academic_year;

        const outcomeLevel = Array.isArray(req.body.outcome_level) ? req.body.outcome_level[0] : req.body.outcome_level;
        const titles = Array.isArray(req.body.title) ? req.body.title : [req.body.title];
        const types = Array.isArray(req.body.type) ? req.body.type : [req.body.type];
        const descriptions = Array.isArray(req.body.description) ? req.body.description : [req.body.description];
        const existingDocs = Array.isArray(req.body.document_existing) ? req.body.document_existing : [req.body.document_existing];

        let fileIndex = 0;

        let newEntries = titles.map((title, index) => {
            let documentPath = existingDocs[index] || null;

            if (!existingDocs[index] && fileIndex < req.files.length) {
                documentPath = req.files[fileIndex].path.replace(/\\/g, '/');
                fileIndex++;
            }

            return {
                title: title || '-',
                type: types[index] || '-',
                description: descriptions[index] || '-',
                document: documentPath,
                score: outcomeLevel === 'national' ? 30 : 50
            };
        });

        let existingEntry = await ProjectOutcomes.findOne({
            user: req.user.id,
            academic_year: year,
            outcome_level: outcomeLevel
        });

        if (existingEntry) {
            let updatedEntries = existingEntry.entries.map(existing => {
                let updated = newEntries.find(e => e.title === existing.title);
                return updated ? updated : existing;
            });

            let newUniqueEntries = newEntries.filter(e =>
                !existingEntry.entries.some(existing => existing.title === e.title)
            );

            existingEntry.entries = [...updatedEntries, ...newUniqueEntries];
            existingEntry.projectOutcomesTotalScore = existingEntry.entries.reduce((sum, entry) => sum + entry.score, 0);
            await existingEntry.save();
        } else {
            await new ProjectOutcomes({
                academic_year: year,
                outcome_level: outcomeLevel,
                entries: newEntries,
                projectOutcomesTotalScore: newEntries.reduce((sum, entry) => sum + entry.score, 0),
                user: req.user.id
            }).save();
        }

        req.flash('success_msg', 'Project outcomes details saved successfully.');
        res.redirect('/category-3/projectOutcomes');

    } catch (err) {
        console.error("Unexpected Error:", err);
        req.flash('error_msg', 'Unexpected error occurred.');
        res.redirect('/category-3/projectOutcomes');
    }
});

// Research Guidance POST method
router.post('/researchGuidance', upload.array("document[]"), async (req, res) => {
    try {
        const academicRecord = await AcademicYear.findOne({ user: req.user.id });
        if (!academicRecord) {
            req.flash('error_msg', 'Academic year not found for the user.');
            return res.redirect('/category-3/researchGuidance');
        }

        const year = academicRecord.academic_year;

        const guidanceType = Array.isArray(req.body.guidance_type) ? req.body.guidance_type[0] : req.body.guidance_type;
        const candidateNames = Array.isArray(req.body.candidate_name) ? req.body.candidate_name : [req.body.candidate_name];
        const statuses = Array.isArray(req.body.status) ? req.body.status : [req.body.status];
        const descriptions = Array.isArray(req.body.description) ? req.body.description : [req.body.description];
        const existingDocs = Array.isArray(req.body.document_existing) ? req.body.document_existing : [req.body.document_existing];

        let fileIndex = 0;

        const scoreMapping = {
            mphil: { degree_awarded: 3 },
            phd: { degree_awarded: 10, thesis_submitted: 7 }
        };

        let newEntries = candidateNames.map((name, index) => {
            let documentPath = existingDocs[index] || null;

            if (!existingDocs[index] && fileIndex < req.files.length) {
                documentPath = req.files[fileIndex].path.replace(/\\/g, '/');
                fileIndex++;
            }

            const status = statuses[index] || '-';
            const score = scoreMapping[guidanceType]?.[status] || 0;

            return {
                candidate_name: name || '-',
                status: status,
                description: descriptions[index] || '-',
                document: documentPath,
                score: score
            };
        });

        let existingEntry = await ResearchGuidance.findOne({
            user: req.user.id,
            academic_year: year,
            guidance_type: guidanceType
        });

        if (existingEntry) {
            let updatedEntries = existingEntry.entries.map(existing => {
                let updated = newEntries.find(e => e.candidate_name === existing.candidate_name);
                return updated ? updated : existing;
            });

            let newUniqueEntries = newEntries.filter(e =>
                !existingEntry.entries.some(existing => existing.candidate_name === e.candidate_name)
            );

            existingEntry.entries = [...updatedEntries, ...newUniqueEntries];
            existingEntry.researchGuidanceTotalScore = existingEntry.entries.reduce((sum, entry) => sum + entry.score, 0);
            await existingEntry.save();
        } else {
            await new ResearchGuidance({
                academic_year: year,
                guidance_type: guidanceType,
                entries: newEntries,
                researchGuidanceTotalScore: newEntries.reduce((sum, entry) => sum + entry.score, 0),
                user: req.user.id
            }).save();
        }

        req.flash('success_msg', 'Research guidance details saved successfully.');
        res.redirect('/category-3/researchGuidance');

    } catch (err) {
        console.error("Unexpected Error:", err);
        req.flash('error_msg', 'Unexpected error occurred.');
        res.redirect('/category-3/researchGuidance');
    }
});

// Training Courses POST method
router.post('/trainingCourses', upload.array("document[]"), async (req, res) => {
    try {
        const academicRecord = await AcademicYear.findOne({ user: req.user.id });
        if (!academicRecord) {
            req.flash('error_msg', 'Academic year not found for the user.');
            return res.redirect('/category-3/trainingCourses');
        }

        const year = academicRecord.academic_year;

        const durationType = Array.isArray(req.body.duration_type) ? req.body.duration_type[0] : req.body.duration_type;
        const titles = Array.isArray(req.body.programme_title) ? req.body.programme_title : [req.body.programme_title];
        const durations = Array.isArray(req.body.duration) ? req.body.duration : [req.body.duration];
        const organizations = Array.isArray(req.body.organizing_institution) ? req.body.organizing_institution : [req.body.organizing_institution];
        const courseTypes = Array.isArray(req.body.course_type) ? req.body.course_type : [req.body.course_type];
        const existingDocs = Array.isArray(req.body.document_existing) ? req.body.document_existing : [req.body.document_existing];

        console.log(req.body);
        let fileIndex = 0;

        let newEntries = titles.map((title, index) => {
            let documentPath = existingDocs[index] || null;

            if (!existingDocs[index] && fileIndex < req.files.length) {
                documentPath = req.files[fileIndex].path.replace(/\\/g, '/');
                fileIndex++;
            }

            return {
                programme_title: title || '-', // Correct field name
                duration: durations[index] || 0,
                organizing_institution: organizations[index] || '-', // Correct field name
                course_type: courseTypes[index] || '-',
                document: documentPath,
                score: durationType === 'two_weeks' ? 20 :
                       durationType === 'one_week' ? 10 : 0 
            };
        });

        let existingEntry = await TrainingCourses.findOne({
            user: req.user.id,
            academic_year: year,
            duration_type: durationType
        });

        if (existingEntry) {
            let updatedEntries = existingEntry.entries.map(existing => {
                let updated = newEntries.find(e => e.programme_title === existing.programme_title);
                return updated ? updated : existing;
            });

            let newUniqueEntries = newEntries.filter(e =>
                !existingEntry.entries.some(existing => existing.programme_title === e.programme_title)
            );

            existingEntry.entries = [...updatedEntries, ...newUniqueEntries];
            existingEntry.trainingCoursesTotalScore = existingEntry.entries.reduce((sum, entry) => sum + entry.score, 0);
            await existingEntry.save();
        } else {
            await new TrainingCourses({
                academic_year: year,
                duration_type: durationType,
                entries: newEntries,
                trainingCoursesTotalScore: newEntries.reduce((sum, entry) => sum + entry.score, 0),
                user: req.user.id
            }).save();
        }

        req.flash('success_msg', 'Training courses details saved successfully.');
        res.redirect('/category-3/trainingCourses');

    } catch (err) {
        console.error("Unexpected Error:", err);
        req.flash('error_msg', 'Unexpected error occurred.');
        res.redirect('/category-3/trainingCourses');
    }
});

// POST method for Conference Papers Entry
router.post('/conferencePapersEntry', upload.array("document[]"), async (req, res) => {
    try {
        const academicRecord = await AcademicYear.findOne({ user: req.user.id });
        if (!academicRecord) {
            req.flash('error_msg', 'Academic year not found for the user.');
            return res.redirect('/category-3/conferencePapersEntry');
        }

        const year = academicRecord.academic_year;

        const eventType = Array.isArray(req.body.event_type) ? req.body.event_type[0] : req.body.event_type;
        const titles = Array.isArray(req.body.title) ? req.body.title : [req.body.title];
        const eventNames = Array.isArray(req.body.event_name) ? req.body.event_name : [req.body.event_name];
        const dates = Array.isArray(req.body.date) ? req.body.date : [req.body.date];
        const presentationTypes = Array.isArray(req.body.presentation_type) ? req.body.presentation_type : [req.body.presentation_type];
        const existingDocs = Array.isArray(req.body.document_existing) ? req.body.document_existing : [req.body.document_existing];

        let fileIndex = 0;

        let newEntries = titles.map((title, index) => {
            let documentPath = existingDocs[index] || null;

            if (!existingDocs[index] && fileIndex < req.files.length) {
                documentPath = req.files[fileIndex].path.replace(/\\/g, '/');
                fileIndex++;
            }

            return {
                title: title || '-',
                event_name: eventNames[index] || '-',
                date: dates[index] || null,
                presentation_type: presentationTypes[index] || '-',
                document: documentPath,
                score: eventType === 'international' ? 10 :
                       eventType === 'national' ? 7.5 :
                       eventType === 'regional' ? 5 :
                       eventType === 'local' ? 3 : 0
            };
        });

        let existingEntry = await ConferencePapersEntry.findOne({
            user: req.user.id,
            academic_year: year,
            event_type: eventType
        });

        if (existingEntry) {
            let updatedEntries = existingEntry.entries.map(existing => {
                let updated = newEntries.find(e => e.title === existing.title);
                return updated ? updated : existing;
            });

            let newUniqueEntries = newEntries.filter(e =>
                !existingEntry.entries.some(existing => existing.title === e.title)
            );

            existingEntry.entries = [...updatedEntries, ...newUniqueEntries];
            existingEntry.conferencePapersTotalScore = existingEntry.entries.reduce((sum, entry) => sum + entry.score, 0);
            await existingEntry.save();
        } else {
            await new ConferencePapersEntry({
                academic_year: year,
                event_type: eventType,
                entries: newEntries,
                conferencePapersTotalScore: newEntries.reduce((sum, entry) => sum + entry.score, 0),
                user: req.user.id
            }).save();
        }

        req.flash('success_msg', 'Conference papers details saved successfully.');
        res.redirect('/category-3/conferencePapersEntry');

    } catch (err) {
        console.error("Unexpected Error:", err);
        req.flash('error_msg', 'Unexpected error occurred.');
        res.redirect('/category-3/conferencePapersEntry');
    }
});














// Research Papers Published get method

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

        res.render('category-3/researchPapersPublished', { 
            researchPapers, 
            academic_year: year // Pass the year to the frontend
        });
    } catch (error) {
        console.error("Error fetching research papers:", error);
        req.flash('error_msg', 'Error fetching research papers.');
        res.redirect('/');
    }
});

// Books/Chapters Published get method

router.get('/booksChaptersPublished', ensureAuthenticated, async (req, res) => {
    try {
        const academicRecord = await AcademicYear.findOne({ user: req.user.id });
        if (!academicRecord) {
            req.flash('error_msg', 'Academic year not found for the user.');
            return res.redirect('/dashboard');
        }

        const year = academicRecord.academic_year;

        const booksChapters = await BooksChaptersPublished.find({
            user: req.user.id,
            academic_year: year
        });

        res.render('category-3/booksChaptersPublished', {
            booksChapters,
            academic_year: year
        });
    } catch (error) {
        console.error("Error fetching books/chapters published:", error);
        req.flash('error_msg', 'Error fetching books/chapters published.');
        res.redirect('/');
    }
});

// Sponsored Projects get method
router.get('/sponsoredProjects', ensureAuthenticated, async (req, res) => {
    try {
        const academicRecord = await AcademicYear.findOne({ user: req.user.id });
        if (!academicRecord) {
            req.flash('error_msg', 'Academic year not found for the user.');
            return res.redirect('/dashboard');
        }

        const year = academicRecord.academic_year;

        const sponsoredProjects = await SponsoredProjects.find({
            user: req.user.id,
            academic_year: year
        });

        res.render('category-3/sponsoredProjects', {
            sponsoredProjects,
            academic_year: year
        });
    } catch (error) {
        console.error("Error fetching sponsored projects:", error);
        req.flash('error_msg', 'Error fetching sponsored projects.');
        res.redirect('/');
    }
});

// Consultancy Projects get method
router.get('/consultancyProjects', ensureAuthenticated, async (req, res) => {
    try {
        const academicRecord = await AcademicYear.findOne({ user: req.user.id });
        if (!academicRecord) {
            req.flash('error_msg', 'Academic year not found for the user.');
            return res.redirect('/dashboard');
        }

        const year = academicRecord.academic_year;

        const consultancyProjects = await ConsultancyProjects.findOne({
            user: req.user.id,
            academic_year: year
        });


        res.render('category-3/consultancyProjects', {
            consultancyProjects,
            academic_year: year
        });
    } catch (error) {
        console.error("Error fetching consultancy projects:", error);
        req.flash('error_msg', 'Error fetching consultancy projects.');
        res.redirect('/');
    }
});


// Completed Projects GET method
router.get('/completedProjects', ensureAuthenticated, async (req, res) => {
    try {
        const academicRecord = await AcademicYear.findOne({ user: req.user.id });
        if (!academicRecord) {
            req.flash('error_msg', 'Academic year not found for the user.');
            return res.redirect('/dashboard');
        }

        const year = academicRecord.academic_year;

        // Fetch completed projects for the user and academic year
        const completedProjects = await CompletedProjects.find({
            user: req.user.id,
            academic_year: year
        });

        // Pass data to the Handlebars template
        res.render('category-3/completedProjects', {
            completedProjects, // Pass the completed projects data
            academic_year: year // Pass the academic year
        });
    } catch (error) {
        console.error("Error fetching completed projects:", error);
        req.flash('error_msg', 'Error fetching completed projects.');
        res.redirect('/');
    }
});

// Project Outcomes GET method
router.get('/projectOutcomes', ensureAuthenticated, async (req, res) => {
    try {
        const academicRecord = await AcademicYear.findOne({ user: req.user.id });
        if (!academicRecord) {
            req.flash('error_msg', 'Academic year not found for the user.');
            return res.redirect('/dashboard');
        }

        const year = academicRecord.academic_year;

        const projectOutcomes = await ProjectOutcomes.find({
            user: req.user.id,
            academic_year: year
        });

        res.render('category-3/projectOutcomes', {
            projectOutcomes,
            academic_year: year
        });
    } catch (error) {
        console.error("Error fetching project outcomes:", error);
        req.flash('error_msg', 'Error fetching project outcomes.');
        res.redirect('/');
    }
});

// Research Guidance GET method
router.get('/researchGuidance', ensureAuthenticated, async (req, res) => {
    try {
        const academicRecord = await AcademicYear.findOne({ user: req.user.id });
        if (!academicRecord) {
            req.flash('error_msg', 'Academic year not found for the user.');
            return res.redirect('/dashboard');
        }

        const year = academicRecord.academic_year;

        const researchGuidance = await ResearchGuidance.find({
            user: req.user.id,
            academic_year: year
        });

        res.render('category-3/researchGuidance', {
            researchGuidance,
            academic_year: year
        });
    } catch (error) {
        console.error("Error fetching research guidance:", error);
        req.flash('error_msg', 'Error fetching research guidance.');
        res.redirect('/');
    }
});

// Training Courses GET method
router.get('/trainingCourses', ensureAuthenticated, async (req, res) => {
    try {
        const academicRecord = await AcademicYear.findOne({ user: req.user.id });
        if (!academicRecord) {
            req.flash('error_msg', 'Academic year not found for the user.');
            return res.redirect('/dashboard');
        }

        const year = academicRecord.academic_year;

        const trainingCourses = await TrainingCourses.find({
            user: req.user.id,
            academic_year: year
        });

        res.render('category-3/trainingCourses', {
            trainingCourses,
            academic_year: year
        });
    } catch (error) {
        console.error("Error fetching training courses:", error);
        req.flash('error_msg', 'Error fetching training courses.');
        res.redirect('/');
    }
});

// GET method for Conference Papers Entry
router.get('/conferencePapersEntry', ensureAuthenticated, async (req, res) => {
    try {
        const academicRecord = await AcademicYear.findOne({ user: req.user.id });
        if (!academicRecord) {
            req.flash('error_msg', 'Academic year not found for the user.');
            return res.redirect('/dashboard');
        }

        const year = academicRecord.academic_year;

        const conferencePapers = await ConferencePapersEntry.find({
            user: req.user.id,
            academic_year: year
        });

        res.render('category-3/conferencePapersEntry', {
            conferencePapers,
            academic_year: year
        });
    } catch (error) {
        console.error("Error fetching conference papers:", error);
        req.flash('error_msg', 'Error fetching conference papers.');
        res.redirect('/');
    }
});









// Delete journal entry from Research Papers Published POST Method
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

// Delete entry from Books/Chapters Published POST Method
router.post('/deleteBook', ensureAuthenticated, async (req, res) => {
    const { publication_type, title } = req.body;

    try {
        const academicRecord = await AcademicYear.findOne({ user: req.user.id });
        if (!academicRecord) {
            return res.json({ success: false, message: "Academic year not found." });
        }
        const academic_year = academicRecord.academic_year;

        const updatedEntry = await BooksChaptersPublished.findOneAndUpdate(
            {
                user: req.user.id,
                publication_type: publication_type,
                academic_year: academic_year
            },
            { $pull: { entries: { title: title } } },
            { new: true }
        );

        if (!updatedEntry) {
            return res.json({ success: false, message: "Book/Chapter not found." });
        }

        const newTotalScore = updatedEntry.entries.reduce((sum, entry) => sum + entry.score, 0);

        updatedEntry.booksChaptersTotalScore = newTotalScore;
        await updatedEntry.save();

        res.json({ success: true, message: "Book/Chapter deleted successfully.", newTotalScore });

    } catch (error) {
        console.error("Error deleting book/chapter:", error);
        res.json({ success: false, message: "Server error." });
    }
});

// Delete entry from Sponsored Projects POST Method
router.post('/deleteSponsoredProject', ensureAuthenticated, async (req, res) => {
    const { project_type, title } = req.body;

    try {
        const academicRecord = await AcademicYear.findOne({ user: req.user.id });
        if (!academicRecord) {
            return res.json({ success: false, message: "Academic year not found." });
        }
        const academic_year = academicRecord.academic_year;

        const updatedEntry = await SponsoredProjects.findOneAndUpdate(
            {
                user: req.user.id,
                project_type: project_type,
                academic_year: academic_year
            },
            { $pull: { entries: { title: title } } },
            { new: true }
        );

        if (!updatedEntry) {
            return res.json({ success: false, message: "Sponsored project not found." });
        }

        const newTotalScore = updatedEntry.entries.reduce((sum, entry) => sum + entry.score, 0);

        updatedEntry.sponsoredProjectsTotalScore = newTotalScore;
        await updatedEntry.save();

        res.json({ success: true, message: "Sponsored project deleted successfully.", newTotalScore });

    } catch (error) {
        console.error("Error deleting sponsored project:", error);
        res.json({ success: false, message: "Server error." });
    }
});

// Delete entry from Consultancy Projects POST Method
router.post('/deleteConsultancyProject', ensureAuthenticated, async (req, res) => {
    const { title } = req.body;

    try {
        const academicRecord = await AcademicYear.findOne({ user: req.user.id });
        if (!academicRecord) {
            return res.json({ success: false, message: "Academic year not found." });
        }
        const academic_year = academicRecord.academic_year;

        const updatedEntry = await ConsultancyProjects.findOneAndUpdate(
            {
                user: req.user.id,
                academic_year: academic_year
            },
            { $pull: { entries: { title: title } } },
            { new: true }
        );

        if (!updatedEntry) {
            return res.json({ success: false, message: "Consultancy project not found." });
        }

        const newTotalScore = updatedEntry.entries.reduce((sum, entry) => sum + entry.score, 0);

        updatedEntry.consultancyTotalScore = newTotalScore;
        await updatedEntry.save();

        res.json({ success: true, message: "Consultancy project deleted successfully.", newTotalScore });

    } catch (error) {
        console.error("Error deleting consultancy project:", error);
        res.json({ success: false, message: "Server error." });
    }
});

// Delete entry from Completed Projects POST Method
router.post('/deleteCompletedProject', ensureAuthenticated, async (req, res) => {
    const { project_type, title } = req.body;

    try {
        const academicRecord = await AcademicYear.findOne({ user: req.user.id });
        if (!academicRecord) {
            return res.json({ success: false, message: "Academic year not found." });
        }
        const academic_year = academicRecord.academic_year;

        const updatedEntry = await CompletedProjects.findOneAndUpdate(
            {
                user: req.user.id,
                project_type: project_type,
                academic_year: academic_year
            },
            { $pull: { entries: { title: title } } },
            { new: true }
        );

        if (!updatedEntry) {
            return res.json({ success: false, message: "Completed project not found." });
        }

        const newTotalScore = updatedEntry.entries.reduce((sum, entry) => sum + entry.score, 0);

        updatedEntry.completedProjectsTotalScore = newTotalScore;
        await updatedEntry.save();

        res.json({ success: true, message: "Completed project deleted successfully.", newTotalScore });

    } catch (error) {
        console.error("Error deleting completed project:", error);
        res.json({ success: false, message: "Server error." });
    }
});

// Delete entry from Project Outcomes POST Method
router.post('/deleteProjectOutcome', ensureAuthenticated, async (req, res) => {
    const { outcome_level, title } = req.body;

    try {
        const academicRecord = await AcademicYear.findOne({ user: req.user.id });
        if (!academicRecord) {
            return res.json({ success: false, message: "Academic year not found." });
        }
        const academic_year = academicRecord.academic_year;

        const updatedEntry = await ProjectOutcomes.findOneAndUpdate(
            {
                user: req.user.id,
                outcome_level: outcome_level,
                academic_year: academic_year
            },
            { $pull: { entries: { title: title } } },
            { new: true }
        );

        if (!updatedEntry) {
            return res.json({ success: false, message: "Project outcome not found." });
        }

        const newTotalScore = updatedEntry.entries.reduce((sum, entry) => sum + entry.score, 0);

        updatedEntry.projectOutcomesTotalScore = newTotalScore;
        await updatedEntry.save();

        res.json({ success: true, message: "Project outcome deleted successfully.", newTotalScore });

    } catch (error) {
        console.error("Error deleting project outcome:", error);
        res.json({ success: false, message: "Server error." });
    }
});

// Delete entry from Research Guidance POST Method
router.post('/deleteResearchGuidance', ensureAuthenticated, async (req, res) => {
    const { guidance_type, candidate_name } = req.body;

    try {
        const academicRecord = await AcademicYear.findOne({ user: req.user.id });
        if (!academicRecord) {
            return res.json({ success: false, message: "Academic year not found." });
        }
        const academic_year = academicRecord.academic_year;

        const updatedEntry = await ResearchGuidance.findOneAndUpdate(
            {
                user: req.user.id,
                guidance_type: guidance_type,
                academic_year: academic_year
            },
            { $pull: { entries: { candidate_name: candidate_name } } },
            { new: true }
        );

        if (!updatedEntry) {
            return res.json({ success: false, message: "Research guidance entry not found." });
        }

        // Recalculate the total score
        const scoreMapping = {
            mphil: 3,
            phd: { degree_awarded: 10, thesis_submitted: 7 }
        };

        let totalScore = 0;
        updatedEntry.entries.forEach(entry => {
            if (guidance_type === 'mphil') {
                totalScore += scoreMapping.mphil;
            } else if (guidance_type === 'phd') {
                totalScore += scoreMapping.phd[entry.status] || 0;
            }
        });

        updatedEntry.researchGuidanceTotalScore = totalScore;
        await updatedEntry.save();

        res.json({ success: true, message: "Research guidance entry deleted successfully.", newTotalScore: totalScore });

    } catch (error) {
        console.error("Error deleting research guidance entry:", error);
        res.json({ success: false, message: "Server error." });
    }
});

// Delete entry from Training Courses POST Method
router.post('/deleteTrainingCourse', ensureAuthenticated, async (req, res) => {
    const { duration_type, title } = req.body;

    try {
        const academicRecord = await AcademicYear.findOne({ user: req.user.id });
        if (!academicRecord) {
            return res.json({ success: false, message: "Academic year not found." });
        }
        const academic_year = academicRecord.academic_year;

        const updatedEntry = await TrainingCourses.findOneAndUpdate(
            {
                user: req.user.id,
                duration_type: duration_type,
                academic_year: academic_year
            },
            { $pull: { entries: { programme_title: title } } },
            { new: true }
        );

        if (!updatedEntry) {
            return res.json({ success: false, message: "Training course not found." });
        }

        const newTotalScore = updatedEntry.entries.reduce((sum, entry) => sum + entry.score, 0);

        updatedEntry.trainingCoursesTotalScore = newTotalScore;
        await updatedEntry.save();

        res.json({ success: true, message: "Training course deleted successfully.", newTotalScore });

    } catch (error) {
        console.error("Error deleting training course:", error);
        res.json({ success: false, message: "Server error." });
    }
});

// DELETE method for Conference Papers Entry
router.post('/deleteConferencePaper', ensureAuthenticated, async (req, res) => {
    const { event_type, title } = req.body;

    try {
        const academicRecord = await AcademicYear.findOne({ user: req.user.id });
        if (!academicRecord) {
            return res.json({ success: false, message: "Academic year not found." });
        }
        const academic_year = academicRecord.academic_year;

        const updatedEntry = await ConferencePapersEntry.findOneAndUpdate(
            {
                user: req.user.id,
                event_type: event_type,
                academic_year: academic_year
            },
            { $pull: { entries: { title: title } } },
            { new: true }
        );

        if (!updatedEntry) {
            return res.json({ success: false, message: "Conference paper not found." });
        }

        const newTotalScore = updatedEntry.entries.reduce((sum, entry) => sum + entry.score, 0);

        updatedEntry.conferencePapersTotalScore = newTotalScore;
        await updatedEntry.save();

        res.json({ success: true, message: "Conference paper deleted successfully.", newTotalScore });

    } catch (error) {
        console.error("Error deleting conference paper:", error);
        res.json({ success: false, message: "Server error." });
    }
});










// Calculate Total Score for Research Papers Published
router.get('/researchPapersPublished/totalScore', ensureAuthenticated, async (req, res) => {
    try {
        // Fetch the academic year for the logged-in user
        const academicRecord = await AcademicYear.findOne({ user: req.user.id });
        if (!academicRecord) {
            req.flash('error_msg', 'Academic year not found for the user.');
            return res.redirect('/dashboard');
        }

        const year = academicRecord.academic_year;

        // Fetch all research papers for the user and academic year
        const researchPapers = await ResearchPapersPublished.find({
            user: req.user.id,
            academic_year: year
        });

        // Calculate the total score
        let totalThreeOneScore = 0;

        researchPapers.forEach(entry => {
            totalThreeOneScore += entry.journals.reduce((sum, journal) => sum + (journal.score || 0), 0);
        });

        res.render('category-3/researchPapersTotalScore', {
            totalThreeOneScore,
            academic_year: year
        });
    } catch (error) {
        console.error("Error calculating total score for research papers:", error);
        req.flash('error_msg', 'Error calculating total score.');
        res.redirect('/category-3/researchPapersPublished');
    }
});

// Calculate Total Score for Books/Chapters Published
router.get('/booksChaptersPublished/totalScore', ensureAuthenticated, async (req, res) => {
    try {
        // Fetch the academic year for the logged-in user
        const academicRecord = await AcademicYear.findOne({ user: req.user.id });
        if (!academicRecord) {
            req.flash('error_msg', 'Academic year not found for the user.');
            return res.redirect('/dashboard');
        }

        const year = academicRecord.academic_year;

        // Fetch all books/chapters for the user and academic year
        const booksChapters = await BooksChaptersPublished.find({
            user: req.user.id,
            academic_year: year
        });

        // Calculate the total score
        let totalThreeTwoScore = 0;

        booksChapters.forEach(entry => {
            totalThreeTwoScore += entry.entries.reduce((sum, book) => sum + (book.score || 0), 0);
        });

        // Render the total score view
        res.render('category-3/booksChaptersTotalScore', {
            totalThreeTwoScore,
            academic_year: year
        });
    } catch (error) {
        console.error("Error calculating total score for books/chapters:", error);
        req.flash('error_msg', 'Error calculating total score.');
        res.redirect('/category-3/booksChaptersPublished');
    }
});

// Calculate Total Score for Sponsored Projects
router.get('/sponsoredProjects/totalScore', ensureAuthenticated, async (req, res) => {
    try {
        const academicRecord = await AcademicYear.findOne({ user: req.user.id });
        if (!academicRecord) {
            req.flash('error_msg', 'Academic year not found for the user.');
            return res.redirect('/dashboard');
        }

        const year = academicRecord.academic_year;

        const sponsoredProjects = await SponsoredProjects.find({
            user: req.user.id,
            academic_year: year
        });

        let totalThreeThreeOneScore = 0;

        sponsoredProjects.forEach(entry => {
            totalThreeThreeOneScore += entry.entries.reduce((sum, project) => sum + (project.score || 0), 0);
        });

        res.render('category-3/sponsoredProjectsTotalScore', {
            totalThreeThreeOneScore,
            academic_year: year
        });
    } catch (error) {
        console.error("Error calculating total score for sponsored projects:", error);
        req.flash('error_msg', 'Error calculating total score.');
        res.redirect('/category-3/sponsoredProjects');
    }
});

// Calculate Total Score for Consultancy Projects
router.get('/consultancyProjects/totalScore', ensureAuthenticated, async (req, res) => {
    try {
        const academicRecord = await AcademicYear.findOne({ user: req.user.id });
        if (!academicRecord) {
            req.flash('error_msg', 'Academic year not found for the user.');
            return res.redirect('/dashboard');
        }

        const year = academicRecord.academic_year;

        const consultancyProjects = await ConsultancyProjects.find({
            user: req.user.id,
            academic_year: year
        });

        let totalThreeThreeTwoScore = 0;

        consultancyProjects.forEach(entry => {
            totalThreeThreeTwoScore += entry.entries.reduce((sum, project) => sum + (project.score || 0), 0);
        });

        res.render('category-3/consultancyProjectsTotalScore', {
            totalThreeThreeTwoScore,
            academic_year: year
        });
    } catch (error) {
        console.error("Error calculating total score for consultancy projects:", error);
        req.flash('error_msg', 'Error calculating total score.');
        res.redirect('/category-3/consultancyProjects');
    }
});

// Calculate Total Score for Completed Projects
router.get('/completedProjects/totalScore', ensureAuthenticated, async (req, res) => {
    try {
        const academicRecord = await AcademicYear.findOne({ user: req.user.id });
        if (!academicRecord) {
            req.flash('error_msg', 'Academic year not found for the user.');
            return res.redirect('/dashboard');
        }

        const year = academicRecord.academic_year;

        const completedProjects = await CompletedProjects.find({
            user: req.user.id,
            academic_year: year
        });

        let totalThreeThreeThreeScore = 0;

        completedProjects.forEach(entry => {
            totalThreeThreeThreeScore += entry.entries.reduce((sum, project) => sum + (project.score || 0), 0);
        });

        res.render('category-3/completedProjectsTotalScore', {
            totalThreeThreeThreeScore,
            academic_year: year
        });
    } catch (error) {
        console.error("Error calculating total score for completed projects:", error);
        req.flash('error_msg', 'Error calculating total score.');
        res.redirect('/category-3/completedProjects');
    }
});

// Calculate Total Score for Project Outcomes
router.get('/projectOutcomes/totalScore', ensureAuthenticated, async (req, res) => {
    try {
        const academicRecord = await AcademicYear.findOne({ user: req.user.id });
        if (!academicRecord) {
            req.flash('error_msg', 'Academic year not found for the user.');
            return res.redirect('/dashboard');
        }

        const year = academicRecord.academic_year;

        const projectOutcomes = await ProjectOutcomes.find({
            user: req.user.id,
            academic_year: year
        });

        let totalThreeThreeFourScore = 0;

        projectOutcomes.forEach(entry => {
            totalThreeThreeFourScore += entry.entries.reduce((sum, outcome) => sum + (outcome.score || 0), 0);
        });

        res.render('category-3/projectOutcomesTotalScore', {
            totalThreeThreeFourScore,
            academic_year: year
        });
    } catch (error) {
        console.error("Error calculating total score for project outcomes:", error);
        req.flash('error_msg', 'Error calculating total score.');
        res.redirect('/category-3/projectOutcomes');
    }
});

// Calculate Total Score for Research Guidance
router.get('/researchGuidance/totalScore', ensureAuthenticated, async (req, res) => {
    try {
        const academicRecord = await AcademicYear.findOne({ user: req.user.id });
        if (!academicRecord) {
            req.flash('error_msg', 'Academic year not found for the user.');
            return res.redirect('/dashboard');
        }

        const year = academicRecord.academic_year;

        const researchGuidance = await ResearchGuidance.find({
            user: req.user.id,
            academic_year: year
        });

        let totalThreeFourScore = 0;

        researchGuidance.forEach(entry => {
            totalThreeFourScore += entry.entries.length * (entry.guidance_type === 'mphil' ? 3 : 10);
        });

        res.render('category-3/researchGuidanceTotalScore', {
            totalThreeFourScore,
            academic_year: year
        });
    } catch (error) {
        console.error("Error calculating total score for research guidance:", error);
        req.flash('error_msg', 'Error calculating total score.');
        res.redirect('/category-3/researchGuidance');
    }
});

// Calculate Total Score for Training Courses
router.get('/trainingCourses/totalScore', ensureAuthenticated, async (req, res) => {
    try {
        const academicRecord = await AcademicYear.findOne({ user: req.user.id });
        if (!academicRecord) {
            req.flash('error_msg', 'Academic year not found for the user.');
            return res.redirect('/dashboard');
        }

        const year = academicRecord.academic_year;

        const trainingCourses = await TrainingCourses.find({
            user: req.user.id,
            academic_year: year
        });

        let totalThreeFiveOneScore = 0;

        trainingCourses.forEach(entry => {
            totalThreeFiveOneScore += entry.entries.reduce((sum, course) => sum + (course.score || 0), 0);
        });

        res.render('category-3/trainingCoursesTotalScore', {
            totalThreeFiveOneScore,
            academic_year: year
        });
    } catch (error) {
        console.error("Error calculating total score for training courses:", error);
        req.flash('error_msg', 'Error calculating total score.');
        res.redirect('/category-3/trainingCourses');
    }
});

// Calculate Total Score for Conference Papers Entry
router.get('/conferencePapersEntry/totalScore', ensureAuthenticated, async (req, res) => {
    try {
        const academicRecord = await AcademicYear.findOne({ user: req.user.id });
        if (!academicRecord) {
            req.flash('error_msg', 'Academic year not found for the user.');
            return res.redirect('/dashboard');
        }

        const year = academicRecord.academic_year;

        const conferencePapers = await ConferencePapersEntry.find({
            user: req.user.id,
            academic_year: year
        });

        let totalThreeFiveTwoScore = 0;

        conferencePapers.forEach(entry => {
            totalThreeFiveTwoScore += entry.entries.reduce((sum, paper) => sum + (paper.score || 0), 0);
        });

        res.render('category-3/conferencePapersTotalScore', {
            totalThreeFiveTwoScore,
            academic_year: year
        });
    } catch (error) {
        console.error("Error calculating total score for conference papers:", error);
        req.flash('error_msg', 'Error calculating total score.');
        res.redirect('/category-3/conferencePapersEntry');
    }
});







module.exports = router;