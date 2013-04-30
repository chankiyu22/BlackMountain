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
  user.getUser(req.session.username, function(err, theuser) {
    var interactions = util.getInteractions(theuser.username);
    res.render('connect', {user: theuser,
                interactions: interactions,
                wtf: util.getWhoToFollow(req.session.username)});
  });
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
  user.getUser(req.session.username, function(err, theuser) {
    var tweet_array = tweets.getTweetsThatMention(theuser.username, function(err, tweet_array) {
      util.initTweets(tweet_array);
      res.render('mentions', {user: theuser,
                  tweets: tweet_array,
                  timeline_header: "Mentions",
                  wtf: util.getWhoToFollow(req.session.username)});
    });
  });
};
