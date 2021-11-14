const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
    res.send('auth endpoint');
});

router.post('/login', (req, res) => {
    res.send('login endpoint');
});

module.exports = router;
