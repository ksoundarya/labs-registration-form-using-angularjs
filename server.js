// server.js (Express 4.0)
var express        = require('express');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var app            = express();
app.use(express.static(__dirname + '/app')); 	// set the static files location /app
app.use(morgan('dev')); 					// log every request to the console
app.use(bodyParser()); 						// pull information from html in POST
app.use(methodOverride()); 					// simulate DELETE and PUT
app.listen(8000);
console.log('Open http://localhost:8000 to access the files now'); 	