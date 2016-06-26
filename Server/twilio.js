var twilio = require('twilio');
var accountSid = 'AC898df62abcf003fea7806b0f5137cb5e'; // Your Account SID from www.twilio.com/console
var authToken = "41e6b2b96557381c8de5dfb5803adae0";

var client = new twilio.RestClient(accountSid, authToken);
// client.messages.create({
//     body: 'Hello from Node',
//     to: '+13475838019',  // Text this number
//     from: '+16466792618 ' // From a valid Twilio number
// }, function(err, message) {
//     if(err) {
//         console.error(err.message);
//     }
// });
var Twillio  = module.exports = {
	createMessage: function(to,body){
		
		client.messages.create({
			body:body,
			to:to,
			from: '+16466792618 '
		},function(err,response){
			if(err){
				throw err;
			}else{
				console.log(response);
			}
		})
	}
}