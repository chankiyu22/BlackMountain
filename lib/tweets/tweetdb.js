// # Tweet Library

// ## Tweet Objects
function Tweet(owner, message, date) {
  this.owner = owner;
  this.message = message;
  this.date = date;
}

// This is our stub database until we look at a real database!
var tweetdb = [
  new Tweet('test',   'This is a tweet.', new Date()),
  new Tweet('test',   'Cruel Owner Chains Bike Outside In Freezing Weather http://onion.com/XYjzYY', new Date()),
  new Tweet('test',   'This is a test of your emergency tweetcast system.', new Date()),
  new Tweet('argo15', 'I\'m bill', new Date()),
  new Tweet('argo15', 'Tweeting is fun', new Date()),
  new Tweet('sjobs',  'I\'m not dead', new Date()),
  new Tweet('sjobs',  'Boo', new Date())
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
// ## publishes a new tweet
// limit = -1 means no limit
// Invokes callback `cb` with the signature cb(error, tweetobjs).
//
exports.getTweetsByUser = function(user, limit, cb) {
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
  cb(undefined, tweetobjs);
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