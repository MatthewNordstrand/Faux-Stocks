var express = require('express');
var router = express.Router();

const usersRouter = require('./users');

router.use('/users', usersRouter);

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('API endpoint');
});

module.exports = router;
