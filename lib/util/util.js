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
		}
	}
    tweet.html = "<div>"+message+"</div>";
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
    tweet_array[i].userdata = user.getUser(tweet_array[i].owner);
    this.buildTweetHtml(tweet_array[i]);
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
    group_array[i].userdata = user.getUser(group_array[i].username);
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

  	var mentions = tweets.getTweetsThatMention(username);
  	for (var i=0; i<mentions.length; i++)
  	{
  		var userdata = user.getUser(mentions[i].owner);
    	interactions.push("<a class='owner' href='" + userdata.username + "'><b>" + userdata.fullname + "</b></a> mentioned you")
  	}

  	var followed_by_users = followers.getUsersFollowing(username);
  	for (var i=0; i<followed_by_users.length; i++)
  	{
  		var userdata = user.getUser(followed_by_users[i]);
    	interactions.push("<a class='owner' href='" + userdata.username + "'><b>" + userdata.fullname + "</b></a> followed you")
  	}
  	return interactions;
};