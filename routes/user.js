var followers = require('../lib/followers');


// ## POST /follow<br>
// Add a new follower
exports.follow = function(req, res){
  followers.addFollower(req.session.username, req.body.tofollow, function(result) {
  	res.send(result);
  });
};
