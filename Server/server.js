var express = require('express'),
	app = express(),
	request = require('request'),
	body_parser = require('body-parser'),
	twillio = require('./twilio'),
	morgan = require('morgan'),
	_ = require('lodash'),
	mongoose = require('mongoose'),
	method_override = require('method-override'),
 	mongo_db_uri = "mongodb://ek5442:NokiaLumia920@ds033875.mlab.com:33875/movies",
	Puppies = require('./models/puppy-model'),
	Distance = require('./distance'),
	uuid = require('uuid');


// connect to mongo lab db:
 mongoose.connect(mongo_db_uri);
// to delete: Rahman local: 
//var url = 'mongodb://localhost:27017/conFusion';mongoose.connect(url);


var db = mongoose.connection;
db.on('error',console.error.bind(console, 'connection error:'));
app.use(morgan('dev'));
app.use(body_parser.urlencoded({'extended':false}));
app.use(body_parser.json());
app.use(body_parser.json({type:'application/vdn.api+json'}));
app.use(method_override('X-HTTP-Method-Override'));



//Start of the registration block
var puppyRouter = express.Router();

// Setup route
puppyRouter.route('/')
// Read entire db collection
.get(function(req,res,next){

	Puppies.find({}, function (err, puppy) {
        if (err) throw err;
        res.json(puppy);
    });
})
// Create new puppy entry
.post(function(req, res, next){
	var id = uuid.v4();
	Puppies.create({
			dog_id: id, 
			dog_name: req.body.dog_name,
			dog_gender: req.body.dog_gender,
			dog_friends: req.body.dog_friends,
			dog_isOnline: req.body.dog_isOnline,
			contact_email: req.body.contact_email,
			contact_password: req.body.contact_password,
			contact_phoneNo: req.body.contact_phoneNo
		}, function (err, puppy) {
        if (err) throw err;
        console.log('Puppy created!');
        res.end('Added puppy (' + req.body.dog_name + ') with id: ' + id);
    });   
})

// Post to authenticate user email and password (req: contact_email and contact_password)
puppyRouter.route('/login')
.post(function (req, res, next) {
    Puppies.find({$and:[
    		{contact_email: req.body.contact_email},
    		{contact_password: req.body.contact_password}
    	]}, function(err, puppy){	
    	// Throw general error
    	if (err) throw err;
    	// Throw 401 (unauthenticated) error if db search returns empty array
    	if (puppy.length == 0) {
    		var err_message = 
    			{
    				"error":401,
    				"error_message":"Wrong Credentials"
    			}
    		;
    		res.send(JSON.stringify(err_message));

        	return
        }
        // Authenticated
     	else res.end('Authenticated');
})})

app.use('/puppies',puppyRouter);



//start of the location bloc
//The post request will be made with location coordinates
//params will hold the dogs unique id 

app.get('/',function(req,res,next){
	var number = "+13475838019";
	var message = "Some random string";
	twillio.createMessage(number,message);
	res.send("It was send cunt");
	res.end("Ben Afflick");
})
//end of the registration block

//start of the location block
app.post('/location/:param',function(req,res,next){
	Puppies.findOneAndUpdate({dog_id:req.params.param},{$set:{
		dog_isOnline:true
	}},function(err,data){
		if(err)
			throw err;
		else{
			data.dog_friends.filter(function(el){
				Puppies.findOne({dog_id:el},function(err,data){
					if(err)
						throw err;
					else
						if(data.dog_isOnline){
							var Point = {
								'id':data.dog_id,
							}
							request.post({url:'https://127.0.0.1:8888/get_loc', form: {key:'value'}}, function(err,httpResponse,body){ 
								if(err)
									console.log(err);
								else{
									console.log(body)
								}
							})
						}else{
							console.log("Ben Afflick");
						}
				})
			})
		}
			
	});
		
});



//end of the location block

//start of the friend block

//end of the friend block



app.listen(8000 );
console.log("Application listening on port 8000");

