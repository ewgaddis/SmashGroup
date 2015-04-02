var mongoose = require('mongoose');

var expressSession = require('express-session');
var mongoStore = require('connect-mongo')({ session: expressSession });

var conn = mongoose.connect('mongodb://localhost/SmashGroup');

exports.mongoose = mongoose;

exports.session = expressSession({
	secret: 'SECRET',
	cookie: { maxAge: 60*60*1000 },
	store: new mongoStore({
		db:			mongoose.connection.db,
		collection:	'sessions'
	})
});