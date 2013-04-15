var Tweets = {

	socket: undefined,

	initialize : function (username) {
	  	this.socket = io.connect();

	  	this.socket.emit('init', {username: username});

	  	this.socket.on('+Tweet', function (data) {
	  		var tweet_html = '<div class="tweet">' +
		   		'<a href="/<%= tweets[i].owner %>">' +
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
	},

	post_tweet : function(username) {
		var message = $('#message').val();
		var data = {message: message, username: username};
		$("#tweet_publish").attr("disabled", "disabled");

		var that = this;
		$.post("/publish_tweet", {message: message, username: username})
		.done(function(result) {
			that.socket.emit('+Tweet', data);
			$('#message').val('');
		})
		.always(function() {
			$("#tweet_publish").removeAttr("disabled");
		});
	}
};