var followers = require('../lib/followers');


// ## POST /follow<br>
// Add a new follower
exports.follow = function(req, res){
  var result = followers.addFollower(req.session.username, req.body.tofollow);
  res.send(result);
};
