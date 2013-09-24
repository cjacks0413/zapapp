/* database.js 
 * Uses MongoDB to store users. 
*/ 
mailer = require('./email'); 
var SALE_PERCENT = 20; 
var mongo = require('mongodb'); 

var Server = mongo.Server,
  db = mongo.Db,
  BSON = mongo.BSONPure;  

var server = new Server('localhost', 27017, {auto_reconnect: true }); 
db = new db('userdb', server, {safe: false} ); 

exports.open = db.open(function(err, db) {
  if (!err) {
  	console.log("Connected to 'userdb'");
  	db.collection('users', {strict:true}, function(err, collection) {
  		if (err) {
			console.log("The 'users' collection doesn't exist");
		}
	});
  }
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

function check_price(percent_off) 
{
	for(i = 0; i < users.length; i++) {
			if(users[i].product["percent_off"] >= SALE_PERCENT) {
			mailer.sendMessage(users[i].email, users[i].product); 
		}
	}
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
	//			check_price(items); 
				return items; 
		    });
	}); 

}