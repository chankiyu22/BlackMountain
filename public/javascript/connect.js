var Connect = {

	socket: undefined,

	initialize : function (username) {
	  	this.socket = io.connect();

	  	this.socket.emit('init', {username: username});

	  	this.socket.on('+Follow', function (data) {
	  		var interaction_html = '<li><div class="tweet">' +
		   		'<a class="owner" href="/' + data.user.username + '">' +
		   			'<b>' + data.user.fullname + '</b>' +
		   		'</a>' + ' followed you' +
		   	'</div></li>';
		   	$('#interaction-list').prepend(interaction_html);
	  	});
	}
};