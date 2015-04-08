var util = require('../util');

exports.get = function(req, res, next) {
	req.session.destroy(function() {
		res.redirect('http://' + util.getHostName() + '/');
	});
};