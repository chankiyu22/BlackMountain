var Groups = {

	socket: undefined,

	num_members: 0,

	fullname: undefined,

// ## initialize groups
//
// @param num_members - number of members in group
// @param fullname - users full name
// @param username - current user's username
	initialize : function(num_members, fullname, username) {
		this.num_members = num_members;
		this.fullname = fullname;

	  	this.socket = io.connect();

	  	this.socket.emit('watch_groups', {username: username});

	  	// socket recieves Mention data
	  	this.socket.on('+Mention', function (data) {
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

// ## join group button
//
// @param group_id - group to join
// @param username - user joining group
	initialize : function(num_members, fullname, username) {
		this.num_members = num_members;
		this.fullname = fullname;

	  	this.socket = io.connect();

	  	this.socket.emit('watch_groups', {username: username});

	  	this.socket.on('+Mention', function (data) {
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

	join_group : function(group_id, username) {
		$("#join_button" + group_id).attr("disabled", "disabled");
		var that = this;
		$.post("/groups/join",
		  {group_id: group_id, username: username})
		.done(function(result) {
			$("#join_button" + group_id).text('Joined');
			if (result == 'success')
			{
				that.num_members = that.num_members + 1;
				$('#members_tab').html(that.num_members + ' Members');
				var members_html = '<li><div class="separator">' +
			   		'<a href="/' + username + '">' +
			   			'<div class="owner">' +
			   				that.fullname +
			   				'<small> @' + username + '</small>' +
			   			'</div>' +
			   		'</a>' +
			   	'</div></li>';
			   	$('#members-list').prepend(members_html);
			}
		})
		.fail(function(err) {
			$("#join_button" + group_id).removeAttr("disabled");
		});
	},

// ## Create a new group
// 
// @param fullname - fullname of current user
// @param username - username of current user
	create_group : function(fullname, username) {
		var fullname = $('#fullname').val();
		var username = $('#username').val();
		$("#create_group").attr("disabled", "disabled");
		$.post("/groups/create",
		  {fullname: fullname, username: username})
		.done(function(result) {
			if (result == 'success')
			{
				$('#create_result').text('Success');
				$('#create_result').removeClass('result_fail').addClass('result_success');
			}
			else
			{
				$('#create_result').text('Failed: ' + result);
				$('#create_result').removeClass('result_success').addClass('result_fail');
			}
		})
		.fail(function(err) {
			$('#create_result').text('Failed: bad connection');
			$('#create_result').removeClass('result_success').addClass('result_fail');
		})
		.always(function() {
			$("#create_group").removeAttr("disabled");
		});
	}
};