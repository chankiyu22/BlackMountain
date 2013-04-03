// # Tweet Library

// ## Tweet Objects
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

//
// ## publishes a new tweet
// Invokes callback `cb` with the signature cb(error, tweetobj).
//
exports.publish = function(owner, message, cb) {
  var new_tweet = new Tweet(owner,  message);
  tweetdb.push(new_tweet);
  cb(undefined, new_tweet);
};

//
// ## get tweets owned by user
// limit = -1 means no limit
// Invokes callback `cb` with the signature cb(error, tweetobjs).
//
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

//
// ## get tweets owned by any user in user_array
// limit = -1 means no limit
// Invokes callback `cb` with the signature cb(error, tweetobjs).
//
exports.getTweetsByUsers = function(user_array, limit) {
  var tweet_array = [];
  //Populate tweets array with tweets from user_array
  for (var i=0; i<user_array.length; i++)
  {
    tweet_array = tweet_array.concat(this.getTweetsByUser(user_array[i], -1));
  }
  return tweet_array;
};

//
// ## get tweets that mention user (@username)
// user - name of user to search for
//
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

//
// ## get number of tweets by user
//
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