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
  followers.getFollowedUsers(req.session.username, function(err, following_users) {
    followers.getUsersFollowing(req.session.username, function(err, followed_by_users) {
      tweets.getTweetsOfFollowing(req.session.username, function(err, tweet_array) {
        user.getUser(req.session.username, function(err, theuser) {
          tweets.getTweetCountByUser(req.session.username, function(err, num_tweets) {
            util.getWhoToFollow(req.session.username, function(err, wtf) {
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
                         num_tweets: num_tweets.count,
                         tweets: tweet_array,
                         following: following_users,
                         followers: followed_by_users,
                         wtf: wtf});
            });
          });
        });
      });
    });
  });
};

