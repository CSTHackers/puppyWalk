var request = require('request');
var Distance = require('../distance');
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