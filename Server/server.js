var express = require('express'),
	app = express(),
	request = require('request'),
	body_parser = require('body-parser'),
	morgan = require('morgan'),
	_ = require('lodash'),
	mongoose = require('mongoose'),
	method_override = require('method-override'),
 	mongo_db_uri = "mongodb://ek5442:NokiaLumia920@ds033875.mlab.com:33875/movies",
	Puppies = require('./models/puppy-model'),
	Distance = require('./distance'),
	uuid = require('uuid');


mongoose.connect(mongo_db_uri);
var db = mongoose.connection;
db.on('error',console.error.bind(console, 'connection error:'));
app.use(morgan('dev'));
app.use(body_parser.urlencoded({'extended':false}));
app.use(body_parser.json());
app.use(body_parser.json({type:'application/vdn.api+json'}));
app.use(method_override('X-HTTP-Method-Override'));







//Start of the registration block
var puppyRouter = express.Router();


puppyRouter.route('/')
.get(function(req,res,next){

	Puppies.find({}, function (err, puppy) {
        if (err) throw err;
        res.json(puppy);
    });
})
.post(function(req, res, next){
	var id = uuid.v4();
	Puppies.create({
			dog_id: id, dog_name: req.body.dog_name
		}, function (err, puppy) {
        if (err) throw err;
        console.log('Puppy created!');
        res.end('Added puppy (' + req.body.dog_name + ') with id: ' + id);
    });   
})

app.use('/puppies',puppyRouter);



//start of the location bloc
//The post request will be made with location coordinates
//params will hold the dogs unique id 


//end of the registration block

//start of the location block
app.post('/location/:param',function(req,res,next){
	console.log(req.params.param);
	console.log(JSON.stringify(req.body));
	Puppies.find({dog_id:req.params.param},function(err,data){
		if(err)
			throw err;
		else{
			//first query friends and check whether they online or not
			//if the friend online chekck location if the location
			data[0].dog_friends.filter(function(el){
				//to be changed to dog id instead
				Puppies.find({dog_name:el},function(err,data){
					if(err)
						throw err;
					else
						data[0].filter(function(el){
							if (el.dog_isOnline)
								console.log("It worked");
							else
								res.send("No dogs online");
						})
				})
			})
			//in acceptable radius send notification
		}
	})
});




//end of the location block




app.listen(8000);
console.log("Application listening on port 8000");

