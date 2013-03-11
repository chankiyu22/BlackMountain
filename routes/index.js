var tweets = require('../lib/tweets');
var user = require('../lib/user');
var followers = require('../lib/followers');

/*
 * GET home page.
 */

exports.index = function(req, res){
  var tweet_array = [];
  var following_users = followers.getFollowedUsers(req.session.username);
  var followed_by_users = followers.getUsersFollowing(req.session.username);
  for (var i=0; i<following_users.length; i++)
  {
    console.log(following_users[i]);
    tweets.getTweetsByUser(following_users[i], -1, function(error, tweetobjs){
    	tweet_array = tweet_array.concat(tweetobjs);
    });
  }
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
               last: 'Language: English',
               following: following_users,
               followers: followed_by_users});
  console.log("Basic Index Page");
};

