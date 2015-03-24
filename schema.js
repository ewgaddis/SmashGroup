var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  fristName: {type: String, required: true},
  lastName: {type: String, required: true},
  username: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, required: true},
  phoneNumber: String,
  groups: [
  	{type: Schema.Types.ObjectID, ref: 'Group'}
  ],
  intrests: [
  	{type: Schema.Types.ObjectID, ref: 'Categories'}
  ],
}, {collection:'User'});
userSchema.methods.fullName = function() {
	return this.fristName + ' ' + this.lastName;
} 

var groupSchema = new Schema({
  name: {type: String, required: true},
  description: String,
  schedule: String,
  zipcode: String,
  admins: [
  	{type: Schema.Types.ObjectID, ref: 'User'}
  ],
  members: [
  	{type: Schema.Types.ObjectID, ref: 'User'}
  ],
  membershipRequests: [
  	{type: Schema.Types.ObjectID, ref: 'User'}
  ],
  catatgory: [
  	{type: Schema.Types.ObjectID, ref: 'Categories'}
  ],
  comments: [
  	{type: Schema.Types.ObjectID, ref: 'Comment'}
  ],
}, {collection:'Group'});

var commentSchema = new Schema({
  user: {type: Schema.Types.ObjectID, ref: 'User'},
  commentText: String,
  timestamp: { type : Date, default: Date.now }
}, {collection:'Comment'});

var catagorySchema = new Schema({
  name: String,
}, {collection:'Categories'});