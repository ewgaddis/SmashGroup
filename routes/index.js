var express = require('express');
var router = express.Router();

var util = require('../util.js');

router.get('/', function(req, res, next) {
  res.render('index');
});

// Redirects specific normal routes to secure routes
router.get('/login', function(req, res, next) {
	res.redirect('https://' + util.getHostName() + '/login');
});
	
router.get('/signup', function(req, res, next) {
	res.redirect('https://' + util.getHostName() + '/signup');
});

module.exports = router;