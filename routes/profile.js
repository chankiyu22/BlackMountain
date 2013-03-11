var tweets = require('../lib/tweets');
var user = require('../lib/user');
var followers = require('../lib/followers');

/*
 * GET /<username> page.
 *
 * Populate main page of user profile
 * username = User
 * num_tweets = How many teets User's made, total
 * tweets = Array of user's tweets
 * following = number of users following username
 * followed = number of users following username
*/
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

/*
 * GET /<username>/following page.
 *
 * Populate "Following" subsection of user profile
 * username = User
 * num_tweets = How many teets User's made, total
 * tweets = Empty, for this view
 * following = number of users following username
 * following_data = Users that User is following
 * followed = number of users following username
*/
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
                following: following_user_data,
                followers: followed_by_users});
};

/*
 * GET /<username>/followers page.
 *
 * Populate "Followers" subsection of user profile
 * username = User
 * num_tweets = How many teets User's made, total
 * tweets = Empty, for this view
 * following = number of users following username
 * followed = number of users following username
 * follower_data = Users following User
*/
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
               followers: followed_by_user_data});
};

/*
 * GET /<username>/favorites page.
 *
 * Populate "Favorites" subsection of user profile
 * username = User
 * num_tweets = How many teets User's made, total
 * tweets = Currently nonfunctional, will contain tweets user has favorited
 * following = number of users following username
 * followed = number of users following username
*/
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
