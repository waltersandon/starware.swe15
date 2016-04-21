var express = require('express');
var router = express.Router();
var sayhello = require('./sayhello');

router.all('/', function (req, res) {
    res.send('api v1');
});

router.get('/sayhello', sayhello);

module.exports = router;
