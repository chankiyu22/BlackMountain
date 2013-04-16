var Tweets = {

	socket: undefined,

<<<<<<< HEAD
	// ## Initialize tweets
	// 
	// @param username - username of current user
=======
>>>>>>> new_branch_name
	initialize : function (username) {
		$("#tweet_publish").attr("disabled", "disabled");

		$('#message').bind('input propertychange', function() {
		   	if($("#message").val().length){
		   		$("#tweet_publish").removeAttr("disabled");
		   	}
		   	else
		   	{
		   		$("#tweet_publish").attr("disabled", "disabled");
		   	}
		});

	  	this.socket = io.connect();

	  	this.socket.emit('init', {username: username});

<<<<<<< HEAD
	  	// socket recieves tweet data
=======
>>>>>>> new_branch_name
	  	this.socket.on('+Tweet', function (data) {
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
	},

<<<<<<< HEAD
// ## Post a tweet
//
// @param username - username of current user
=======
>>>>>>> new_branch_name
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