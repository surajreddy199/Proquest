const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const async = require('async');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const router = express.Router();
require('dotenv').config();
// Load faculty model
require('../models/Users/Faculty');
const Faculty = mongoose.model('users');

// Load HOD model
require('../models/Users/Hod');
const Hod = mongoose.model('hod');

// Load Manager model
require('../models/Users/ManagerDB');
const Manager = mongoose.model('management_user');

// Reset password for faculty
router.get('/faculty', function (req, res) {
    res.render('users/faculty/forgot');
});

router.post('/faculty', function (req, res, next) {
    async.waterfall([
        done => {
            crypto.randomBytes(20, function (err, buf) {
                var token = buf.toString('hex');
                done(err, token);
            });
        },
        (token, done) => {
            Faculty.findOne({ email: req.body.email }, function (err, user) {
                if (!user) {
                    req.flash('error_msg', 'No account with that email address exists.');
                    return res.redirect('/users/faculty/forgot');
                }

                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 600000; // 10 mins

                user.save(function (err) {
                    done(err, token, user);
                });
            });
        },
        (token, user, done) => {
            var smtpTransport = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'watch.moviespixel@gmail.com',
                    pass: process.env.PASSWD
                }
            });
            var mailOptions = {
                to: user.email,
                from: 'watch.moviespixel@gmail.com',
                subject: 'Apsit Appraisal System Password Reset',
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    'http://' + req.headers.host + '/forgot/reset/faculty/' + token + '\n\n' +
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };
            smtpTransport.sendMail(mailOptions, function (err) {
                console.log('Mail sent');
                req.flash('success_msg', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
                if (typeof done === 'function') {
                    done(err);
                } else {
                    if (err) {
                        console.error("Mail error:", err);
                        return res.status(500).json({ error: err.message });
                    }
                    return res.redirect('/users/faculty/forgot');
                }
            });
        }
    ], err => {
        if (err) return next(err);
        req.flash('error_msg', 'Error occurred while sending mail');
        res.redirect('/users/faculty/forgot');
    });
});




router.get('/reset/faculty/:token', function (req, res) {
    Faculty.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function (err, user) {
        if (!user) {
            req.flash('error', 'Password reset token is invalid or has expired.');
            return res.redirect('/users/faculty/forgot');
        }
        res.render('users/faculty/reset', { token: req.params.token });
    });
});

router.post('/reset/faculty/:token', function (req, res) {
    async.waterfall([
        done => {
            Faculty.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function (err, user) {
                if (!user) {
                    req.flash('error_msg', 'Password reset token is invalid or has expired.');
                    return res.redirect('back');
                }
                if (req.body.password === req.body.confirm) {
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(req.body.password, salt, (err, hash) => {
                            if (err) throw err;
                            user.password = hash;
                            user.save()
    .then(user => {
        req.flash('success_msg', 'Password Changed for user ' + user.email + ' successfully');
        res.redirect('/users/faculty/login');
        if (typeof done === 'function') {
            done(null, user);
        }
    })
    .catch(err => {
        console.error("Error saving user:", err);
        res.status(500).json({ error: err.message });
    });

                        });
                    });
                } else {
                    req.flash("error_msg", "Passwords do not match.");
                    return res.redirect('back');
                }
            });
        },
        (user, done) => {
            var smtpTransport = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'watch.moviespixel@gmail.com',
                    pass: process.env.PASSWD
                }
            });
            var mailOptions = {
                to: user.email,
                from: 'watch.moviespixel@gmail.com',
                subject: 'Your password has been changed',
                text: 'Hello,\n\n' +
                    'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
            };
            smtpTransport.sendMail(mailOptions, function (err) {
                req.flash('success_msg', 'Success! Your password has been changed.');
                if (typeof done === 'function') {
                    done(err);
                } else {
                    if (err) {
                        console.error("Mail error:", err);
                        return res.status(500).json({ error: err.message });
                    }
                    return res.redirect('/users/faculty/login');
                }
            });
            
        }
    ], err => {
        req.flash('error_msg', 'Error occurred while sending mail');
        res.redirect('/users/faculty/login');
    });
});

// Reset password for HoD
router.get('/hod', function (req, res) {
    res.render('users/hod/forgot');
});

router.post('/hod', function (req, res, next) {
    async.waterfall([
        done => {
            crypto.randomBytes(20, function (err, buf) {
                var token = buf.toString('hex');
                done(err, token);
            });
        },
        (token, done) => {
            Hod.findOne({ email: req.body.email }, function (err, user) {
                if (!user) {
                    req.flash('error_msg', 'No account with that email address exists.');
                    return res.redirect('/users/hod/forgot');
                }

                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 600000; // 10 mins

                user.save(function (err) {
                    done(err, token, user);
                });
            });
        },
        (token, user, done) => {
            var smtpTransport = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'watch.moviespixel@gmail.com',
                    pass: process.env.PASSWD
                }
            });
            var mailOptions = {
                to: req.body.email,
                from: 'watch.moviespixel@gmail.com',
                subject: 'Apsit Appraisal System Password Reset',
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    'http://' + req.headers.host + '/forgot/reset/hod/' + token + '\n\n' +
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };
            smtpTransport.sendMail(mailOptions, function (err) {
                console.log('Mail sent');
                req.flash('success_msg', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
                if (typeof done === 'function') {
                    done(err);
                } else {
                    if (err) {
                        console.error("Mail error:", err);
                        return res.status(500).json({ error: err.message });
                    }
                    return res.redirect('/users/faculty/forgot');
                }
            });
        }
    ], err => {
        if (err) return next(err);
        req.flash('error_msg', 'Error occurred while sending mail');
        res.redirect('/users/hod/forgot');
    });
});

router.get('/reset/hod/:token', function (req, res) {
    Hod.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function (err, user) {
        if (!user) {
            req.flash('error', 'Password reset token is invalid or has expired.');
            return res.redirect('/users/hod/forgot');
        }
        res.render('users/hod/reset', { token: req.params.token });
    });
});

router.post('/reset/hod/:token', function (req, res) {
    async.waterfall([
        done => {
            Hod.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function (err, user) {
                if (!user) {
                    req.flash('error_msg', 'Password reset token is invalid or has expired.');
                    return res.redirect('back');
                }
                if (req.body.password === req.body.confirm) {
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(req.body.password, salt, (err, hash) => {
                            if (err) throw err;
                            user.password = hash;
                            user.save()
    .then(user => {
        req.flash('success_msg', 'Password Changed for user ' + user.email + ' successfully');
        res.redirect('/users/hod/login');
        if (typeof done === 'function') {
            done(null, user);
        }
    })
    .catch(err => {
        console.error("Error saving user:", err);
        res.status(500).json({ error: err.message });
    });

                        });
                    });
                } else {
                    req.flash("error_msg", "Passwords do not match.");
                    return res.redirect('back');
                }
            });
        },
        (user, done) => {
            var smtpTransport = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'watch.moviespixel@gmail.com',
                    pass: process.env.PASSWD
                }
            });
            var mailOptions = {
                to: user.email,
                from: 'watch.moviespixel@gmail.com',
                subject: 'Your password has been changed',
                text: 'Hello,\n\n' +
                    'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
            };
            smtpTransport.sendMail(mailOptions, function (err) {
                req.flash('success_msg', 'Success! Your password has been changed.');
                if (typeof done === 'function') {
                    done(err);
                } else {
                    if (err) {
                        console.error("Mail error:", err);
                        return res.status(500).json({ error: err.message });
                    }
                    return res.redirect('/users/faculty/login');
                }
            });
            
        }
    ], err => {
        req.flash('error_msg', 'Error occurred while sending mail');
        res.redirect('/users/hod/login');
    });
});

// Reset password for Manager
router.get('/manager', function (req, res) {
    res.render('users/management/forgot');
});

router.post('/manager', function (req, res, next) {
    async.waterfall([
        done => {
            crypto.randomBytes(20, function (err, buf) {
                var token = buf.toString('hex');
                console.log("Generated Token:", token);
                done(err, token);
            });
        },


        (token, done) => {
            (async () => {  // Wrap it inside an async IIFE
                try {
                    const user = await Manager.findOne({ email: req.body.email });
                    if (!user) {
                        req.flash('error_msg', 'No account with that email address exists.');
                        return res.redirect('/users/manager/forgot');
                    }
                    user.resetPasswordToken = token;  // Store token
                    user.resetPasswordExpires = Date.now() + 600000; // 1 hour expiration
                     await user.save();  // Save to MongoDB



                    done(null, token, user);
                } catch (err) {
                    done(err);
                }
            })();
        },
        (token, user, done) => {
            var smtpTransport = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'watch.moviespixel@gmail.com',
                    pass: process.env.PASSWD
                }
            });
            var mailOptions = {
                to: req.body.email,
                from: 'watch.moviespixel@gmail.com',
                subject: 'MVSR Appraisal System Password Reset',
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                 'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    'http://' + req.headers.host + '/forgot/reset/manager/' + token + '\n\n' + // Use only token
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n'

            };
            smtpTransport.sendMail(mailOptions, function (err) {
                if (err) {
                    console.error("Mail error:", err);
                    req.flash('error_msg', 'Error occurred while sending mail');
                    return res.redirect('/users/manager/forgot');  // Ensure only one redirect
                }
            
                console.log('Mail sent to:', user.email);  // Debugging log
                req.flash('success_msg', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
            
                if (typeof done === 'function') {
                    return done(null);  // Ensure done() is only called once
                }
            
                res.redirect('/users/faculty/forgot');  // Ensure only one response
            });
        }
     ],
      err => {
        if (err) return next(err);
        req.flash('error_msg', 'Error occurred while sending mail');
        res.redirect('/users/manager/forgot');
    }
    );
});

// router.get('/reset/manager/:token', function (req, res) {
//     Manager.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function (err, user) {
//         if (!user) {
//             req.flash('error', 'Password reset token is invalid or has expired.');
//             return res.redirect('/users/hod/forgot');
//         }
//         res.render('users/management/reset', { token: req.params.token });
//     });
// });

router.get('/reset/manager/:token', async (req, res) => {
    try {
        const user = await Manager.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } });
        if (!user) {
            req.flash('error', 'Password reset token is invalid or has expired.');
            return res.redirect('/users/manager/forgot');
        }
        res.render('users/management/reset', { token: req.params.token });
    } catch (err) {
        console.error('Error:', err);
        res.redirect('/users/manager/forgot');
    }
});


// router.post('/reset/manager/:token', function (req, res) {
//     async.waterfall([
//         done => {
//             Manager.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function (err, user) {
//                 if (!user) {
//                     req.flash('error_msg', 'Password reset token is invalid or has expired.');
//                     return res.redirect('back');
//                 }
//                 if (req.body.password === req.body.confirm) {
//                     bcrypt.genSalt(10, (err, salt) => {
//                         bcrypt.hash(req.body.password, salt, (err, hash) => {
//                             if (err) throw err;
//                             user.password = hash;
//                             user.save()
//     .then(user => {
//         req.flash('success_msg', 'Password Changed for user ' + user.email + ' successfully');
//         res.redirect('/users/manager/login');
//         if (typeof done === 'function') {
//             done(null, user);
//         }
//     })
//     .catch(err => {
//         console.error("Error saving user:", err);
//         res.status(500).json({ error: err.message });
//     });

//                         });
//                     });
//                 } else {
//                     req.flash("error_msg", "Passwords do not match.");
//                     return res.redirect('back');
//                 }
//             });
//         },
//         (user, done) => {
//             var smtpTransport = nodemailer.createTransport({
//                 service: 'Gmail',
//                 auth: {
//                     user: 'watch.moviespixel@gmail.com',
//                     pass: process.env.PASSWD
//                 }
//             });
//             var mailOptions = {
//                 to: req.body.email,
//                 from: 'watch.moviespixel@gmail.com',
//                 subject: 'Your password has been changed',
//                 text: 'Hello,\n\n' +
//                     'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
//             };
//             smtpTransport.sendMail(mailOptions, function (err) {
//                 req.flash('success_msg', 'Success! Your password has been changed.');
//                 if (typeof done === 'function') {
//                     done(err);
//                 } else {
//                     if (err) {
//                         console.error("Mail error:", err);
//                         return res.status(500).json({ error: err.message });
//                     }
//                     return res.redirect('/users/faculty/login');
//                 }
//             });
            
//         }
//     ], err => {
//         req.flash('error_msg', 'Error occurred while sending mail');
//         res.redirect('/users/management/login');
//     });
// });












router.post('/reset/manager/:token', async (req, res) => {
    try {
        const user = await Manager.findOne({
            resetPasswordToken: req.params.token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            req.flash('error_msg', 'Password reset token is invalid or has expired.');
            return res.redirect('back');
        }

        if (req.body.password !== req.body.confirm) {
            req.flash("error_msg", "Passwords do not match.");
            return res.redirect('back');
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);

        // Clear reset token fields
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        req.flash('success_msg', `Password Changed for user ${user.email} successfully`);

        // Send confirmation email
        const smtpTransport = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'watch.moviespixel@gmail.com',
                pass: process.env.PASSWD
            }
        });

        const mailOptions = {
            to: user.email,  // ✅ Fixed: Use user.email instead of req.body.email
            from: 'watch.moviespixel@gmail.com',
            subject: 'Your password has been changed',
            text: `Hello,

This is a confirmation that the password for your account ${user.email} has just been changed.`
        };

        await smtpTransport.sendMail(mailOptions); // ✅ Ensure this is inside an async function

        req.flash('success_msg', 'Success! Your password has been changed.');
        return res.redirect('/users/faculty/login'); // ✅ Ensure only one response is sent

    } catch (err) {
        console.error("Error:", err);
        req.flash('error_msg', 'An error occurred. Please try again.');
        return res.redirect('/users/management/login'); // ✅ Ensure proper error handling
    }
});



module.exports = router;
