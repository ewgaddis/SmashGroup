var crypto = require('crypto');

var HOST_NAME = 'localhost'; // NOTE: Change this to proper host when done testing.

exports.getHostName = function() {
	return HOST_NAME;
}

exports.hashPW = function(pwd) {
	return crypto.createHash('sha256').update(pwd).digest('base64').toString();
}