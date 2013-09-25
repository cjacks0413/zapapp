/* database.js 
 * Uses MongoDB to store users. 
*/ 
mailer = require('./email'); 
var SALE_PERCENT = 20; 

var mongo = require('mongodb');

var mongoUri = process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/mydb';

var db = mongo.Db.connect(mongoUri, function (error, databaseConnection) {
		console.log("connected"); 
		db = databaseConnection;		
		}); 
		
exports.addUser = function addUser(user) {
	console.log('Adding user: ' + JSON.stringify(user));
	db.collection('users', function(err, collection) {
		collection.insert(user, {safe:true}, function(err, result) {
			if (err) {
				console.log("An error occurred. Please try again.");
			} else {
				console.log("Success: user added.");
			}
		});
	});
} 

exports.get_users = function get_users()
{
	db.collection('users', function(err, collection) {
		if (err) {
			console.log("could not find collection 'users.'");
		}
		collection.find().toArray(function(err, items) {
				if (err) {
					console.log(err);
					return new Error(err);
				}
				return items; 
		    });
	}); 

}