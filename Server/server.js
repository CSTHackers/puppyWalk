var express = require('express'),
	app = express(),
	request = require('request'),
	body_parser = require('body-parser'),
	morgan = require('morgan'),
	_ = require('lodash'),
	mongoose = require('mongoose'),
	method_override = require('method-override'),
 	mongo_db_uri = "mongodb://ek5442:NokiaLumia920@ds033875.mlab.com:33875/movies";
mongoose.connect(mongo_db_uri);
var db = mongoose.connection;
//connect to a databse
db.on('error',console.error.bind(console, 'connection error:'));
app.use(morgan('dev'));
app.use(body_parser.urlencoded({'extended':false}));
app.use(body_parser.json());
app.use(body_parser.json({type:'application/vdn.api+json'}));
app.use(method_override('X-HTTP-Method-Override'));



// app.get('/test',function(req,res,next){
// 	res.send("Hello World");
// })

console.log("Listening on port 8000");

//Start of the registration block









//end of the registration block

//start of the location bloc
//The post request will be made with location coordinates
//params will hold the dogs unique id 
app.post('/location/:param',function(req,res,next){
	console.log(req.params.param);
	console.log(JSON.stringify(req.body));
});







//end of the location block

















app.listen(8000 || process.env.PORT);


