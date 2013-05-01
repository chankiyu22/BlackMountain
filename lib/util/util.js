//
// ### Module Dependency
//
var tweets = require('../tweets');
var user = require('../user');
var followers = require('../followers');
var group = require('../groups');

//
// ## Function buildTweetHtml
// Tweet Build Helper
//
// #### Parameters
// 1. tweet
//
// #### Actions
// Creates mention links to profiles.
//
exports.buildTweetHtml = function(tweet) {
	var message = tweet.message;
	var done = false;
	while (!done)
	{
		done = true;
		var words = message.split(" ");
		for(var i=0; i<words.length; i++)
		{
			if (words[i].charAt(0) === '@')
			{
				message = message.replace(words[i], "<a class='mention' href='/" + words[i].substring(1) + "'>" + words[i]+"</a>");
				done = false;
			}
      if (words[i].charAt(0) === '#')
      {
        message = message.replace(words[i], "<a class='mention' href='/search?searchfor=%23" + words[i].substring(1) + "'>" + words[i]+"</a>");
        done = false;
      }
		}
	}
  tweet.html = "<div>"+message+"</div>";
};

//
// ## Function initTweet
// Initialize tweet
//
// #### Parameters
// 1. tweet
//
// #### Actions
// Takes a single tweet and initializes it with data about the 
// owner and adds the html version of the tweet
//
exports.initTweet = function(tweet) {
  //tweet.userdata = userdata;
  //tweet.userdata = {username: 'test', fullname: 'tmp'};
  this.buildTweetHtml(tweet);
};

//
// ## Function initTweets
// Initialize tweets
//
// #### Parameters
// 1. tweet_array
//
// #### Actions
// Takes an array of tweets and initializes them with data about the 
// owner and adds the html version of the tweet
//
exports.initTweets = function(tweet_array) {
  for (var i=0; i<tweet_array.length; i++)
  {
    exports.initTweet(tweet_array[i]);
  }
};

//
// ## Function getInitializedGroups
// Gets initialize groups
//
// #### Parameters
// 1. user_name
//
// #### Return
// An array of groups and initializes them with user data 
// and relationship with user
//
exports.getInitializedGroups = function(user_name) {
  var group_array = group.getAllGroups();
  for (var i=0; i<group_array.length; i++)
  {
    //group_array[i].userdata = user.getUser(group_array[i].username);
    group_array[i].userdata = {username: group_array[i].username, fullname: 'tmp'};
    group_array[i].isMember = false;
  }

  var users_groups = group.getGroupWithMember(user_name);
  for (var i=0; i<users_groups.length; i++)
  {
    group_array[users_groups[i].id].isMember = true;
  }
  return group_array;
};

//
// ## Function getInteractions
// Get interactions
//
// #### Parameters
// 1. username
//
// #### Action
// Given a user, get all the messages to be put in the interactions timeline.
//
// #### Return
// An array of message
//
exports.getInteractions = function(username) {
  	var interactions = [];

  	tweets.getTweetsThatMention(username, function(err, mentions){
      for (var i=0; i<mentions.length; i++)
      {
        interactions.push("<a class='owner' href='" + mentions.owner + "'><b>" + mentions.fullname + "</b></a> mentioned you")
      }

      followers.getUsersFollowing(username, function(err, followed_by_users) {
        for (var i=0; i<followed_by_users.length; i++)
        {
          //var userdata = user.getUser(followed_by_users[i]);
          var userdata = {username: followed_by_users[i], fullname: 'tmp'};
          interactions.push("<a class='owner' href='" + userdata.username + "'><b>" + userdata.fullname + "</b></a> followed you")
        }
      });
    });
  	
  	return [];
};

//
// ## Function getMentionedUsers
// Get Mentioned Users
//
// #### Parameters
// 1. tweet
//
// #### Action
// Given a tweet, find all @username.
//
// #### Return
// An array of mentioned users
//
exports.getMentionedUsers = function(tweet) {
  user.getAllUsers(function(err, theusers) {
    var mentioned_users = [];
    for (var i=0; i<theusers.length; i++)
    {
      if (tweet.message.indexOf("@" + theusers[i].username) !== -1)
      {
        mentioned_users.push(theusers[i]);
      }
    }
  });
  return [];
};


//
// ## Function getMentionedGroups
//
// #### Parameters
// 1. tweet
//
// #### Action
// Given a tweet, find all group mentions

// #### Return
// An array of mentioned groups
//
exports.getMentionedGroups = function(tweet){
  var groups = group.getAllGroups();
  var mentioned_groups = [];
  for (var i=0; i<groups.length; i++)
  {
    if (tweet.message.indexOf("@" + groups[i].username) !== -1)
    {
      mentioned_groups.push(groups[i]);
    }
  }
  return mentioned_groups;
};

//
// ## Function getWhoToFollow
//
// #### Action
// given a user, suggest people for him to follow

// #### Return
// An array of users
//
exports.getWhoToFollow = function(username, limit){
  if (limit == undefined)
  {
    limit = 10;
  }
  return [];
};