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

exports.getGroupById = function(groupId, callback)
{
	Group.findOne({_id: groupId}).exec(function(err, group) {
		if(err) {
			callback(null, err);
		} else {
			callback(group, null);
		}
	});
}

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
//addRequest(senderId, groupId)
exports.addRequest = function(newUserName, groupToadd)
{
	Group.findOne({name:groupToadd}).exec(function(err,group)
	{
		if(group.length==0)
		{
			console.log("error cant find group");
		}
		else
		{
			group.update({membershipRequests:newUserName});
			// i have no clue on this
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