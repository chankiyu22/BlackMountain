var Trends = {

	socket: undefined,

	// ## Initialize trends
	// 
	// @param username - username of current user
	initialize : function (username) {
	 	$.get("/trends")
		.done(function(result){
		  $('#trend_space').html(result);
		});
		this.socket = io.connect();

	  	this.socket.emit('init', {username: username});

	  	// socket recieves trend data
	  	this.socket.on('+Trends', function (data) {
		   	$('#trend_space').html(data.tags);
  		});

	}
};

