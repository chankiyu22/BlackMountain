var tweets = require('../tweets');
var user = require('../user');
var followers = require('../followers');

//
// ## Build Tweet Html
// creates mention links to profiles.
//
exports.buildTweetHtml = function(tweet) {
	var message = tweet.message;
	var done = false;
	while (!done)
	{
		done = true;
		var words = message.split(" ");
		for(var i=0; i<words.length; i++)
		{
			if (words[i].charAt(0) === '@')
			{
				message = message.replace(words[i], "<a class='mention' href='/" + words[i].substring(1) + "'>" + words[i]+"</a>");
				done = false;
			}
		}
	}
    tweet.html = "<div>"+message+"</div>";
};

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
    this.buildTweetHtml(tweet_array[i]);
  }
};