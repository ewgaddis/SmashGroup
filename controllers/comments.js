var util = require('../util.js');
var daos = require('./daos.js');

function getNextComment(comments, commentIds, index, res) {
	if(index == commentIds.length) {
		res.json(comments);
		return;
	}
	
	daos.getComment(commentIds[index], function(comment, err) {
		if(err) {
			console.log('Failed to get next comment.');
			res.json(500, { msg: 'Failed to get comments.' });
		} else {
			comments[index] = comment;
			++index;
			
			getNextComment(comments, commentIds, index, res);
		}
	});
};

exports.get = function(req, res, next) {
	var comments = [];
		
	getNextComment(comments, req.body.ids, 0, res);
};

exports.add = function(req, res, next) {
	if(req.session.user)
	{
		daos.addComment(req.body.groupId, req.session.username, req.body.content, function(newComment, err) {
			if(err) {
				res.json(500, { msg: 'Failed to add comment.' });
			} else {
				console.log(newComment);
				res.json(newComment);
			}
		});
	} else {
		res.json(404, { msg: 'Access denied.' });
	}
};