$(function() {

	var socket = io();

	socket.on('message', function(message) {
		
	});

	socket.on('updateUsers', function(clients) {
		$('.sidebar-list').html('');
		clients.forEach(function(client) {
			$('.sidebar-list').append("<li class='list-item'>" + client + "</li>");
		});
	});

});