var tweets = require('../tweets');
var hashtags = require('../hashtags');
var users = require('../user');
var group = require('../groups');
var followers = require('../followers');
var util = require('../util');

// userToSocket[username]= socket<br>
var userToSocket = {}; 
// watchingUsers[username][who_user_is_watching] = socket<br>
// allows a user to recieve another user's emits
var watchingUsers = {};

// ## emitToUsername
//
// broadcasts message to user and all people watching that user<br>
// @param username - instance of the sockets.io object
// @param type - instance of the sockets.io object
// @param data - instance of the sockets.io object
exports.emitToUsername = function(username, type, data)
{
	if (username in userToSocket)
	{
		userToSocket[username].emit(type, data);
	}
	for (var watcher in watchingUsers)
	{
		var watched_array = watchingUsers[watcher];
		if (username in watched_array)
		{
			watchingUsers[watcher][username].emit(type, data);
		}
	}
}

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

	    // ## on watch_groups
		//
		// watch all the groups the user is a member of
		socket.on('watch_groups', function (data) {
			group.getGroupWithMember(data.username, function(err, groups_to_watch) {
				socket.set('username', data.username);
				watchingUsers[data.username] = [];
				for (var i=0; i<groups_to_watch.length; i++)
				{
					watchingUsers[data.username][groups_to_watch[i].username] = socket;
				}
			});
	    });

	    // ## on watch_user
		//
		// watch a user
		socket.on('watch_user', function (data) {
			socket.set('username', data.username);
			watchingUsers[data.username] = [];
			if (data.username !== data.towatch)
			{
				watchingUsers[data.username][data.towatch] = socket;
			}
	    });

		// ## on +Tweet
		//
		// broadcast tweet to all the user's followers
	  	socket.on('+Tweet', function (data) {
	  		users.getUser(data.username, function(err, userdata) {
		  		var tweet = {message: data.message, owner: data.username};
		  		util.initTweet(tweet);
		  		tweet.fullname = userdata.fullname;
	  			followers.getUsersFollowing(data.username, function(err, users_following) {
		  			users_following.push({username: data.username});
			  		for (var i=0; i<users_following.length; i++)
			  		{
			  			exports.emitToUsername(users_following[i].username, '+Tweet', {tweet: tweet});
			  		}
			  		exports.emitToUsername(data.username, '+SelfTweet', {tweet: tweet});
		  		});

		  		util.getMentionedUsers(tweet, function(mentioned_users) {
		  			util.getMentionedGroups(tweet, function(mentioned_groups) {
		  				mentioned_users.concat(mentioned_groups);
				  		for (var i=0; i<mentioned_users.length; i++)
				  		{
				  			exports.emitToUsername(mentioned_users[i].username, '+Mention', {tweet: tweet});
				  		}
		  			});
		  		});

		  		//Broadcast updated hashtag data to all connected users
		  		hashtags.getTopHashtagsHTML(10, function(tags) {
		  			for (var user in userToSocket){
				  		exports.emitToUsername(user, '+Trends', {tags: tags});
			  		}
		  		});
		  	});
	    });

	    // ## on +Follow
		//
		// notify other user that someone has followed them
	  	socket.on('+Follow', function (data) {
	  		users.getUser(data.username, function(err, user) {
	  			var tofollow = data.tofollow;
	  			users.getUser(tofollow, function(err, tofollowuser) {
		  			exports.emitToUsername(tofollow, '+Follow', {user: user});
		  			exports.emitToUsername(user.username, '+Following', {user: tofollowuser});
		  		});
	  		});
	    });

		// ## on disconnect
		//
		// remove user from socket list
	  	socket.on('disconnect', function () {
	  		socket.get('username',  function (err, username) {
	  			if (username !== null)
	  			{
	  				delete userToSocket[username];
	  				delete watchingUsers[username];
	  			}
		    });
	    });
	});
}
