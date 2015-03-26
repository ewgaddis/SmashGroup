var mongoose = require('mongoose');
var util     = require('./controllers/util');

var db = mongoose.connect('mongodb://localhost/SmashGroup');

require('./schema.js');

var User     = mongoose.model('User');
var Group    = mongoose.model('Group');
var Comment  = mongoose.model('Comment');
var Category = mongoose.model('Category');

function addCategory(name) {
	var category = new Category({
		name: name
	});
	
	category.save(function(err, category) {
		console.log('Category: ' + category.name + ' saved.');
	});
}

Group.remove().exec(function() {
	User.remove().exec(function() {
		Comment.remove().exec(function() {
			Category.remove().exec(function() {
				console.log('Adding categories');
				addCategory('Video Games');
				addCategory('Movies');
				addCategory('TV Shows');
				addCategory('Sports');
				addCategory('Misc');
			});
		});
	});
});