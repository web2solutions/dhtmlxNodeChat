var express = require('express');
var app = express();
var expressWs = require('express-ws')(app);
var app_name = 'dhtmlxNodeChat';

var redis = require('redis');
var redis_client = redis.createClient();

var port = 4080;
 

redis_client.on('connect', function() {
    console.log('redis connected');
});

app.use(function (req, res, next) {
  //console.log('middleware');
  req.testing = 'testing';
  return next();
});


 
app.get('/', function(req, res, next){
  res.send('Hello World!');
  //console.log('get route', req.testing);
  res.end();
});


 
app.ws('/', function(ws, req) {
  ws.on('message', function(msg) {
    console.log(msg);
  });
  console.log('socket', req.testing);
});
 

var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log( app_name + ' is listening at http://%s:%s', host, port );
});