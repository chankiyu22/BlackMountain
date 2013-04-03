var tweets = require('../tweets');
var user = require('../user');
var followers = require('../followers');
var group = require('../groups');

//
// ## Build Tweet Html
// creates mention links to profiles.
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
// ## initialize tweets
// Takes an array of tweets and initializes them with data about the 
// owner and adds the html version of the tweet
//
exports.initTweets = function(tweet_array) {
  //Attach user to each tweet
  for (var i=0; i<tweet_array.length; i++)
  {
    tweet_array[i].userdata = user.getUser(tweet_array[i].owner);
    this.buildTweetHtml(tweet_array[i]);
  }
};

//
// ## gets initialize groups
// Returns an array of groups and initializes them with user data 
// and relationship with user
//
exports.getInitializedGroups = function(user_name) {
  var group_array = group.getAllGroups();
  // get user data for each group
  for (var i=0; i<group_array.length; i++)
  {
    group_array[i].userdata = user.getUser(group_array[i].username);
    group_array[i].isMember = false;
  }

  // mark each group that username is a member of
  var users_groups = group.getGroupWithMember(user_name);
  for (var i=0; i<users_groups.length; i++)
  {
    group_array[users_groups[i].id].isMember = true;
  }
  return group_array;
};

//
// ## get interactions
// Given a user, get all the messages to be put in the interactions timeline.
//
exports.getInteractions = function(username) {
  	var interactions = [];

  	// get mentions
  	var mentions = tweets.getTweetsThatMention(username);
  	for (var i=0; i<mentions.length; i++)
  	{
  		var userdata = user.getUser(mentions[i].owner);
    	interactions.push("<a class='owner' href='" + userdata.username + "'><b>" + userdata.fullname + "</b></a> mentioned you")
  	}

  	// get followers
  	var followed_by_users = followers.getUsersFollowing(username);
  	for (var i=0; i<followed_by_users.length; i++)
  	{
  		var userdata = user.getUser(followed_by_users[i]);
    	interactions.push("<a class='owner' href='" + userdata.username + "'><b>" + userdata.fullname + "</b></a> followed you")
  	}
  	return interactions;
};