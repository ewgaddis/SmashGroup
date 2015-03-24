var MongoClient = require('mongodb').MongoClient;

var util = require('./util');
var daos = require('./daos');

exports.get = function(req, res) {
	res.sendfile('login.html', { maxAge: 60*60*1000, root: './html/' }, function(err) {});
};

exports.post = function(req, res) {
	MongoClient.connect("mongodb://localhost/", function(err, db) {
		if(err) {
			res.send(500, "Unable to connect to mongo database.");
		} else {
			var SmashGroupDB = db.db("SmashGroup");
			
			console.log(req.body);
			
			daos.findUser(SmashGroupDB, req.body.username, function(err, user) {
				if(!user) {
					err = 'User not found.';
				} else if(user.password === util.hashPW(req.body.password.toString())) {
					// user logged in
					res.redirect('http://localhost/');
				} else {
					err = 'Authentication failed.';
				}
				
				if(err) {
					res.send(err);
				}
			});
		}
	});
};