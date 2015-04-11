var util = require('../util.js');
var daos = require('./daos.js');

exports.getUser = function(req, res, next) {
	if(req.session.user)
	{
		daos.getUser(req.session.username, function(user, err) {
			if(err) {
				res.json(404, { msg: 'Failed to get user.' });
			}
			
			res.json(user);
		});
	} else {
		res.json(404, { msg: 'Access denied.' });
	}
};

exports.updateUser = function(req, res, next) {
	if(req.session.user) {
		daos.getUser(req.session.username, function(user, err) {
			if(err) {
				res.json(500, { msg: 'Failed to get user.' });
			}
			
			user.firstName   = req.body.firstname;
			user.lastName    = req.body.lastname;
			user.email       = req.body.email;
			user.phoneNumber = req.body.phone;
			
			daos.getCategories(function(categories, err) {
				if(err) {
					res.json(500, { msg: 'Failed to get categories.' });
				}
				
				user.interests = [];
				
				for(var i = 0; i < categories.length; ++i) {
					if(req.body[categories[i].name]) {
						user.interests.push(categories[i]._id);
					}
				}
				
				user.save(function(err) {
					if(err) {
						console.log(err.toString());
					}
					
					res.redirect('/#/profile');
				});
			});
		});
	} else {
		res.json(404, { msg: 'Access denied.' });
	}
};