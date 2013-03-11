var tweets = require('../lib/tweets');
var user = require('../lib/user');

/*
 * GET home page.
 */

exports.index = function(req, res){
  var tweet_array = undefined;
  tweets.getTweetsByUser(req.session.username, -1, function(error, tweetobjs){
  	tweet_array = tweetobjs;
  });
  var theuser = user.getUser(req.session.username);
  for (var i=0; i<tweet_array.length; i++)
  {
    tweet_array[i].userdata = user.getUser(tweet_array[i].owner);
  }
  res.render('index', {user: theuser,
  					   first: 'Twitter',
  					   login: req.session.login,
  					   error: req.session.login_error,
               num_tweets: tweets.getTweetCountByUser(req.session.username),
  					   tweets: tweet_array,
               last: 'Language: English'});
  console.log("Basic Index Page");
};

