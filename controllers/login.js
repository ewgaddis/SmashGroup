var util = require('../util');
var daos = require('./daos');

exports.get = function(req, res, next) {
	if(req.session.user) {
		res.redirect('/');
	}
	
	res.render('login');
};

exports.post = function(req, res, next) {
			
	daos.getUser(req.body.username, function(user, err) {
		if(!user) {
			err = 'Invalid username or password';
		} else if(user.password === util.hashPW(req.body.password.toString())) {
			// user logged in
			req.session.regenerate(function() {
				req.session.user = user.id;
				req.session.username = user.username;

				res.sendStatus(200);
			});
		}
        else {
			err = 'Invalid username or password';
		}
				
		if(err) {
			req.session.regenerate(function() {
				res.send(404, err);
			});
		}
	});
};
