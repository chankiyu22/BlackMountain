var tweets = require('../tweets');
var users = require('../user');
<<<<<<< HEAD
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
=======
var followers = require('../followers');
var util = require('../util');

var userToSocket = {};
>>>>>>> new_branch_name

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

<<<<<<< HEAD
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

=======
>>>>>>> new_branch_name
		// ## on +Tweet
		//
		// broadcast tweet to all the user's followers
	  	socket.on('+Tweet', function (data) {
<<<<<<< HEAD
	  		var tweet = {message: data.message, owner: data.username};
	  		util.initTweet(tweet);
=======
>>>>>>> new_branch_name
	  		var users_following = followers.getUsersFollowing(data.username);
	  		users_following.push(data.username);
	  		for (var i=0; i<users_following.length; i++)
	  		{
<<<<<<< HEAD
	  			
	  			exports.emitToUsername(users_following[i], '+Tweet', {tweet: tweet});
	  		}
	  		exports.emitToUsername(data.username, '+SelfTweet', {tweet: tweet});

	  		var mentioned_users = util.getMentionedUsers(tweet);
	  		mentioned_users.concat(util.getMentionedGroups(tweet));
	  		for (var i=0; i<mentioned_users.length; i++)
	  		{
	  			exports.emitToUsername(mentioned_users[i].username, '+Mention', {tweet: tweet});
=======
	  			if (users_following[i] in userToSocket)
	  			{
	  				var tweet = {message: data.message, owner: data.username};
	  				util.initTweet(tweet);
	  				userToSocket[users_following[i]].emit('+Tweet', {tweet: tweet});
	  			}
>>>>>>> new_branch_name
	  		}
	    });

	    // ## on +Follow
		//
		// notify other user that someone has followed them
	  	socket.on('+Follow', function (data) {
	  		var user = users.getUser(data.username);
	  		var tofollow = data.tofollow;
<<<<<<< HEAD
	  		exports.emitToUsername(tofollow, '+Follow', {user: user});
	  		exports.emitToUsername(user.username, '+Following', {user: users.getUser(tofollow)});
=======
	  		if (tofollow in userToSocket)
	  		{
	  			userToSocket[tofollow].emit('+Follow', {user: user});
	  		}
>>>>>>> new_branch_name
	    });

		// ## on disconnect
		//
		// remove user from socket list
	  	socket.on('disconnect', function () {
	  		socket.get('username',  function (err, username) {
	  			if (username !== null)
	  			{
	  				delete userToSocket[username];
<<<<<<< HEAD
	  				delete watchingUsers[username];
=======
>>>>>>> new_branch_name
	  			}
		    });
	    });
	});
}