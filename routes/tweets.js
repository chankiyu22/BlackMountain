var tweets = require('../lib/tweets');

/*
 * POST /publish_tweet
 *
 * Add tweet to tweets database
 */
exports.publish_tweet = function(req, res){
  tweets.publish(req.body.username, req.body.message, function(){})
  res.redirect('back');
};
