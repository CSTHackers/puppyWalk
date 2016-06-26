
var io = require('socket.io-client');
var fs  = require('fs')
var socket = io.connect('http://localhost:8000', {reconnect: true});
var ss = require('socket.io-stream');
var buffer =  Buffer.from([1,2,3,4,5]);
console.log(buffer);

// Add a connect listener
socket.on('connect', function (socket) {
    console.log('Connected!');
});
socket.on('news',function(data){
	console.log(data);
})

socket.on('test',function(socket){
	ss(socket).emit("test", fs.createReadStream(buffer));
})
	