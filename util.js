var crypto = require('crypto');

var HOST_NAME = '52.11.21.224'; // NOTE: Change this to proper host when done testing.

exports.getHostName = function() {
	return HOST_NAME;
}

exports.hashPW = function(pwd) {
	return crypto.createHash('sha256').update(pwd).digest('base64').toString();
}
