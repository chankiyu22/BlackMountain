var tweets = require('../lib/tweets');
var user = require('../lib/user');
var followers = require('../lib/followers');
var util = require('../lib/util');
var groups = require('../lib/groups');


 // ## GET /<username> page.<br>
 // Gets the following info for main page of a user profile display<br>
 // username = User<br>
 // theuser = the current logged in user<br>
 // group = group that user is a member of<br>
 // tweet_array = Array of user's tweets<br>
 // following_users = users following username<br>
 // followed_by_users = users followed by username<br>
exports.profile = function(req, res, next){
  var username = req.param('username');
  var profile = user.getUser(username);
  if (profile == undefined)
  {
    next();
  }
 // If theuser is a member of a group, finds group info
  else if (profile.isgroup)
  {
    var group = groups.getGroupByName(username);
    res.render('group_profile', {profile: profile,
                                  user: user.getUser(req.session.username),
                                  group: group,
                                  isMember: groups.isMember(group.id, req.session.username),
                                  session: req.session,
                                  members: groups.getMembersForGroup(group.id)});
  }
  else
  {
    var tweet_array = undefined;
    tweet_array = tweets.getTweetsByUser(username, -1);
    util.initTweets(tweet_array);
    var following_users = followers.getFollowedUsers(username);
    var followed_by_users = followers.getUsersFollowing(username);
    res.render('profile', {profile: profile,
                  user: user.getUser(req.session.username),
                  num_tweets: tweets.getTweetCountByUser(username),
                  tweets: tweet_array,
                  following: following_users,
                  followers: followed_by_users});
  }
};

// ## GET /<username>/following page.<br>
// Gets the info to display on a user's "Following" page
// username = User<br>
// following_users = users following username<br>
// followed_by_users = users following username<br>
// following_user_data = users that username is following<br>
exports.following = function(req, res){
  var username = req.param('username');
  var following_users = followers.getFollowedUsers(username);
  var followed_by_users = followers.getUsersFollowing(username);
  var following_user_data = [];

// Finds all users that username is following<br>
  for (var i=0; i<following_users.length; i++)
  {
    following_user_data.push(user.getUser(following_users[i]));
  }
  res.render('following', {profile: user.getUser(username),
                user: user.getUser(req.session.username),
               	num_tweets: tweets.getTweetCountByUser(req.session.username),
  				      tweets: [],
                following: following_user_data,
                followers: followed_by_users});
};

// ## GET /<username>/followers page.<br>
// Gets the info to display on a user's "Followers" pages<br>
// username = User<br>
// following_users = users following username<br>
// followed_by_users = users following username<br>
// followed_by_user_data = users following username<br>
exports.followers = function(req, res){
  var username = req.param('username');
  var following_users = followers.getFollowedUsers(username);
  var followed_by_users = followers.getUsersFollowing(username);
  var followed_by_user_data = [];

// Finds all users followed by username
  for (var i=0; i<followed_by_users.length; i++)
  {
    followed_by_user_data.push(user.getUser(followed_by_users[i]));
  }
  res.render('followers', {profile: user.getUser(username),
                user: user.getUser(req.session.username),
               	num_tweets: tweets.getTweetCountByUser(req.session.username),
  				      tweets: [],
               following: following_users,
               followers: followed_by_user_data});
};

// ## GET /<username>/favorites page.<br>
// Gets the info to display on a user's "Favorites" page<br>
// username = User<br>
// following_users = users following username<br>
// followed_by_users = users following username<br>
exports.favorites = function(req, res){
  var username = req.param('username');
  var following_users = followers.getFollowedUsers(username);
  var followed_by_users = followers.getUsersFollowing(username);

  res.render('favorites', {profile: user.getUser(username),
                user: user.getUser(req.session.username),
               	num_tweets: tweets.getTweetCountByUser(req.session.username),
  				      tweets: [],
                following: following_users,
                followers: followed_by_users});
};
