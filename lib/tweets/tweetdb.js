// # Tweet Library
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('./data/twitter.db');
var hashtags = require('../hashtags');

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
  new Tweet('test',   '@argo15 This is a #test #tweet. @Tweeters', new Date()),
  new Tweet('test',   '@UmassCS Cruel Owner Chains Bike Outside In Freezing Weather http://onion.com/XYjzYY', new Date()),
  new Tweet('test',   '@Testers This is a #test of your emergency @sjobs tweetcast system. ', new Date()),
  new Tweet('argo15', '@Programmers I\'m #bill @test', new Date()),
  new Tweet('argo15', 'Tweeting @sjobs is fun @Tweeters', new Date()),
  new Tweet('sjobs',  '@Programmers I\'m not dead @argo15 ', new Date()),
  new Tweet('sjobs',  '@test Boo @UmassCS', new Date())
];

// ## Publishes a new tweet
//
//@param owner - User who posted tweet<br />
//@param message - Tweet text contents<br />
// Invokes callback `cb` with the signature cb(error, tweetobj).
exports.publish = function(ownerdata, message, cb) {
  db.run("insert into tweets (owner_id, message) values (?, ?)",
          [ownerdata.id, message], cb);
  
  //Retrieve hashtags, update hashtag database
  var words = message.split(" ");
	for(var i=0; i<words.length; i++)
	{
    if (words[i].charAt(0) === '#'){
      hashtags.addHashtag(words[i].substring(1), 1);
    }
	}
};

// ## Get tweets owned by user
//
//@param user - User whose tweets are being retrieved<br />
//@param limit - How many tweets we're retrieving<br />
//limit = -1 means no limit<br />
//Invokes callback `cb` with the signature cb(error, tweetobjs).
exports.getTweetsByUser = function(user, limit, cb) {
  if (limit < 0)
  {
    limit = 1000;
  }
  db.all("select U.username as owner, U.fullname, T.message from tweets T, users U where U.username=? AND U.id = T.owner_id order by date desc limit ?;", 
    [user, limit], cb);
};

// ## Get tweets that mention user (@username)
//
//@param user - Name of user to search for<br />
//@return - Array of Tweet objects mentioning `user`
exports.getTweetsThatMention = function(user, cb) {
  db.all("select U.username as owner, U.fullname, T.message from tweets T, users U where T.message like ? AND U.id = T.owner_id order by date desc;", 
    ['%@' + user + '%'], cb);
};

// ## Get number of tweets by user
//
//@param user - User whose tweet count is being retrieved<br />
//@return - Number of tweets `user` has posted
exports.getTweetCountByUser = function(user, cb) {
  db.get("select count(*) as count from tweets T, users U where U.username=? AND U.id = T.owner_id;", 
    [user], cb);
};

// ## Get tweets containing a string
//
//@param searchfor - string to search for<br />
//@return - Array of tweets
exports.getTweetsContaining = function(searchfor, cb) {
  db.all("select U.username as owner, U.fullname, T.message from tweets T, users U where T.message like ? AND U.id = T.owner_id order by date desc;", 
    ['%' + searchfor + '%'], cb);
};


// ## Get tweets owned by any user in user_array
//@param user_array - List of users whose tweets are being retrieved<br />
//limit = -1 means no limit<br />
//Invokes callback `cb` with the signature cb(error, tweetobjs).
exports.getTweetsOfFollowing = function(username, cb) {
  db.all("select U.username as owner, U.fullname, T.message from tweets T, users U where U.id=T.owner_id AND ( U.username=? OR T.owner_id in (select following_id from followers F, users U where F.follower_id=U.id AND U.username=?)) order by date desc;", 
    [username, username], cb);
};

// ## Get tweets owned by any user in user_array
//@param user_array - List of users whose tweets are being retrieved<br />
//@param limit - Number of tweets to retrieve<br />
//limit = -1 means no limit<br />
//Invokes callback `cb` with the signature cb(error, tweetobjs).
exports.getTweetsOfGroups = function(username, cb) {
  db.all("select U2.username as owner, U2.fullname, T.message from tweets T, groups G, groupmembers GM, users U, users U2 where U2.id=T.owner_id AND U.username=? AND U.id=GM.user_id AND GM.group_id=G.id AND T.message like '%@' || G.username || '%';", 
    [username], cb);
};