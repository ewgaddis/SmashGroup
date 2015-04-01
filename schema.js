var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  username: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, required: true},
  phoneNumber: String,
  groups: [
  	Schema.Types.ObjectID
  ],
  interests: [
  	Schema.Types.ObjectID
  ]
}, {collection:'users'});

userSchema.methods.fullName = function() {
	return this.fristName + ' ' + this.lastName;
} 

var groupSchema = new Schema({
  name: {type: String, required: true},
  description: String,
  schedule: String,
  zipcode: String,
  admins: [
  	Schema.Types.ObjectID
  ],
  members: [
  	Schema.Types.ObjectID
  ],
  membershipRequests: [
  	Schema.Types.ObjectID
  ],
  category: [
  	Schema.Types.ObjectID
  ],
  comments: [
  	Schema.Types.ObjectID
  ]
}, {collection:'groups'});

var commentSchema = new Schema({
  commentText: String,
  user: String,
  timestamp: { type : Date, default: Date.now }
}, {collection:'comments'});

var categorySchema = new Schema({
  name: String
}, {collection:'categories'});

mongoose.model('User', userSchema);
mongoose.model('Group', groupSchema);
mongoose.model('Comment', commentSchema);
mongoose.model('Category', categorySchema);