var tweets = require('../tweets');
var user = require('../user');
var followers = require('../followers');

//
// ## initialize tweets
// Takes an array of tweets and initializes them with data about the 
// owner and adds the html version of the tweet
//
exports.initTweets = function(tweet_array) {
  //Attach user to each tweet
  for (var i=0; i<tweet_array.length; i++)
  {
    tweet_array[i].userdata = user.getUser(tweet_array[i].owner);
  }
};