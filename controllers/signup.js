var MongoClient = require('mongodb').MongoClient;

var util = require('../util');
var daos = require('./daos');

exports.get = function(req, res) {
	if(req.session.user) {
		res.redirect('http://' + util.getHostName() + '/');
	}

	res.render('signup');
};

exports.post = function(req, res) 
{
	var foundyou = daos.getUser(req.body.username, function(user, err){
        
		if (!user){
            var body = req.body;
            daos.addUser(body.firstname, body.lastname, body.username,
                util.hashPW(body.password), body.email, "", [], []);
            
            res.send('Sucess! Please sign in.');
		}
        else {
			err = 'Username:' + req.body.username + 'already in use.';
		}
				
		if(err) {
			req.session.regenerate(function() {
				res.send(err);
			});
		}
	});
};
