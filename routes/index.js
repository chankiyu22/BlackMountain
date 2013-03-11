var tweets = require('../lib/tweets');

/*
 * GET home page.
 */

exports.index = function(req, res){
  var tweet_array = undefined;
  tweets.getTweetsByUser(req.session.username, -1, function(error, tweetobjs){
  	tweet_array = tweetobjs;
  });
  res.render('index', {username: req.session.username,
  					   first: 'Twitter',
  					   login: req.session.login,
  					   error: req.session.login_error,
               num_tweets: tweets.getTweetCountByUser(req.session.username),
  					   tweets: tweet_array,
                       last: 'Language: English'});
  console.log("Basic Index Page");
};

