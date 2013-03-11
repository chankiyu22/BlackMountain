var tweets = require('../lib/tweets');

exports.publish_tweet = function(req, res){
  tweets.publish(req.body.username, req.body.message, function(){})
  res.redirect('back');
};