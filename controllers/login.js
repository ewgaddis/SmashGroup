var util = require('../util');
var daos = require('./daos');

exports.get = function(req, res, next) {
	if(req.session.user) {
		res.redirect('http://' + util.getHostName() + '/');
	}
	
	res.render('login');
};

exports.post = function(req, res, next) {
	console.log(req.body);
			
	daos.getUser(req.body.username, function(user, err) {
		if(user.length == 0) {
			err = 'User not found.';
		} else if(user[0].password === util.hashPW(req.body.password.toString())) {
			// user logged in
			req.session.regenerate(function() {
				req.session.user = user.id;
				req.session.username = user.username;

				res.redirect('http://' + util.getHostName() + '/');
			});
		}
        else {
            console.log(user);
            console.log(user.password);
            console.log(util.hashPW(req.body.password.toString()));
			err = 'Authentication failed.';
		}
				
		if(err) {
			req.session.regenerate(function() {
				res.send(err);
			});
		}
	});
};
