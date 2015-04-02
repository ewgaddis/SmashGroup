var util = require('../util');
var daos = require('./daos');

exports.get = function(req, res, next) {
	res.render('login');
};

exports.post = function(req, res, next) {
	console.log(req.body);
			
	daos.findUser(req.body.username, function(user, err) {
		if(!user) {
			err = 'User not found.';
		} else if(user.password === util.hashPW(req.body.password.toString())) {
			// user logged in
			res.redirect('http://localhost/');
		} else {
			err = 'Authentication failed.';
		}
				
		if(err) {
			res.send(err);
		}
	});
};