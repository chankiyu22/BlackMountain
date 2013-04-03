// # Tweet Library

// ## Tweet Objects
//
//@param owner - User who posted tweet<br />
//@param message - Tweet text contents<br />
//@param date - Tweet timestamp
function Tweet(owner, message, date) {
  this.owner = owner;
  this.message = message;
  this.date = date;
}

// This is our stub database until we look at a real database!
var tweetdb = [
  new Tweet('test',   '@argo15 This is a tweet. @Tweeters', new Date()),
  new Tweet('test',   '@UmassCS Cruel Owner Chains Bike Outside In Freezing Weather http://onion.com/XYjzYY', new Date()),
  new Tweet('test',   '@Testers This is a test of your emergency @sjobs tweetcast system. ', new Date()),
  new Tweet('argo15', '@Programmers I\'m bill @test', new Date()),
  new Tweet('argo15', 'Tweeting @sjobs is fun @Tweeters', new Date()),
  new Tweet('sjobs',  '@Programmers I\'m not dead @argo15 ', new Date()),
  new Tweet('sjobs',  '@test Boo @UmassCS', new Date())
];

// ## Publishes a new tweet
//
//@param owner - User who posted tweet<br />
//@param message - Tweet text contents<br />
// Invokes callback `cb` with the signature cb(error, tweetobj).
exports.publish = function(owner, message, cb) {
  var new_tweet = new Tweet(owner,  message);
  tweetdb.push(new_tweet);
  cb(undefined, new_tweet);
};

// ## Get tweets owned by user
//
//@param user - User whose tweets are being retrieved<br />
//@param limit - How many tweets we're retrieving<br />
//limit = -1 means no limit<br />
//Invokes callback `cb` with the signature cb(error, tweetobjs).
exports.getTweetsByUser = function(user, limit) {
  var tweetobjs = [];
  for (var i = 0; i < tweetdb.length; i++)
  {
    if (user == tweetdb[i].owner)
    {
      tweetobjs.push(tweetdb[i]);
    }
    if (limit >= 0 && tweetobjs.length == limit)
    {
      break;
    }
  }
  return tweetobjs;
};

// ## Get tweets owned by any user in user_array
//@param user_array - List of users whose tweets are being retrieved<br />
//@param limit - Number of tweets to retrieve<br />
//limit = -1 means no limit<br />
//Invokes callback `cb` with the signature cb(error, tweetobjs).
exports.getTweetsByUsers = function(user_array, limit) {
  var tweet_array = [];
  //Populate tweets array with tweets from user_array
  for (var i=0; i<user_array.length; i++)
  {
    tweet_array = tweet_array.concat(this.getTweetsByUser(user_array[i], -1));
  }
  return tweet_array;
};

// ## Get tweets that mention user (@username)
//
//@param user - Name of user to search for<br />
//@return - Array of Tweet objects mentioning `user`
exports.getTweetsThatMention = function(user) {
  var tweetobjs = [];
  for (var i = 0; i < tweetdb.length; i++)
  {
    if (tweetdb[i].message.indexOf("@" + user) !== -1)
    {
      tweetobjs.push(tweetdb[i]);
    }
  }
  return tweetobjs;
};

// ## Get number of tweets by user
//
//@param user - User whose tweet count is being retrieved<br />
//@return - Number of tweets `user` has posted
exports.getTweetCountByUser = function(user) {
  var tweetobjs = [];
  for (var i = 0; i < tweetdb.length; i++)
  {
    if (user == tweetdb[i].owner)
    {
      tweetobjs.push(tweetdb[i]);
    }
  }
  return tweetobjs.length;
};
