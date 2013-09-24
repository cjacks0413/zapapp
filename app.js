/* Configuration */ 
var express = require('express'); 
var app = express(
	express.logger(),
	express.static(__dirname + '/public'),
	express.bodyParser()
	); 
app.use(express.static(__dirname + '/public')); 
var port = process.env.PORT || 5000; 

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs'); 

app.configure(function(){
	app.use(express.bodyParser());
	app.use(app.router);
	}); 
	
/* Routes */ 
var index_routes = require('./routes/index.js'); 

app.get('/', index_routes.home);
app.post('/enter', index_routes.enter); 

/* localhost */ 
app.listen(port, function(){
	console.log("Listening on port 5000");
	});  