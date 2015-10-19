
/*
* sudo npm init
* npm install express --save
* npm install express --save
* npm install -g strongloop
* npm install --save ws
* npm install express-ws
* npm install redis
*/

var express = require('express');
var app = express();
var expressWs = require('express-ws')(app);
var app_name = 'dhtmlxNodeChat';
var redis = require('redis');
var subscriber = redis.createClient();
var publisher  = redis.createClient();
var port = 4080;
var users = [];

var def_channel = '#random';




app.use( express.static( __dirname + '/public' ) );

//app.use( function(req, res, next) {
	//console.log('middleware');
	//req.testing = 'testing';
//	return next();
//} );

app.get('/', function(req, res, next) {
	res.send('Hello World!');
	//console.log('get route', req.testing);
	res.end();
});

subscriber.on("message", function(channel, message) {
	//message.channel = channel;
	var aWss = expressWs.getWss('/');
	aWss.clients.forEach(function (client) {
		client.send( message );
	});
});



app.ws('/', function(ws, req) {

	var client_id = Math.random();

	subscriber.subscribe(def_channel);

	// client.set('client_', 'clientid');
	//client.set('framework', 'AngularJS', function(err, reply) {
	//  console.log(reply);
	//});

	ws.on('message', function(envelop) {
		envelop = JSON.parse(envelop);
		var msg = JSON.parse(envelop.msg);
		msg.type = msg.type || 'message'; // disconnect, message, new_user
		msg.channel = msg.channel || def_channel; // disconnect, message, new_user

		msg.time = 10000000;
	    msg.address = '';
		msg.client_id = client_id;
		
		
		if( msg.type == "new_username" )
		{
			if( msg.person )
			{
				msg.person.client_id = client_id;	
				users.push( msg.person );
				msg.users = users;
				
			}
		}
		else if( msg.type == "disconnect" )
		{
			users.forEach(function( userObj, index, array )
			{
				if( userObj.client_id == client_id )
				{
					users.splice(index, 1);
					var msg = {};
					msg.type = 'disconnect'; // disconnect, message, new_user
					msg.time = 10000000;
				    msg.address = '';
					msg.client_id = client_id;
				}
			});
		}

		publisher.publish(msg.channel, JSON.stringify( msg ));

		//var aWss = expressWs.getWss('/');
		//aWss.clients.forEach(function (client) {
		//	client.send( JSON.stringify( msg ) );
		//});

		//console.log( 'sending ', JSON.stringify( msg ) );
		//ws.send( JSON.stringify( msg ) );
	});

	ws.on('close', function() {
		/*users.forEach(function( userObj, index, array ){
			if( userObj.client_id == client_id )
			{
				users.splice(index, 1);
				var msg = JSON.parse(envelop.msg);
				msg.type = 'disconnect'; // disconnect, message, new_user
				msg.time = 10000000;
			    msg.address = '';
				msg.client_id = client_id;
				ws.send(msg);
			}
		});*/
		console.log('client id '+client_id+' is disconnected ');
		console.log(users);
	});
	console.log('client id '+client_id+' is connected ');
});


var server = app.listen(port, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log(app_name + ' is listening at http://%s:%s', host, port);
});