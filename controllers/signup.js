var MongoClient = require('mongodb').MongoClient;

var util = require('../util');
var daos = require('./daos');

exports.get = function(req, res) {
	if(req.session.user) {
		res.redirect('/');
	}

	res.render('signup');
};

exports.post = function(req, res) 
{
	var foundyou = daos.getUser(req.body.username, function(user, err){
        
		if (!user){
            var body = req.body;
            
            daos.getCategories(function(categories, err) {
				var interests = [];
				
                if(categories)
                {
                    for(var i = 0; i < categories.length; ++i) {
                        if(req.body[categories[i].name]) {
                            interests.push(categories[i]._id);
                        }
                    }
                }
				
	            daos.addUser(body.firstname, body.lastname, body.username,
	                util.hashPW(body.password), body.email, body.phone, [], interests);
	            
	            res.sendStatus(200);
            });
		}
        else {
			err = 'Username: ' + req.body.username + ' already in use.';
		}
				
		if(err) {
			req.session.regenerate(function() {
				res.send(404, err);
			});
		}
	});
};
