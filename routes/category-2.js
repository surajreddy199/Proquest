const express = require('express');
const mongoose = require('mongoose');
const { ensureAuthenticated } = require('../helpers/auth');
const router = express.Router();
const AcademicYear = require('../config/academicYear');

let year;

// Load co-curricular activities model
require('../models/Category-2/CocurricularActivities');
const CocurricularActivities = mongoose.model('cocurricularactivities');

// Load corporate life model
require('../models/Category-2/CorporateLife');
const CorporateLife = mongoose.model('corporatelife');

// Load professional development model
require('../models/Category-2/ProfessionalDevelopment');
const ProfessionalDevelopment = mongoose.model('professionaldevelopment');












const multer = require('multer');

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



//GET Methods

// Load Co-Curricular Activities Route New Added
router.get('/cocurricularActivities', ensureAuthenticated, (req, res) => {
    AcademicYear.find({ user: req.user.id })
        .then(result => {
            if (!result) {
                req.flash('error_msg', 'Select the academic year before proceeding');
                res.redirect('/');
            }
            year = result[0].academic_year;
            CocurricularActivities.find({ $and: [{ user: req.user.id }, { academic_year: year }] })
                .then(result => {
                    res.render('category-2/cocurricularActivities', { result });
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

// Load Corporate Life Route
router.get('/corporateLife', ensureAuthenticated, (req, res) => {
    AcademicYear.find({ user: req.user.id })
        .then(result => {
            if (!result) {
                req.flash('error_msg', 'Select the academic year before proceeding');
                res.redirect('/');
            }
            year = result[0].academic_year;
            CorporateLife.find({ $and: [{ user: req.user.id }, { academic_year: year }] })
                .then(result => {
                    res.render('category-2/corporateLife', { result });
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

// GET Method for Professional Development
router.get('/professionalDevelopment', ensureAuthenticated, (req, res) => {
    AcademicYear.find({ user: req.user.id })
        .then(result => {
            if (!result) {
                req.flash('error_msg', 'Select the academic year before proceeding');
                res.redirect('/');
            }
            year = result[0].academic_year;
            ProfessionalDevelopment.find({ $and: [{ user: req.user.id }, { academic_year: year }] })
                .then(result => {
                    res.render('category-2/professionalDevelopment', { result });
                })
                .catch(() => {
                    req.flash('error_msg', 'Error while retrieving data.');
                    res.redirect('/');
                });
        })
        .catch(() => {
            req.flash('error_msg', 'Select the academic year before proceeding.');
            res.redirect('/');
        });
});








//GET EDIT Methods

// Co-Curricular Activities Edit Route New Added
router.get('/cocurricularActivities/edit/:id', ensureAuthenticated, (req, res) => {
    CocurricularActivities.findOne({ _id: req.params.id })
        .then(result => {
            if (result.user != req.user.id) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('/category-2/cocurricularActivities');
            } else {
                res.render('category-2/cocurricularActivities', { editResult: result });
            }
        })
        .catch(() => {
            req.flash('error_msg', 'Error while finding your previous data. Please try again.');
            res.redirect('/category-2/cocurricularActivities');
        })
});

//GET EDIT Methods

// Corporate Life Edit Route
router.get('/corporateLife/edit/:id', ensureAuthenticated, (req, res) => {
    CorporateLife.findOne({ _id: req.params.id })
        .then(result => {
            if (result.user != req.user.id) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('/category-2/corporateLife');
            } else {
                res.render('category-2/corporateLife', { editResult: result });
            }
        })
        .catch(() => {
            req.flash('error_msg', 'Error while finding your previous data. Please try again.');
            res.redirect('/category-2/corporateLife');
        })
});

// GET EDIT Method for Professional Development
router.get('/professionalDevelopment/edit/:id', ensureAuthenticated, (req, res) => {
    ProfessionalDevelopment.findOne({ _id: req.params.id })
        .then(result => {
            if (result.user != req.user.id) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('/category-2/professionalDevelopment');
            } else {
                res.render('category-2/professionalDevelopment', { editResult: result });
            }
        })
        .catch(() => {
            req.flash('error_msg', 'Error while finding your previous data. Please try again.');
            res.redirect('/category-2/professionalDevelopment');
        });
});












//POST Methods

// Process Co-Curricular Activities form New Added

router.post('/cocurricularActivities', (req, res) => {
    const cocurricularActivitiesRecords = {
        academic_year: year,
        ncc: req.body.ncc === "on",
        nss: req.body.nss === "on",
        otherActivities: req.body.otherActivities === "on",
        otherActivitiesDetails: req.body.otherActivitiesDetails || '',
        none: req.body.none === "on",
        scoreSix: req.body.scoreSix,
        user: req.user.id
    }

    new CocurricularActivities(cocurricularActivitiesRecords)
        .save()
        .then(cocurricularActivities => {
            req.flash('success_msg', 'Data entered successfully');
            res.redirect('/category-2/cocurricularActivities');
        })
        .catch(err => {
            console.log(err);
            req.flash('error_msg', 'Faculty ID not found. Please login again.');
            res.redirect('/category-2/cocurricularActivities');
        })
});

//POST Methods

// Process Corporate Life form
router.post('/corporateLife', (req, res) => {
    const corporateLifeRecords = {
        academic_year: year,
        industryInteractions: req.body.industryInteractions === "on",
        academicCommittees: req.body.academicCommittees === "on",
        otherContributions: req.body.otherContributions === "on",
        otherContributionsDetails: req.body.otherContributionsDetails || '',
        scoreSeven: req.body.scoreSeven,
        user: req.user.id
    }

    new CorporateLife(corporateLifeRecords)
        .save()
        .then(corporateLife => {
            req.flash('success_msg', 'Data entered successfully');
            res.redirect('/category-2/corporateLife');
        })
        .catch(err => {
            console.log(err);
            req.flash('error_msg', 'Faculty ID not found. Please login again.');
            res.redirect('/category-2/corporateLife');
        })
});

// POST Method for Professional Development
router.post('/professionalDevelopment', upload.single('document'), (req, res) => {
    const professionalDevelopmentRecords = {
        academic_year: year,
        seminars: req.body.seminars === "on",
        professionalBody: req.body.professionalBody === "on",
        professionalBodyDetails: req.body.professionalBodyDetails || '',
        document: req.file ? req.file.path.replace(/\\/g, '/') : '', // Save file path
        scoreEight: req.body.scoreEight,
        user: req.user.id
    };

    new ProfessionalDevelopment(professionalDevelopmentRecords)
        .save()
        .then(() => {
            req.flash('success_msg', 'Data entered successfully');
            res.redirect('/category-2/professionalDevelopment');
        })
        .catch(err => {
            console.log(err);
            req.flash('error_msg', 'Faculty ID not found. Please login again.');
            res.redirect('/category-2/professionalDevelopment');
        });
});







//PUT Methods

// Put route Co-Curricular Activities New Added
router.put('/cocurricularActivities/:id', (req, res) => {
    CocurricularActivities.findOne({ _id: req.params.id })
        .then(result => {
            result.ncc = req.body.ncc === "on";
            result.nss = req.body.nss === "on";
            result.otherActivities = req.body.otherActivities === "on";
            result.otherActivitiesDetails = req.body.otherActivitiesDetails || '';
            result.none = req.body.none === "on";
            result.scoreSix = req.body.scoreSix;

            result.save()
                .then(() => {
                    req.flash('success_msg', 'Data updated successfully');
                    res.redirect('/category-2/cocurricularActivities');
                })
                .catch(() => {
                    req.flash('error_msg', 'Data not updated. Please try again.');
                    res.redirect('/category-2/cocurricularActivities');
                });
        })
        .catch(() => {
            req.flash('error_msg', 'User not found. Please login again.');
            res.redirect('/category-2/cocurricularActivities');
        });
});

// Update Corporate Life
router.put('/corporateLife/:id', (req, res) => {
    CorporateLife.findOne({ _id: req.params.id })
        .then(result => {
            result.industryInteractions = req.body.industryInteractions === "on";
            result.academicCommittees = req.body.academicCommittees === "on";
            result.otherContributions = req.body.otherContributions === "on";
            result.otherContributionsDetails = req.body.otherContributionsDetails || '';
            result.scoreSeven = req.body.scoreSeven;

            result.save()
                .then(() => {
                    req.flash('success_msg', 'Data updated successfully');
                    res.redirect('/category-2/corporateLife');
                })
                .catch(() => {
                    req.flash('error_msg', 'Data not updated. Please try again.');
                    res.redirect('/category-2/corporateLife');
                });
        })
        .catch(() => {
            req.flash('error_msg', 'User not found. Please login again.');
            res.redirect('/category-2/corporateLife');
        });
});

// PUT Method for Professional Development
router.put('/professionalDevelopment/:id', upload.single('document'), (req, res) => {
    ProfessionalDevelopment.findOne({ _id: req.params.id })
        .then(result => {
            result.seminars = req.body.seminars === "on";
            result.professionalBody = req.body.professionalBody === "on";
            result.professionalBodyDetails = req.body.professionalBodyDetails || '';
            if (req.file) {
                result.document = req.file.path.replace(/\\/g, '/'); // Update file path if a new file is uploaded
            }
            result.scoreEight = req.body.scoreEight;

            result.save()
                .then(() => {
                    req.flash('success_msg', 'Data updated successfully');
                    res.redirect('/category-2/professionalDevelopment');
                })
                .catch(() => {
                    req.flash('error_msg', 'Data not updated. Please try again.');
                    res.redirect('/category-2/professionalDevelopment');
                });
        })
        .catch(() => {
            req.flash('error_msg', 'User not found. Please login again.');
            res.redirect('/category-2/professionalDevelopment');
        });
});







//DELETE Methods

// New Added DELETE route Co-Curricular Activities
router.delete('/cocurricularActivities/delete/:id', (req, res) => {
    CocurricularActivities.deleteOne({ _id: req.params.id })
        .then(() => {
            req.flash('success_msg', 'Record deleted successfully');
            res.redirect('/category-2/cocurricularActivities');
        })
        .catch(() => {
            req.flash('error_msg', 'Record not deleted. Please try again.');
            res.redirect('/category-2/cocurricularActivities');
        })
});

// Delete Corporate Life Record
router.delete('/corporateLife/delete/:id', (req, res) => {
    CorporateLife.deleteOne({ _id: req.params.id })
        .then(() => {
            req.flash('success_msg', 'Record deleted successfully');
            res.redirect('/category-2/corporateLife');
        })
        .catch(() => {
            req.flash('error_msg', 'Record not deleted. Please try again.');
            res.redirect('/category-2/corporateLife');
        })
});

// DELETE Method for Professional Development
router.delete('/professionalDevelopment/delete/:id', (req, res) => {
    ProfessionalDevelopment.deleteOne({ _id: req.params.id })
        .then(() => {
            req.flash('success_msg', 'Record deleted successfully');
            res.redirect('/category-2/professionalDevelopment');
        })
        .catch(() => {
            req.flash('error_msg', 'Record not deleted. Please try again.');
            res.redirect('/category-2/professionalDevelopment');
        });
});






module.exports = router;