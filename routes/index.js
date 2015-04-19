var express = require('express');
var router = express.Router();

var util = require('../util.js');

router.get('*', function(req, res, next) {
    res.redirect("https://" + req.headers.host + req.url);
});

module.exports = router;
