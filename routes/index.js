var express = require('express');
var router = express.Router();

var util = require('../util.js');

var logout = require('../controllers/logout');
var users  = require('../controllers/users');

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

router.get('/logout', logout.get);

router.get('/users/get', users.getUser);

module.exports = router;