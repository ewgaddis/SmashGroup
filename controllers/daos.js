var util = require('../util');
var crypto = require('crypto');
var mongoose = require('mongoose');

require('../schema');

var User = mongoose.model('User');


exports.findUser = function(userName, callback)
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

exports.addUser = function(user)
{
	//does this work
}

//adduser para (nam)
//findgroup
