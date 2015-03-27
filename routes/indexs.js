var express = require('express');
var routers = express.Router();

// Get route controllers
var signup = require('../controllers/signup');
var login  = require('../controllers/login');

// Secure routes
routers.get('/login',  login.get);
routers.get('/signup', signup.get);
	
routers.post('/login',  login.post);
routers.post('/signup', signup.post);

module.exports = routers;
