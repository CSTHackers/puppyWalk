var express = require('express'),
	app = express(),
	request = require('request'),
	body_parse = require('body-parser'),
	morgan = require('morgan'),
	method_override = require('method-override');


app.use(body_parse.urlencoded({'extended':false}));
app.use(body_parse.json());
app.use(body_parse.json({type:'application/vdn.api+json'}));
app.use(method_override('X-HTTP-Method-Override'));
app.post('/get_loc',function(req,res,next){
	console.log(req);
})
app.listen(8888);
console.log("Listening on port 8000");

