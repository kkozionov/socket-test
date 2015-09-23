var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

//var routes = require('./routes/index');
//var users = require('./routes/users');

var app = express();
var http = require('http').createServer(app);

http.listen(process.env.port, function () {
  console.log("HTTP started at %s", process.env.port);

  var io = require('socket.io')(http);

  io.on('connection', function(socket){
    socket.on('chat message', function(msg){
      io.emit('chat message', msg);
    });
  });
});

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = app;

