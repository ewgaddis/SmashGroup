var util = require('../util');
var crypto = require('crypto');
var mongoose = require('mongoose');

var schema = require('../schema');

var User = mongoose.model('User');


exports.getUser = function(userName, callback)
{
	User.find({username:userName}).exec(function(err,user)
	{
		if(user.length == 0)
		{
			callback(null, err);
		} else {
			callback(user[0], null);
		}
	});
}

exports.addUser = function(fname, lname, uname, pw, em, phone, gps, inters)
{
	var newGuy = new User({
		firstName: fname,
		lastName: lname,
		username: uname,
		password: pw,
		email : em,
		phoneNumber: phone,
		groups: gps,
		interests: inters
	});
    
    newGuy.save(function(err, inserted) {
        if (err)
            console.error(err);
        else
            console.dir(inserted);
	});
}

var Group = mongoose.model('Group');
exports.getGroup = function(groupName, callback)
{
	Group.find({name:groupName}).exec(function(err,group)
	{
        if(group.length == 0)
		{
			callback(null, err);
		} else {
			callback(group[0], null);
		}
	});
}

function getGroupById(groupId, callback)
{
	Group.findOne({_id: groupId}).exec(function(err, group) {
		if(err) {
			callback(null, err);
		} else {
			callback(group, null);
		}
	});
}

exports.getGroupById = getGroupById;

//getGroupsByCategory(category)
exports.getGroupsByCategory = function(Category, callback)
{
	Group.find({category:Category}).exec(function(err,groups)
	{
		if(groups.length == 0)
		{
			callback(null, err);
		} else {
			callback(groups[0], null);
		}
	});
}
//getGroupsByTitle(title) what is this
//getGroupBy zip
exports.getGroupsByZip = function(zip, callback)
{
	Group.find({zipcode:zip}).exec(function(err,groups)
	{
		if(groups.length == 0)
		{
			callback(null, err);
		} else {
			callback(groups[0], null);
		}
	});
}
//addGroup(group)
exports.addGroup = function(gname, descrip, sched, zip,adms,membs, membRecs, categor, comms)
{
	var newGroup = new Group({
		name: gname,
		description: descrip,
		schedule: sched,
		zipcode: zip,
		admins : adms,
		members: membs,
		membershipRequests: membRecs,
		category: categor,
		comments: comms

	});

	newGroup.save(function(err, newGroup) {
  	if (err) return console.error(err);
  		console.dir(newGroup);
	});
	//does this work
	//User.Insert
}

function addCommentToGroup(groupId, newComment, callback) {
	getGroupById(groupId, function(group, err) {
		if(err) {
			callback(err);
			return;
		}
		
		group.comments.push(newComment._id);
		Group.update({ _id: groupId }, {
			$set: {
				comments: group.comments
			}
		}).exec(function(err, results) {
			if(err) {
				callback(err);
				return;
			}
		
			callback(null);
		});
	});
}

//addRequest(senderId, groupId)
exports.addRequest = function(userId, groupId, callback)
{
	Group.findOne({_id:groupId}).exec(function(err,group)
	{
		if(err)
		{
			callback(err);
			return;
		}
		else
		{
			group.membershipRequests.push(userId);
			
			Group.update({ _id: groupId }, {
				$set: {
					membershipRequests: group.membershipRequests
				}
			}).exec(function(err, results) {
				if(err) {
					callback(err);
					return;
				}
			
				callback(null);
			});
		}
		
	});	
}
//getRequests(groupId)
exports.getRequests=function(groupName, callback)
{
	Group.findOne({name:groupName}).exec(function(err,group)
	{
		if(group.length == 0)
		{
			callback(null, err);
		} else {
			callback(group[0], null);
		}
	});
}

//addMember(userId, groupId)

var Category = mongoose.model('Category');

exports.getCategories = function(callback)
{
	Category.find().exec(function(err, categories)
	{
		if(categories.length == 0)
		{
			callback(null, err);
		} else {
			callback(categories, null);
		}
	});
}

exports.getAllGroups = function(callback){
	Group.find().exec(function(err,groups){
		if(groups.length == 0){
			callback(null, err);
		}
		else{
			callback(groups, null);
		}
	});
};

var Comment = mongoose.model('Comment');

exports.getComment = function(commentId, callback)
{
	Comment.find({ _id: commentId }).exec(function(err, comments)
	{
		if(comments.length == 0)
		{
			callback(null, err);
		} else {
			callback(comments[0], null);
		}
	});
}

exports.addComment = function(groupId, username, content, callback) {
	var newComment = new Comment({
		commentText: content,
		user:        username
	});

	newComment.save(function(err, newComment) {
  		if (err) {
  			callback(null, err);
  			return;
		}
  			
  		console.dir(newComment);
  		
  		addCommentToGroup(groupId, newComment, function(err) {
	  		callback(newComment, err);
  		});
	});
}
