/* Emailjs: module that uses gmail to send emails to clients */ 
var email = require("emailjs"); 

var server  = email.server.connect({
   user:    "tuftsclickers@gmail.com", 
   password: "thisisates", 
   host:    "smtp.gmail.com", 
   ssl:     true
});

message = exports.sendMessage = function(email, product) {
	var message = {
		text:  "You signed up to receive a notification when " + product.product_name + 
		" went on sale. When you signed up, the price was " + product.orig_price +
		" and now it is " + product.percent_off + " percent off! Head on over to Zappo's to buy this item and more!", 
		from:    "tuftsclickers@gmail.com", 
		to:      email,
		subject: "Congratulations! Your product has gone on sale!"
	}; 
	server.send(message, function(err, message) { 
		if (err) {
			console.log(err);
			return new Error(err);
		}
		console.log(message); }); 
}; 


