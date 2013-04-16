var Profile = {

	socket: undefined,

	num_followers: 0,

	initialize: function (username, num_followers, profileuser) {
		this.num_followers = num_followers;

	  	this.socket = io.connect();

	  	this.socket.emit('init', {username: username});
	  	this.socket.emit('watch_user', {username: username, towatch: profileuser});

	  	this.socket.on('+SelfTweet', function (data) {
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