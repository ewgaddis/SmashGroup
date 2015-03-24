var crypto = require('crypto');

exports.hashPW = function(pwd) {
	return crypto.createHash('sha256').update(pwd).digest('base64').toString();
}