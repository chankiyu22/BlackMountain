var tweets = require('../lib/tweets');
var user = require('../lib/user');

// ## POST /publish_tweet<br>
// Add tweet to tweets database
exports.publish_tweet = function(req, res){
	user.getUser(req.body.username, function(err, userdata) {
		tweets.publish(userdata, req.body.message, function(){})
   		res.send('success');
	});
};
