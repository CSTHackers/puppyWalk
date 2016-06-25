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
app.get('/test',function(req,res,next){
	res.send("It worked");
});
app.post('/post',function(req,res,next){
	res.send(JSON.stringify(req.body))
})
app.listen(8000);
console.log("Listening on port 8000");

