var mongoose = require('mongoose');
var util     = require('./util');

var db = mongoose.connect('mongodb://localhost/SmashGroup');

require('./schema.js');

var User     = mongoose.model('User');
var Group    = mongoose.model('Group');
var Comment  = mongoose.model('Comment');
var Category = mongoose.model('Category');

var category1;
var category2;

var user1;
var user2;

var comment1;
var comment2;
var comment3;
var comment4;
var comment5;
var comment6;

var group1;
var group2;

function addCategory(name, next) {
	var category = new Category({
		name: name
	});
	
	category.save(function(err, category) {
		console.log('Category saved:');
		console.log(category.toString());
		
		next(category._id);
	});
}

function addComment(user, content, next) {
	var comment = new Comment({
		commentText: content,
		user:        user
	});
	
	comment.save(function(err, comment) {
		console.log('Comment saved: ');
		console.log(comment.toString());
		
		next(comment._id);
	});
}

function addGroup(title, description, category, schedule, zipcode, admin, member, comment1, comment2, comment3, next) {
	var group = new Group({
		name:        title,
		description: description,
		category:    [ category ],
		schedule:    schedule,
		zipcode:     zipcode,
		admins:      [ admin ],
		members:     [ admin, member ],
		comments:    [ comment1, comment2, comment3 ]
	});
	
	group.save(function(err, group) {
		console.log('Group saved:');
		console.log(group.toString());
		
		next(group._id);
	});
}

function addUser(firstName, lastName, username, password, email, phoneNumber, next) {
	var user = new User({
		firstName:   firstName,
		lastName:    lastName,
		username:    username,
		password:    util.hashPW(password),
		email:       email,
		phoneNumber: phoneNumber
	});
	
	user.save(function(err, user) {
		console.log('User saved: ');
		console.log(user.toString());
		
		next(user);
	});
}

function addCategories() {
	addCategory('Video Games', function(id) {
	category1 = id;
	addCategory('Movies', function(id) {
	category2 = id;
	addCategory('TV Shows', function(id) {
	addCategory('Sports', function(id) {
	addCategory('Misc', addUsers);
	});});});});
}

function addUsers(categoryId) {
	addUser('Billy', 'Bob',    'TestUser1', 'test1', 'billy@gmail.com',    '555-1234', function(user) {
	user1 = user;
	addUser('Harry', 'Potter', 'TestUser2', 'test2', 'harry@hogwarts.edu', '',         addComments);
	});
}

function addComments(user) {
	user2 = user;
	
	addComment(user1.username, 'This is a test comment!', function(id) {
	comment1 = id;
	addComment(user2.username, 'This is another comment.', function(id) {
	comment2 = id;
	addComment(user1.username, 'Hello world!', function(id) {
	comment3 = id;
	addComment(user1.username, 'Goodbye', function(id) {
	comment4 = id;
	addComment(user2.username, 'This is what?', function(id) {
	comment5 = id;
	addComment(user2.username, 'When are we meeting?', addGroups);
	});});});});});
}

function addGroups(commentId) {
	comment6 = commentId;
	
	addGroup('BYU Smash Bros.', 'Come and play!', category1, 'FS 7-9 pm', '84606',
			 user1._id, user2._id, comment1, comment5, comment6, function(id) {
	
	group1 = id;
	
	addGroup('Doctor Who', 'Time and Space', category2, 'MWF 8-9 pm', '',
			 user2._id, user1._id, comment2, comment3, comment4, function(id) {
		
		group2 = id;
		
		user1.interests = [ category1 ];
		user2.interests = [ category2, category1 ];
		
		user1.groups = [ group1, group2 ];
		user2.groups = [ group2, group1 ];
		
		user1.save(function(err, user) {
			console.log('Updated user 1:');
			console.log(user.toString());
			
			user2.save(function(err, user) {
				console.log('Updated user 2:');
				console.log(user.toString());
				
				mongoose.disconnect();
			});
		});
	});});
}

Group.remove().exec(function() {
	User.remove().exec(function() {
		Comment.remove().exec(function() {
			Category.remove().exec(function() {
				addCategories();
			});
		});
	});
});