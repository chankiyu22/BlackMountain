var Profile = {

	socket: undefined,

	num_followers: 0,

	initialize: function (username, num_followers) {
		this.num_followers = num_followers;

	  	this.socket = io.connect();

	  	this.socket.emit('init', {username: username});
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