var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var port = process.env.PORT || 8080;

// Authenticator
app.use(function(req, res, next) {
    var auth;
 
    if (req.headers.authorization) {
      auth = new Buffer(req.headers.authorization.substring(6), 'base64').toString().split(':');
    }

    if (!auth || auth[0] !== 'caleb' || auth[1] !== 'baze') {
        res.statusCode = 401;
        res.setHeader('WWW-Authenticate', 'Basic realm="BazeChat"');
        res.end('Unauthorized');
    } else {
        next();
    }
});

app.use('/media', express.static(__dirname + '/media'));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

var clients = {'clients':[]};

io.sockets.on('connection', function(socket) {

	var clientIP = socket.request.connection.remoteAddress;
	console.log('User connected from ' + clientIP);

	clients.clients.push(socket.id);
	// console.log(JSON.stringify(xyz));
	io.emit('updateUsers', clients);

	socket.on('disconnect', function() {
		console.log('User Disconnected!');

		var i = clients.clients.indexOf(socket.id);
		clients.clients.splice(i, 1);
	});

});

http.listen(port, function() {
	console.log('listening on ' + port);
});