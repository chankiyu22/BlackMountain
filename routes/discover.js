var user = require('../lib/user');

/*
 * GET /discover page.
 *
 * Render tweets
 */
exports.discover = function(req, res){
  res.render('discover', {user: user.getUser(req.session.username)});
};

/*
 * GET /activity page.
 *
 * Render activity
 */
exports.activity = function(req, res){
  res.render('activity', {user: user.getUser(req.session.username)});
};