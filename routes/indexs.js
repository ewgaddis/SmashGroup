var express = require('express');
var routers = express.Router();

var util = require('../util');

// Get route controllers
var signup = require('../controllers/signup');
var login  = require('../controllers/login');
var logout = require('../controllers/logout');
var users  = require('../controllers/users');
var groups = require('../controllers/groups');

routers.get('/', function(req, res, next) {
    if(req.session.user)
        res.render('index');
    else
        res.redirect('https://' + util.getHostName() + '/login');
});

// Secure routes
routers.get('/login',  login.get);
routers.get('/signup', signup.get);
routers.get('/logout', logout.get);
	
routers.post('/login',  login.post);
routers.post('/signup', signup.post);

routers.get('/users/get', users.getUser);

routers.get('/groups/getJoined', groups.getJoinedGroups);
routers.post('/groups/getByName', groups.getByName);
routers.post('/groups/getByCategory', groups.getByCategory);

module.exports = routers;
