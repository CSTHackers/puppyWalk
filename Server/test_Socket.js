
var io = require('socket.io-client');
var fs  = require('fs')
var socket = io.connect('http://localhost:8000', {reconnect: true});


// Add a connect listener
socket.on('connect', function (socket) {
    console.log('Connected!');
});
socket.emit('send',{data:3,wooL:2});