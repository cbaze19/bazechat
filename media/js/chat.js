$(function() {

	var socket = io();

	socket.on('message', function(message) {
		
	});

	socket.on('updateUsers', function(clients) {
		console.log(clients);
	});

	var clients = {'clients':['caleb','laura','angela']};
	var i = clients.clients.indexOf('laura');
	console.log(i);

});