var express = require('express');
var router = express.Router();

router.all('/', function (req, res) {
    res.redirect('./api/v1');
});

module.exports = router;