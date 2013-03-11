var tweets = require('../lib/tweets');
var user = require('../lib/user');
var followers = require('../lib/followers');

exports.profile = function(req, res){
  var username = req.param('username');
  var tweet_array = undefined;
  tweets.getTweetsByUser(username, -1, function(error, tweetobjs){
  	tweet_array = tweetobjs;
  });
  var tweet_owners = [];
  for (var i=0; i<tweet_array.length; i++)
  {
    tweet_array[i].userdata = user.getUser(tweet_array[i].owner);
  }
  var following_users = followers.getFollowedUsers(username);
  var followed_by_users = followers.getUsersFollowing(username);
  res.render('profile', {user: user.getUser(username),
               	num_tweets: tweets.getTweetCountByUser(username),
  				      tweets: tweet_array,
                following: following_users,
                followers: followed_by_users});
};

exports.following = function(req, res){
  var username = req.param('username');
  var following_users = followers.getFollowedUsers(username);
  var followed_by_users = followers.getUsersFollowing(username);
  var following_user_data = [];
  for (var i=0; i<following_users.length; i++)
  {
    following_user_data.push(user.getUser(following_users[i]));
  }
  res.render('following', {user: user.getUser(req.session.username),
               	num_tweets: tweets.getTweetCountByUser(req.session.username),
  				      tweets: [],
                following: following_users,
                following_data: following_user_data,
                followers: followed_by_users});
};

exports.followers = function(req, res){
  var username = req.param('username');
  var following_users = followers.getFollowedUsers(username);
  var followed_by_users = followers.getUsersFollowing(username);
  var followed_by_user_data = [];
  for (var i=0; i<followed_by_users.length; i++)
  {
    followed_by_user_data.push(user.getUser(followed_by_users[i]));
  }
  res.render('followers', {user: user.getUser(req.session.username),
               	num_tweets: tweets.getTweetCountByUser(req.session.username),
  				      tweets: [],
               following: following_users,
               followers: followed_by_users,
               follower_data: followed_by_user_data});
};

exports.favorites = function(req, res){
  var username = req.param('username');
  var following_users = followers.getFollowedUsers(username);
  var followed_by_users = followers.getUsersFollowing(username);
  res.render('favorites', {user: user.getUser(req.session.username),
               	num_tweets: tweets.getTweetCountByUser(req.session.username),
  				      tweets: [],
                following: following_users,
                followers: followed_by_users});
};