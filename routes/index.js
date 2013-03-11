var tweets = require('../lib/tweets');
var user = require('../lib/user');
var followers = require('../lib/followers');

/*
 * GET / page.
 */
exports.index = function(req, res){
  //Tweets to display
  var tweet_array = [];
  //Users the currently-logged-in person follows
  var following_users = followers.getFollowedUsers(req.session.username);
  //Users following the person currently logged in
  var followed_by_users = followers.getUsersFollowing(req.session.username);
  
  //Populate tweets array with tweets from followed users
  for (var i=0; i<following_users.length; i++)
  {
    tweets.getTweetsByUser(following_users[i], -1, function(error, tweetobjs){
    	tweet_array = tweet_array.concat(tweetobjs);
    });
  }
  
  //Current user
  var theuser = user.getUser(req.session.username);
  
  //Attach username to each tweet
  for (var i=0; i<tweet_array.length; i++)
  {
    tweet_array[i].userdata = user.getUser(tweet_array[i].owner);
  }
  
  /*
   * Populate the main page with above information:
   * user = Currently logged-in user
   * first = 
   * login = 
   * error =
   * num_tweets = Number of tweets by logged-in user
   * tweets = array of tweets to display
   * last =
   * following: number of users following logged-in user
   * followed = number of users logged-in user follows
  */
  res.render('index', {user: theuser,
  					   first: 'Twitter',
  					   login: req.session.login,
  					   error: req.session.login_error,
               num_tweets: tweets.getTweetCountByUser(req.session.username),
  					   tweets: tweet_array,
               last: 'Language: English',
               following: following_users,
               followers: followed_by_users});
};

