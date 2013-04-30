
var user = require('../lib/user');

// ## GET /discover page <br>
// Renders the tweets on discover page
exports.discover = function(req, res){
	user.getUser(req.session.username, function(err, userdata) {
		res.render('discover', {user: userdata,
  							wtf: util.getWhoToFollow(req.session.username)});
	});
};

// ## GET /activity page<br>
// Renders the recent activity on activity page
exports.activity = function(req, res){
	user.getUser(req.session.username, function(err, userdata) {
  		res.render('activity', {user: userdata,
  							wtf: util.getWhoToFollow(req.session.username)});
  	});
};
