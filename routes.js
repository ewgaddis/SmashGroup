var express = require('express');

var HOST_NAME = 'localhost'; // NOTE: Change this to proper host when done testing.

// Function that initializes express server routes
module.exports = function(app, apps) {
	// Get route controllers
	var signup = require('./controllers/signup');
	var login  = require('./controllers/login');
	
	// Serve default static files
	app.use('/', express.static('./html'));
	
	// Redirects specific normal routes to secure routes
	app.get('/login', function(req, res) {
		res.redirect('https://' + HOST_NAME + '/login');
	});
	
	app.get('/signup', function(req, res) {
		res.redirect('https://' + HOST_NAME + '/signup');
	});
	
	// Secure routes
	apps.get('/login',  login.get);
	apps.get('/signup', signup.get);
	
	apps.post('/login',  login.post);
	apps.post('/signup', signup.post);
}