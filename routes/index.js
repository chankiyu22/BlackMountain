var tweets = require('../lib/tweets');
var user = require('../lib/user');
var hashtags = require('../lib/hashtags');
var followers = require('../lib/followers');
var util = require('../lib/util');


// ## GET '/' page
// following_users = users that the currently logged in user follow<br>
// followed_by_users = users following the currently logged in user<br>
// tweet_array = tweets to be displayed<br>
// theuser = current logged on user<br>
exports.index = function(req, res){
  var following_users = followers.getFollowedUsers(req.session.username);
  var followed_by_users = followers.getUsersFollowing(req.session.username);
  following_users.push(req.session.username);
  var tweet_array = tweets.getTweetsByUsers(following_users);
  following_users.pop();

  user.getUser(req.session.username, function(err, theuser) {
      // Initialize tweet data<br>
      util.initTweets(tweet_array);
      
      // Populate the main page with above information: <br>
      // user = Currently logged-in user<br>
      // first = twitter <br>
      // login = login session of current user<br>
      // error = error that may occur at login<br>
      // num_tweets = Number of tweets by logged-in user<br>
      // tweets = array of tweets to display<br>
      // last = language<br>
      // following: number of users following logged-in user<br>
      // followed = number of users logged-in user follows<br>
      res.render('index', {user: theuser,
               first: 'Twitter',
               login: req.session.login,
               error: req.session.login_error,
               num_tweets: tweets.getTweetCountByUser(req.session.username),
               tweets: tweet_array,
               last: 'Language: English',
               following: following_users,
               followers: followed_by_users,
               wtf: util.getWhoToFollow(req.session.username)});
  });
};

