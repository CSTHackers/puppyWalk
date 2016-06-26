var request = require('request');
var Distance = require('../distance');
var fs = require('fs');
request.post('http://127.0.0.1:8000/location/94c040c2-133d-49aa-8f44-fd64db369d98', {form:{lat:'40.681672',lon:' -73.014192'}},function(err,response,body){
	if (err)
		throw err;
	else{
		console.log("response=> ",response.body)
		console.log("\n");
		console.log("body=> ",body)
	}
});


function to_kilometers (miles){
	return miles/0.62137;
}
var R = 6371e3;

var Point1 = {
	lat:40.6755,
	lon:-74.0047
};
var Point2 = {
	lat:40.680797,
	lon:-73.999827
};
var Point3 = {
	lat:41.680797,
	lon:-73.999827
}
Distance.get_distance(Point1,[Point2,Point3]);




/*
	//looking for dogs who is online
						// data.filter(function(el){
						// 	//if the dog is online check the distance 
						// 	if(el.dog_isOnline){
						// 		var Point2 = {
						// 			"id":el.dog_id,
						// 			"lat":41.680797,
						// 			"lon":-73.999827

						// 		};
						// 		if(Distance.get_distance(Point_to_Compare,Point2))
						// 		{
						// 			console.log("Sending request",Point2)
						// 		}
						// 		else{
						// 			locations_to_watch.push(Point2);
						// 		}
						// 	}
								
						// });
						// console.log(locations_to_watch);
						//continue watching friendly dogs until friend goes offline or 
						//friend is in radius
						// while(locations_to_watch.length!=0){
						// 	locations_to_watch.filter(function(el){
						// 		console.log(el.id);
						// 		//if the dog is online make a request to get new coordinates
						// 		Puppies.find({dog_id:el.id},function(err,data){

						// 			if (err)
						// 				throw err;
						// 			else{
						// 				console.log(data);
						// 			}
						// 		})
						// 	})
						// }


*/