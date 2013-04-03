var user = require('../lib/user');

/*
 * ## Function discover(req, res)
 * Routing /discover
 *
 * #### Render
 * 
 */
exports.discover = function(req, res){
  res.render('discover', {user: user.getUser(req.session.username)});
};

/*
 * ## Function activity(req, res)
 * Routing /activity
 *
 * #### Render
 */
exports.activity = function(req, res){
  res.render('activity', {user: user.getUser(req.session.username)});
};