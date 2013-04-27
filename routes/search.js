var user = require('../lib/user');
var tweets = require('../lib/tweets');
var util = require('../lib/util');

// ## GET /search?searchfor='string'<br>
// Gets search page containing all the tweets containing the searchfor string
exports.search = function(req, res){
	var searchstring = req.query.searchfor;
	var tweet_array = tweets.getTweetsContaining(searchstring);
	util.initTweets(tweet_array);
  	res.render('search', {user: user.getUser(req.session.username),
  						tweets: tweet_array,
  						timeline_header: 'Search Results For ' + searchstring,
  						wtf: util.getWhoToFollow(req.session.username)});
};

// ## GET /search/getModule?searchfor='string'<br>
// Gets the timeline for all the tweets containing the searchfor string
exports.getModule = function(req, res){
	var searchstring = req.query.searchfor;
	var tweet_array = tweets.getTweetsContaining(searchstring);
	util.initTweets(tweet_array);
  	res.render('tweet_timeline', {user: user.getUser(req.session.username),
  						tweets: tweet_array,
  						timeline_header: 'Search Results For ' + searchstring});
};
