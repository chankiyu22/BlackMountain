var user = require('../lib/user');
var tweets = require('../lib/tweets');
var util = require('../lib/util');

/*
 * ## Function connect(req, res)<br />
 * Routing /connect
 * 
 * #### Render
 * 1. Current User<br />
 * 2. Interactions to current user
 */
exports.connect = function(req, res){
  var theuser = user.getUser(req.session.username);
  var interactions = util.getInteractions(theuser.username);
  res.render('connect', {user: theuser,
  						  interactions: interactions,
                wtf: util.getWhoToFollow(req.session.username)});
};

/*
 * ## Function mentions(req, res)<br />
 * Routing /mentions
 *
 * #### Render
 * 1. Current User<br />
 * 2. An array of tweet mentioning the user
 */
exports.mentions = function(req, res){
  var theuser = user.getUser(req.session.username);
  var tweet_array = tweets.getTweetsThatMention(theuser.username);
  util.initTweets(tweet_array);
  res.render('mentions', {user: theuser,
  						  tweets: tweet_array,
  						  timeline_header: "Mentions",
                wtf: util.getWhoToFollow(req.session.username)});
};
