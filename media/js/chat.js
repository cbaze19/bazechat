$(function() {

	var socket = io();

	socket.on('message', function(message) {
		
	});

	socket.on('updateUsers', function(clients) {
		console.log(clients.clients);
	});

});