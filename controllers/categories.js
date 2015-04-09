var util = require('../util.js');
var daos = require('./daos.js');

exports.get = function(req, res, next) {
	daos.getCategories(function(categories, err) {
		if(err) {
			res.json(404, { msg: 'Failed to get categories.' });
		}
		
		res.json(categories);
	});
};