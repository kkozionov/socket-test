var express = require('express');
var path = require('path');

var app = express();

var server = app.listen(process.env.port, function () {
  console.info('Express server started');
});

var opts = {};

if (process.env.IISNODE_VERSION) {
  opts['resource'] = '/socket.io';
  opts['path'] = '/socket.io';
  opts['match origin protocol'] = true;
}

var io = require('socket.io')(server, opts);

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

app.use(express.static(path.join(__dirname, 'public')));
module.exports = app;

