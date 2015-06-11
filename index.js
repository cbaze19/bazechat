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

    if (!auth || auth[0] !== 'caleb' || auth[1] !== 'bazer') {
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

io.sockets.on('connection', function(socket) {

	socket.on('disconnect', function() {

	});

});

http.listen(port, function() {
	console.log('listening on ' + port);
});