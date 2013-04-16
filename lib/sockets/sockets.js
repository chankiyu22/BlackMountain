var tweets = require('../tweets');
var users = require('../user');
var group = require('../groups');
var followers = require('../followers');
var util = require('../util');

var userToSocket = {};

// ## initSocketIo
//
// registers the socket's behavior<br>
// @param io - instance of the sockets.io object
exports.initSocketIo = function(io)
{
	io.sockets.on('connection', function (socket) {

		// ## on init
		//
		// create user-socket association
		socket.on('init', function (data) {
			userToSocket[data.username] = socket;
			socket.set('username', data.username);
	    });

		// ## on +Tweet
		//
		// broadcast tweet to all the user's followers
	  	socket.on('+Tweet', function (data) {
	  		var tweet = {message: data.message, owner: data.username};
	  		util.initTweet(tweet);
	  		var users_following = followers.getUsersFollowing(data.username);
	  		users_following.push(data.username);
	  		for (var i=0; i<users_following.length; i++)
	  		{
	  			if (users_following[i] in userToSocket)
	  			{
	  				userToSocket[users_following[i]].emit('+Tweet', {tweet: tweet});
	  			}
	  		}

	  		var mentioned_users = util.getMentionedUsers(tweet);
	  		for (var i=0; i<mentioned_users.length; i++)
	  		{
	  			if (mentioned_users[i].username in userToSocket)
	  			{
	  				userToSocket[mentioned_users[i].username].emit('+Mention', {tweet: tweet});
	  			}
	  		}


			var myGroups = group.getGroupWithMember(data.username);
			myGroups.push(data.username);
			for (var i=0; i<myGroups.length; i++)
	  		{
	  			if (myGroups[i] in userToSocket)
	  			{
	  				userToSocket[myGroups[i]].emit('+Tweet', {tweet: tweet});
	  			}
	  		}
	  		var mentioned_groups = util.getMentionedGroups(tweet);	
	  		for (var i=0; i<mentioned_groups.length; i++)
	  		{
	  			if (mentioned_groups[i].username in userToSocket)
	  			{
	  				userToSocket[mentioned_groups[i].username].emit('+Mention', {tweet: tweet});
	  			}
	  		}
	    });

	    // ## on +Follow
		//
		// notify other user that someone has followed them
	  	socket.on('+Follow', function (data) {
	  		var user = users.getUser(data.username);
	  		var tofollow = data.tofollow;
	  		if (tofollow in userToSocket)
	  		{
	  			userToSocket[tofollow].emit('+Follow', {user: user});
	  		}
	    });

		// ## on disconnect
		//
		// remove user from socket list
	  	socket.on('disconnect', function () {
	  		socket.get('username',  function (err, username) {
	  			if (username !== null)
	  			{
	  				delete userToSocket[username];
	  			}
		    });
	    });
	});
}