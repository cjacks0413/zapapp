/* index.js
 * Handles get/post requests from http and Zappo API requests.
*/ 
/* modules */ 
var Client = require('node-rest-client').Client;
client = new Client(); 
var mydb = require('./database.js'); 

/* global variables */ 
var is_name = true; 
var orig_price = 0; 
var percent_off = 0; 
var input_product = ""; 
var user_email = ""; 
var all_users = new Array();
var Zappo_apikey = "&key=52ddafbe3ee659bad97fcce7c53592916a6bfd73";
var base_url = "http://api.zappos.com/" 
var url = ""; 
var SALE_PERCENT = 20;
var now = new Date();
var millisTill10 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0, 0, 0) - now; 

/* for the db */ 
var Product = new Object();
var newUser = new Object();

/* home page */ 
exports.home = function(req, res) {
	res.render('index'); 
  	/* check every day at 10am for percent_off */ 
  	if (millisTill10 < 0) {
    	millisTill10 += 86400000; // time to check, 10am 
	} 
	setTimeout(function(){
			update_price(); 
		}, millisTill10);	
}

/* post request */ 
exports.enter = function(req, res) {

	email = req.body.user; 
	
	/* see if they entered name or id */ 		
	if(req.body.productname == "") {
		input_product = req.body.productid;
		is_name = false; 
	} else if (req.body.productid == "") {
		input_product = req.body.productname;
		is_name = true;  
	} else {
		res.render('error', {error: "You must enter either product name or product ID."});
	}
	
	/* asynchronous */ 
	get_info(input_product, is_name, req, res); 
}; 

/* use Zappo API key to get information about name/ID */ 
function get_info(product, is_name, req, res)
{
	if(is_name) {
		url = base_url + "Search?term=" + product + Zappo_apikey; 
	} else {
	  url = base_url + "Product/" + product + '?includes=["styles"]' + Zappo_apikey; 
	}
	client.get(url, function(data, response) {
		  if (response == null) {
		  		return new Error("No data found");
		  }
		  var str = JSON.parse(data); 
		  if (str["currentResultCount"] == 0) {
				res.render('error', { error: "No results found for that inquiry. Please try again!"});
		} else {
				res.render ('enter', {user: req.body.user, product: input_product} ); 
				get_price(str, is_name); 
		} 
	  });
}

/* get price of product. finds the lowest value among the results and
sends it to objects to be placed into database */ 
function get_price(str, is_name)
{
	var obj_to_store = new Array(); 
	if(is_name) {
		obj_to_store = str["results"];
	}
	else {
		obj_to_store = (str["product"][0].styles); 
	}
	lowest_values(obj_to_store); 
	create_user(); 
}


function lowest_values(object)
{
	for(i = 0; i < object.length; i++) {
		curr_price = object[i].originalPrice; 
		curr_price = curr_price.replace("$", ''); 
		curr_percent = parseFloat(object[i].percentOff);
		if (orig_price <= curr_price) {
			orig_price = curr_price;
		}
		if (percent_off <= curr_percent) {
		 	percent_off = curr_percent;
		 }
	}
	return percent_off;
}

/* creates new user with product information associated. */ 
function create_user()
{
 
	Product = {
		product_name: input_product, 
		orig_price: orig_price, 
		percent_off: percent_off,  
	};
	
	newUser = {
		email: email, 
		product: Product, 
		is_name: is_name, 
		url: url, 
		created_at: new Date() 
	};
	mydb.addUser(newUser); 
}

/* called every day at 10am, sends email to users */ 
function update_price()
{
	var users = mydb.get_users(); 
	for (i = 0; i < users.length; i++) {
		client.get(users[i].url, function(data, response) {
		  if (response == null) {
		  		return new Error("No data found");
		  }
		  var str = JSON.parse(data);
		  price = get_price(str, users[i].is_name)
		  if (price >= PERCENT_OFF) {
		  	  mailer.sendMessage(users[i].email, users[i].product); 
		  }
		});
	}
}




