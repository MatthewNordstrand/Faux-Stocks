var express = require('express');
var router = express.Router();

const usersRouter = require('./users');
const authRouter = require('./auth');

router.use('/users', usersRouter);
router.use('/auth', authRouter);

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('API endpoint');
});

module.exports = router;
