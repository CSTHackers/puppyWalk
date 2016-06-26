var request = require('request');
var Jasmine = require('jasmine');
var _=require('lodash');
var helloWorld = require("../server.js");


var jasmine = new Jasmine();

jasmine.loadConfigFile('./spec/support/jasmine.json');
jasmine.configureDefaultReporter({
    showColors: true
});

var base_url = "http://localhost:8000/";


describe("Hello World Server", function() {
  describe("GET /", function() {
    // it("returns status code 200", function() {
    //   request.get(base_url, function(error, response, body) {
    //   	console.log(body);
    //   	console.log(response);
    //   		expect(response.statusCode).toBe(200); 
    //   		done();
    //   });
    // });
    it("returns Hello", function(done) {
      request.get(base_url, function(error, response, body) {
        expect(body).toBe("Hello");
        helloWorld.closeServer();
        done();
      });
    });
  });
});

jasmine.execute();