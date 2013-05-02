
var user = require('../lib/user');

// ## GET /discover page <br>
// Renders the tweets on discover page
exports.discover = function(req, res){
	user.getUser(req.session.username, function(err, userdata) {
      	util.getWhoToFollow(req.session.username, function(err, wtf) {
			res.render('discover', {user: userdata,
  							wtf: wtf});
		});
	});
};

// ## GET /activity page<br>
// Renders the recent activity on activity page
exports.activity = function(req, res){
	user.getUser(req.session.username, function(err, userdata) {
      	util.getWhoToFollow(req.session.username, function(err, wtf) {
  			res.render('activity', {user: userdata,
  							wtf: wtf});
  		});
  	});
};
