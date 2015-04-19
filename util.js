var crypto = require('crypto');

//<<<<<< HEAD
//var HOST_NAME = '52.11.21.224'; // NOTE: Change this to proper host when done testing.

//exports.getHostName = function() {
//	return HOST_NAME;
//}

//=======
//>>>>>>> caedc7380767461cb3d1e422a0b6e77011bcc160
exports.hashPW = function(pwd) {
	return crypto.createHash('sha256').update(pwd).digest('base64').toString();
}
