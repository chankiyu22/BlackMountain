var user = require('../lib/user');
var tweets = require('../lib/tweets');
var util = require('../lib/util');

/*
 * GET /connect page.
 *
 * Render interactions (new follows, replies)
 */
exports.connect = function(req, res){
  var theuser = user.getUser(req.session.username);
  var interactions = util.getInteractions(theuser.username);
  res.render('connect', {user: theuser,
  						  interactions: interactions});
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
  						  tweets: tweet_array,
  						  timeline_header: "Mentions"});
};
