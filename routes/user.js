var followers = require('../lib/followers');

/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.follow = function(req, res){
  followers.addFollower(req.session.username, req.body.tofollow);
  res.redirect('back');
};