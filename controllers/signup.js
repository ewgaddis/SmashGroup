var MongoClient = require('mongodb').MongoClient;

var util = require('./util');
var daos = require('./daos');

exports.get = function(req, res) {
	res.sendfile('signup.html', { maxAge: 60*60*1000, root: './html/' }, function(err) {});
};

exports.post = function(req, res) 
{
	console.log("In Post");
	MongoClient.connect("mongodb://localhost/", function(err, db) 
	{
		if(err) {
			res.send(500, "Unable to connect to mongo database.");
		} 
		else 
		{
			db.collection("User", function(err,user){
				if (err) throw err;
				console.log(req.body.username);
				var foundyou = daos.findUser(req.body.username, function(user, err){
					console.log("in callback");
					if (err){
						err = "username already in use!";
						throw err;
					}
					if (user == null){
						console.log("user not found");
					}
				});
				//console.log(foundyou);
			});
			//console.log(foundyou);
			// var SmashGroupDB = db.db("SmashGroup");
			
			// console.log(req.body);
			// // var checkName = SmashGroupDB.findUser(req.body.username.toString());

			// // if(req.body.username === foundyou)
			// // {
			// // 	// username already taken
			// // 	err = 'username already in use';
					
			// // }
			// else
			// {
			// 	db.collection('users').insert(req.body,function(err, records)
			// 	{
			// 		console.log("Record added as "+records[0]._id);
			// 		res.status(200);
			// 		res.end("{ textStatus: \"Success\" }");
			// 		res.redirect('http://52.11.21.224/');
			// 	});
			// }
		
			// daos.findUser(SmashGroupDB, req.body.username, function(err, data) 
			// {
			// 	console.log(data);

			// 	if(err) 
			// 	{
			// 		res.send(err);
			// 	}
			// 	if(data.username === util.findUser(req.body.username.toString()))
			// 	{
			// 		// username already taken
			// 		err = 'username already in use';
					
			// 	} 
			// 	else 
			// 	{
			// 		db.collection('users').insert(req.body,function(err, records)
			// 		{
			// 			//console.log("Record added as "+records[0]._id);
			// 			res.status(200);
			// 			res.end("{ textStatus: \"Success\" }");
			// 			res.redirect('http://52.11.21.224/');
			// 		});
			// 	}
			// });
		}
	});
};
