var Profile = {

	socket: undefined,

	num_followers: 0,

// ## Initialize profile
//
// @param username - current user's username
// @param num_followers - number of people following username
// @param profileuser - user to watch
	initialize: function (username, num_followers, profileuser) {
		this.num_followers = num_followers;

	  	this.socket = io.connect();

	  	this.socket.emit('init', {username: username});
	  	this.socket.emit('watch_user', {username: username, towatch: profileuser});

	  	// socket recieves data for self tweet
	  	this.socket.on('+SelfTweet', function (data) {
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

	  	// socket recieves follow data
	  	this.socket.on('+Follow', function (data) {
	  		var follow_html = '<li><div>' +
			   		'<a href="/' + data.user.username + '">' +
			   			'<div class="separator owner">' +
			   				data.user.fullname +
			   				'<small> @' + data.user.username + '</small>' +
			   			'</div>' +
			   		'</a>' +
			   	'</div></li>';
			   	$('#followers-list').prepend(follow_html);
	  	});

	  	// socket recieves following data
	  	this.socket.on('+Following', function (data) {
	  		var follow_html = '<li><div>' +
			   		'<a href="/' + data.user.username + '">' +
			   			'<div class="separator owner">' +
			   				data.user.fullname +
			   				'<small> @' + data.user.username + '</small>' +
			   			'</div>' +
			   		'</a>' +
			   	'</div></li>';
			   	$('#following-list').prepend(follow_html);
	  	});
	},

// ## Follow user
// 
// @param username - current user's username
// @param tofollow - user who username is going to follow
	follow_user: function (username, tofollow) {
		var data = {username: username, tofollow: tofollow};
		$("#follow_btn").attr("disabled", "disabled");

		var that = this;
		$.post("/follow", {tofollow: tofollow})
		.done(function(result) {
			$("#follow_btn").val('Followed');
			if (result == 'success')
			{
				that.socket.emit('+Follow', data);
				that.num_followers = that.num_followers + 1;
				$('#followers_tab').html(that.num_followers + ' followers');
			}
			
		})
		.fail(function() {
			$("#follow_btn").removeAttr("disabled");
		});
	}
};