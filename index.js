var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var port = process.env.PORT || 8080;

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