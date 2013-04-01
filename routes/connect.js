var user = require('../lib/user');
var tweets = require('../lib/tweets');
var util = require('../lib/util');

/*
 * GET /connect page.
 *
 * Render interactions (new follows, replies)
 */
exports.connect = function(req, res){
  res.render('connect', {user: user.getUser(req.session.username)});
};

/*
 * GET /mentions page.
 *
 * Render mentions
 */
exports.mentions = function(req, res){
  var theuser = user.getUser(req.session.username);
  var tweet_array = tweets.getTweetsThatMention(theuser.username);
  util.initTweets(tweet_array);
  res.render('mentions', {user: theuser,
  						  tweets: tweet_array});
};
