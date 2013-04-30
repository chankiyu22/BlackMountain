var tweets = require('../lib/tweets');
var user = require('../lib/user');
var followers = require('../lib/followers');
var util = require('../lib/util');
var groups = require('../lib/groups');


 // ## GET /<username> page.<br>
 // Gets the following info for main page of a user profile display<br>
 // username = User<br>
 // theuser = the current logged in user<br>
 // group = group that user is a member of<br>
 // tweet_array = Array of user's tweets<br>
 // following_users = users following username<br>
 // followed_by_users = users followed by username<br>
exports.profile = function(req, res, next){
  var username = req.param('username');
  user.getUser(username, function(err, profile) {
    if (profile == undefined)
    {
      next();
    }
   // If theuser is a member of a group, finds group info
    else if (profile.isgroup)
    {
      var group = groups.getGroupByName(username);
      user.getUser(req.session.username, function(err, userdata) {
          res.render('group_profile', {profile: profile,
                            user: userdata,
                            group: group,
                            isMember: groups.isMember(group.id, req.session.username),
                            session: req.session,
                            members: groups.getMembersForGroup(group.id),
                            wtf: util.getWhoToFollow(req.session.username)});
      });
    }
    else
    {
      var tweet_array = undefined;
      tweets.getTweetsByUser(username, -1, function(err, tweet_array) {
        tweets.getTweetCountByUser(username, function(err, num_tweets) {
          console.log(tweet_array);
          util.initTweets(tweet_array);
          var following_users = followers.getFollowedUsers(username);
          var followed_by_users = followers.getUsersFollowing(username);
          user.getUser(req.session.username, function(err, userdata) {
          res.render('profile', {profile: profile,
                        user: userdata,
                        num_tweets: num_tweets.count,
                        tweets: tweet_array,
                        following: following_users,
                        followers: followed_by_users,
                        isFollowing: followers.isFollowing(req.session.username, username),
                        wtf: util.getWhoToFollow(req.session.username)});
          });
        });
      });
    }
  });
};

// ## GET /<username>/following page.<br>
// Gets the info to display on a user's "Following" page
// username = User<br>
// following_users = users following username<br>
// followed_by_users = users following username<br>
// following_user_data = users that username is following<br>
exports.following = function(req, res){
  var username = req.param('username');
  var following_users = followers.getFollowedUsers(username);
  var followed_by_users = followers.getUsersFollowing(username);
  var following_user_data = [];

// Finds all users that username is following<br>
  for (var i=0; i<following_users.length; i++)
  {
    //following_user_data.push(user.getUser(following_users[i]));
    following_user_data.push({username: following_users[i], fullname: 'tmp'});
  }
  user.getUser(username, function(err, profile) {
    user.getUser(req.session.username, function(err, userdata) {
      tweets.getTweetCountByUser(username, function(err, num_tweets) {
        res.render('following', {profile: profile,
                  user: userdata,
                 	num_tweets: num_tweets.count,
    				      tweets: [],
                  following: following_user_data,
                  followers: followed_by_users,
                  isFollowing: followers.isFollowing(req.session.username, username),
                  wtf: util.getWhoToFollow(req.session.username)});
      });
    });
  });
};

// ## GET /<username>/followers page.<br>
// Gets the info to display on a user's "Followers" pages<br>
// username = User<br>
// following_users = users following username<br>
// followed_by_users = users following username<br>
// followed_by_user_data = users following username<br>
exports.followers = function(req, res){
  var username = req.param('username');
  var following_users = followers.getFollowedUsers(username);
  var followed_by_users = followers.getUsersFollowing(username);
  var followed_by_user_data = [];

// Finds all users followed by username
  for (var i=0; i<followed_by_users.length; i++)
  {
    //followed_by_user_data.push(user.getUser(followed_by_users[i]));
    followed_by_user_data.push({username: followed_by_users[i], fullname: 'tmp'});
  }
  user.getUser(username, function(err, profile) {
    user.getUser(req.session.username, function(err, userdata) {
      tweets.getTweetCountByUser(username, function(err, num_tweets) {
        res.render('followers', {profile: profile,
                user: userdata,
               	num_tweets: num_tweets.count,
  				      tweets: [],
                following: following_users,
                followers: followed_by_user_data,
                isFollowing: followers.isFollowing(req.session.username, username),
                wtf: util.getWhoToFollow(req.session.username)});
      });
    });
  });
};

// ## GET /<username>/favorites page.<br>
// Gets the info to display on a user's "Favorites" page<br>
// username = User<br>
// following_users = users following username<br>
// followed_by_users = users following username<br>
exports.favorites = function(req, res){
  var username = req.param('username');
  var following_users = followers.getFollowedUsers(username);
  var followed_by_users = followers.getUsersFollowing(username);
  user.getUser(username, function(err, profile) {
    user.getUser(req.session.username, function(err, userdata) {
      tweets.getTweetCountByUser(username, function(err, num_tweets) {
        res.render('favorites', {profile: profile,
                user: userdata,
               	num_tweets: num_tweets.count,
  				      tweets: [],
                following: following_users,
                followers: followed_by_users,
                isFollowing: followers.isFollowing(req.session.username, username),
                wtf: util.getWhoToFollow(req.session.username)});
      });
    });
  });
};
