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
			var groups_to_watch = group.getGroupWithMember(data.username);
			socket.set('username', data.username);
			watchingUsers[data.username] = [];
			for (var i=0; i<groups_to_watch.length; i++)
			{
				watchingUsers[data.username][groups_to_watch[i].username] = socket;
			}
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
	  		var tweet = {message: data.message, owner: data.username};
	  		util.initTweet(tweet);
	  		var users_following = followers.getUsersFollowing(data.username);
	  		users_following.push(data.username);
	  		for (var i=0; i<users_following.length; i++)
	  		{
	  			
	  			exports.emitToUsername(users_following[i], '+Tweet', {tweet: tweet});
	  		}
	  		exports.emitToUsername(data.username, '+SelfTweet', {tweet: tweet});

	  		var mentioned_users = util.getMentionedUsers(tweet);
	  		mentioned_users.concat(util.getMentionedGroups(tweet));
	  		for (var i=0; i<mentioned_users.length; i++)
	  		{
	  			exports.emitToUsername(mentioned_users[i].username, '+Mention', {tweet: tweet});
	  		}

	  		//Broadcast updated hashtag data to all connected users
	  		console.log("attempting to broadcast trends");
	  		var tags = hashtags.getTopHashtagsHTML(10);
	  		console.log (tags);
	      	for (var user in userToSocket){
	      	  	console.log(user);
		  		exports.emitToUsername(user, '+Trends', {tags: tags});
	  		}
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
