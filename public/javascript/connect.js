var Connect = {

	socket: undefined,

<<<<<<< HEAD
	// ## Initialize Connect
	//
	// @param username - current logged on user
=======
>>>>>>> new_branch_name
	initialize : function (username) {
	  	this.socket = io.connect();

	  	this.socket.emit('init', {username: username});

<<<<<<< HEAD
	  	// socket receieves follow data
=======
>>>>>>> new_branch_name
	  	this.socket.on('+Follow', function (data) {
	  		var interaction_html = '<li><div class="tweet">' +
		   		'<a class="owner" href="/' + data.user.username + '">' +
		   			'<b>' + data.user.fullname + '</b>' +
		   		'</a>' + ' followed you' +
		   	'</div></li>';
		   	$('#interaction-list').prepend(interaction_html);
	  	});
<<<<<<< HEAD

	  	// socket recieves mention data
	  	this.socket.on('+Mention', function (data) {
	  		var interaction_html = '<li><div class="tweet">' +
		   		'<a class="owner" href="/' + data.tweet.userdata.username + '">' +
		   			'<b>' + data.tweet.userdata.fullname + '</b>' +
		   		'</a>' + ' mentioned you' +
		   	'</div></li>';
		   	$('#interaction-list').prepend(interaction_html);

		   	var tweet_html = '<div class="tweet">' +
		   		'<a href="/' + data.tweet.owner + '">' +
		   			'<div class="owner">' +
		   				data.tweet.userdata.fullname + 
		   				'<small> @' + 
		   				data.tweet.owner +
		   				'</small>' +
		   			'</div>' +
		   		'</a>' +
		   		data.tweet.html +
		   	'</div>';
		   	$('#tweet-list').prepend(tweet_html);
	  	});
=======
>>>>>>> new_branch_name
	}
};