var followers = require('../lib/followers');

/*
 * POST /follow
 *
 * Add a new follower
 */
exports.follow = function(req, res){
  followers.addFollower(req.session.username, req.body.tofollow);
  res.redirect('back');
};
