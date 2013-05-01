var Tweets = {

	socket: undefined,

	tweetcount: 0,

	// ## Initialize tweets
	// 
	// @param username - username of current user
	initialize : function (username, count) {
		this.tweetcount = count;
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

	  	// socket recieves tweet data
	  	this.socket.on('+Tweet', function (data) {
	  		var tweet_html = '<div class="tweet">' +
		   		'<a href="/' + data.tweet.owner + '">' +
		   			'<div class="owner">' +
		   				data.tweet.fullname + 
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

// ## Post a tweet
//
// @param username - username of current user
	post_tweet : function(username) {
		var message = $('#message').val();
		var data = {message: message, username: username};
		$("#tweet_publish").attr("disabled", "disabled");

		var that = this;
		$.post("/publish_tweet", {message: message, username: username})
		.done(function(result) {
			that.socket.emit('+Tweet', data);
		  that.tweetcount = that.tweetcount + 1;
		  $('#curr_tweet_count').html(that.tweetcount + ' tweets');
			$('#message').val('');
			//var tweetcount = $('#curr_tweet_count').text();
			//$('#curr_tweet_count').text(++tweetcount);
			
		})
		.always(function() {
			$("#tweet_publish").removeAttr("disabled");
		});
	}
};
