var util = require('../util');
var crypto = require('crypto');
var mongoose = require(('mongoose'));

User = mongoose.model('User');


exports.findUser(userName, callback)
{
	User.findOne({username:userName}).exec(function(err,user)
	{

		if(!user)
		{
			user=null;
		}
		callback(user,err);
	});
}

exports.adduser(user)
{
	
}

//adduser para (nam)
//findgroup
