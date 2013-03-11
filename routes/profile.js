var tweets = require('../lib/tweets');

exports.profile = function(req, res){
  var username = req.param('username');
  var tweet_array = undefined;
  tweets.getTweetsByUser(req.session.username, -1, function(error, tweetobjs){
  	tweet_array = tweetobjs;
  });
  res.render('profile', {username: username,
               	num_tweets: tweets.getTweetCountByUser(req.session.username),
  				tweets: tweet_array});
};

exports.following = function(req, res){
  var username = req.param('username');
  res.render('following', {username: username,
               	num_tweets: tweets.getTweetCountByUser(req.session.username),
  				tweets: []});
};

exports.followers = function(req, res){
  var username = req.param('username');
  res.render('followers', {username: username,
               	num_tweets: tweets.getTweetCountByUser(req.session.username),
  				tweets: []});
};

exports.favorites = function(req, res){
  var username = req.param('username');
  res.render('favorites', {username: username,
               	num_tweets: tweets.getTweetCountByUser(req.session.username),
  				tweets: []});
};