var express = require('express'),
	app = express(),
	request = require('request'),
	body_parser = require('body-parser'),
	morgan = require('morgan'),
	mongoose = require('mongoose'),
	method_override = require('method-override'),
 	mongo_db_uri = "mongodb://ek5442:NokiaLumia920@ds033875.mlab.com:33875/movies";
	Puppies = require('./models/puppy-model');
	uuid = require('uuid');


mongoose.connect(mongo_db_uri);
var db = mongoose.connection;
db.on('error',console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");
    // Create our first puppy
    Puppies.create({
    	dog_id: uuid.v4(),
        dog_name: 'Fluffy',
        dog_gender: 'Male',
        dog_friends: [
          'Abe','Beth','Charlie'
        ]
    });
});

app.use(morgan('dev'));
app.use(body_parser.urlencoded({'extended':false}));
app.use(body_parser.json());
app.use(body_parser.json({type:'application/vdn.api+json'}));
app.use(method_override('X-HTTP-Method-Override'));



var puppyRouter = express.Router();
puppyRouter.use(body_parser.json());

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



//Start of the registration block




//end of the registration block

//start of the location block





//end of the location block





var port = 8000;
app.listen(port || process.env.PORT);
console.log("Listening on port " + port);

