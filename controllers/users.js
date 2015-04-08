var util = require('../util.js');

exports.getUser = function(req, res, next) {
	if(req.session.user)
	{
		res.json({
			firstName: 'Billy',
			lastName:  'Bob',
			username:  'TestUser1',
			password:  util.hashPW('test1'),
			email:     'bob@gmail.com'
		});
	} else {
		res.json(404, { msg: 'Access denied.' });
	}
};