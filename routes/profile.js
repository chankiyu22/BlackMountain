var tweets = require('../lib/tweets');
var user = require('../lib/user');

exports.profile = function(req, res){
  var username = req.param('username');
  var tweet_array = undefined;
  tweets.getTweetsByUser(req.session.username, -1, function(error, tweetobjs){
  	tweet_array = tweetobjs;
  });
  var tweet_owners = [];
  for (var i=0; i<tweet_array.length; i++)
  {
    tweet_array[i].userdata = user.getUser(tweet_array[i].owner);
  }
  res.render('profile', {user: user.getUser(req.session.username),
               	num_tweets: tweets.getTweetCountByUser(req.session.username),
  				      tweets: tweet_array});
};

exports.following = function(req, res){
  var username = req.param('username');
  res.render('following', {user: user.getUser(req.session.username),
               	num_tweets: tweets.getTweetCountByUser(req.session.username),
  				tweets: []});
};

exports.followers = function(req, res){
  var username = req.param('username');
  res.render('followers', {user: user.getUser(req.session.username),
               	num_tweets: tweets.getTweetCountByUser(req.session.username),
  				tweets: []});
};

exports.favorites = function(req, res){
  var username = req.param('username');
  res.render('favorites', {user: user.getUser(req.session.username),
               	num_tweets: tweets.getTweetCountByUser(req.session.username),
  				tweets: []});
};