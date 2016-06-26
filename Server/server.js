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
	var password = Math.random().toString(36).substr(2, 10);
	Puppies.create({
			dog_id: id, 
			dog_name: req.body.dog_name,
			dog_password: password,
			dog_gender: req.body.dog_gender,
			dog_friends: req.body.dog_friends,
			dog_isOnline: req.body.dog_isOnline,
			contact_phoneNo: req.body.contact_phoneNo
		}, function (err, puppy) {
        if (err) throw err;
        console.log('Puppy created!');
        res.end('Added puppy (' + req.body.dog_name + ') with id: ' + id + ' and password ' + password);
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


// CRUD friends
// Navigate to below route to get friends list for the dog indicated by pupId 
puppyRouter.route('/:pupId/friends')
.post(function (req, res, next) {
	Puppies.update({dog_id: req.params.pupId}, 
		{$push:{"dog_friends":req.body['id']}},function(err,data){
			if(err)
				throw err;
			else{
				console.log(data);
				res.end('(' + req.params.pupId + ') has added (' + req.body.id + ') to friends list');
			}
		}

	)});




app.use('/puppies',puppyRouter);


//create dog login_id
app.post('/register',function(req,res,next){
	var number = req.body['number'];
	var id = uuid.v4();
	var email = req.body['email'],
		name = req.body['name'],
		password = req.body['password'];
	var dog_login_id = id.split("-")[0],
		dog_id = id;
	Puppies.create({
		dog_id:dog_id,
		dog_login_id:dog_login_id,
		dog_name:name,
		dog_gender:"",
		dog_friends:[],
		contact_email:email,
		contact_password:password,
		contact_phoneNo:number,
<<<<<<< HEAD
	
=======
		
>>>>>>> d046adc3457017b3cd6a319705e9fb9ec2686fb8
	},function(err,data){
		if(err)
			throw err;
		else 
			{
				twillio.createMessage(data.contact_phoneNo,data.dog_login_id);

			}
<<<<<<< HEAD
	})
=======
	});
>>>>>>> d046adc3457017b3cd6a319705e9fb9ec2686fb8
	res.end("Saved");
		

})
//end of dog login_id
//start of the location block
app.post('/location/:param',function(req,res,next){
	Puppies.findOneAndUpdate({dog_id:req.params.param},{$set:{
		dog_isOnline:true
	}},function(err,data){
		if(err)
			throw err;
		else{
			data.dog_friends.filter(function(el){
				Puppies.find({dog_id:el},function(err,data){
					if(err){
						throw err;
					}else{
						//looking for dogs who is online
						data.filter(function(el){
							//if the dog is online check the distance 
							if(el.dog_isOnline){
								
							}
								
						})
					}
				})
			});
			res.end("Located");
		}
			
	});

		
});



//end of the location block

//start of the friend block

//end of the friend block



app.listen(8000 );
console.log("Application listening on port 8000");

