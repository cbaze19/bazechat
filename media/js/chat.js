$(function() {

	var socket = io();

	socket.on('message', function(message) {
		
	});

	socket.on('updateUsers', function(clients) {
		var _clients = {'clients':[]};
		$('.sidebar-list').html('');

		clients.forEach(function(client) {
			$('.sidebar-list').append("<li class='list-item'>" + client.name + "</li>");
		});
	});

	$('#name-button').on('click', function() {
		var name = $('#name-input').val();
		$('#name-input').val('');
		$('#username').text(name);
		socket.emit('nameChange', {'name':name, 'id':socket.id});
	});

});