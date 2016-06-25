var Distance  = module.exports = {
	//@params degree of coordinates either lat or lon
	//@getRad will return radiant 
	getRad: function(deg){
		return deg * (Math.PI/180);
	},
	//@params Pont1 {lat:Number,lon:Number,id:String}
	//@params Point2_Array wil hold the array of Pont objects
	//get distance between points and it will return array of objects
	get_distance: function(Point1,Point2_Array){
		var closest_distances = [];
		var R = 6371;
		Point2_Array.filter(function(el){
			var dLat = Distance.getRad(el.lat-Point1.lat);
			var dLon  = Distance.getRad(el.lon-Point1.lon);
			var center_angle = 
				  Math.sin(dLat/2) * Math.sin(dLat/2) +
    			  Math.cos(Distance.getRad(Point1.lat)) * Math.cos(Distance.getRad(el.lat)) * 
    			  Math.sin(dLon/2) * Math.sin(dLon/2);
    		var c  = 2 * Math.atan2(Math.sqrt(center_angle),Math.sqrt(1-center_angle));
    		var distance = R * c;
    		if (Math.round(distance)<=2){
    			closest_distances.push(el);
    		}
		});
		return distance;
	}
}