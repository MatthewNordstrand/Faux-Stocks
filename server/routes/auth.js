const express = require('express');
const router = express.Router();

const UserData = require('../models/UserData');
const passport = require('passport');

/* GET users listing. */
router.get('/', (req, res, next) => {
    res.send('auth endpoint');
});

router.post('/login', (req, res) => {
    res.send('login endpoint');
});

router.post('/register', (req, res) => {
    UserData.register(
        new UserData({ username: req.body.username, email: req.body.email }),
        req.body.password,
        (err, user) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.json({success: false, status: 'Username already in use.'});
            } else {
                user.save(err => {
                    if (err) {
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'application/json');
                        res.json({success: false, status: 'Internal server error.'});
                        return;
                    }
                    passport.authenticate('local')(req, res, () => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json({success: true, status: 'Registration Successful!'});
                    })
                });
            }
        }
    );
});

module.exports = router;
