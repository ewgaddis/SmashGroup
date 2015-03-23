// Add an object/document to a collection
function addObject(collection, object, callback) {
	collection.insert(object, callback);
}

// Adds a user Javascript object to the users collection of the given database
// callback = function(err, result)
function addUser(database, user, callback) {
	database.collection("users", function(err, coll) { // Assuming the users collection is called "users"
		if(!err) {
			addObject(userCollection, function(err, result) {
				callback(err, result);
			});
		} else {
			callback(err, null);
		}
	});
}

// Make it so that other JS files can use the function
exports.addUser = addUser;