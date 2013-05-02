var user = require('../lib/user');
var tweets = require('../lib/tweets');
var util = require('../lib/util');

// ## GET /search?searchfor='string'<br>
// Gets search page containing all the tweets containing the searchfor string
exports.search = function(req, res){
	var searchstring = req.query.searchfor;
	tweets.getTweetsContaining(searchstring, function(err, tweet_array) {
    if (tweet_array) 
    {
      util.initTweets(tweet_array);
    }
    else
    {
      tweet_array = [];
    }
    user.getUser(req.session.username, function(err, userdata) {
      util.getWhoToFollow(req.session.username, function(err, wtf) {
        res.render('search', {user: userdata,
                tweets: tweet_array,
                timeline_header: 'Search Results For ' + searchstring,
                wtf: wtf});
      });
    });
  });
};

// ## GET /search/getModule?searchfor='string'<br>
// Gets the timeline for all the tweets containing the searchfor string
exports.getModule = function(req, res){
	var searchstring = req.query.searchfor;
	tweets.getTweetsContaining(searchstring, function(err, tweet_array) {
    console.log(tweet_array);
  	if (tweet_array) 
    {
      util.initTweets(tweet_array);
    }
    else
    {
      tweet_array = [];
    }
    user.getUser(req.session.username, function(err, userdata) {
    	res.render('tweet_timeline', {user: userdata,
    						tweets: tweet_array,
    						timeline_header: 'Search Results For ' + searchstring});
    });
  });
};
