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