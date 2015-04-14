var util = require('../util.js');
var daos = require('./daos.js');

function getNextGroup(groups, groupIds, index, res) {
	if(index == groupIds.length) {
		res.json(groups);
		return;
	}
	
	daos.getGroupById(groupIds[index], function(group, err) {
		if(err) {
			console.log('Failed to get next group.');
			res.json(500, { msg: 'Failed to get groups.' });
		} else {
			groups[index] = group;
			++index;
			
			getNextGroup(groups, groupIds, index, res);
		}
	});
};

exports.getJoinedGroups = function(req, res, next) {
	if(req.session.user)
	{
		daos.getUser(req.session.username, function(user, err) {
			if(err) {
				res.json(404, { msg: 'Failed to get user.' });
				return;
			}
			
			var groups = [];
		
			getNextGroup(groups, user.groups, 0, res);
		});
	} else {
		res.json(404, { msg: 'Access denied.' });
	}
};

exports.getById = function(req, res, next) {
	daos.getGroupById(req.body.id, function(group, err) {
		if(err) {
			res.json(404, { msg: 'Failed to get group.' });
		} else {
			res.json(group);
		}
	});
};

exports.getByName = function(req, res, next) {
	daos.getGroup(req.body.name, function(group, err) {
		if(err) {
			res.json(404, { msg: 'Failed to get group.' });
		} else {
			res.json(group);
		}
	});
};

exports.getByCategory = function(req, res, next) {
	daos.getGroupsByCategory(req.body.category, function(groups, err) {
		if(err) {
			res.json(404, { msg: 'Failed to get groups.' });
		} else {
			res.json(groups);
		}
	});
};

exports.getAll = function(req, res, next){
	daos.getAllGroups(function(groups, err){
		if (err){
			res.json(404, { msg: 'Failed to get groups.' });
		}
		else{
			res.json(groups);
		}
	});
};