var express = require('express');
var path = require('path');

var app = express();

var server = require('http').createServer(app).listen(process.env.port, function () {
  console.log('sdfsdf');
};

var io = require('socket.io')(server, {
  'resource': '/socket.io',
  'path': '/socket.io',
  'match origin protocol': true
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

app.use(express.static(path.join(__dirname, 'public')));
module.exports = app;

