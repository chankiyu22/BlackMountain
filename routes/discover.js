
var user = require('../lib/user');


// ## GET /discover page <br>
// Renders the tweets on discover page
exports.discover = function(req, res){
  res.render('discover', {user: user.getUser(req.session.username)});
};


// ## GET /activity page<br>
// Renders the recent activity on activity page
exports.activity = function(req, res){
  res.render('activity', {user: user.getUser(req.session.username)});
};
