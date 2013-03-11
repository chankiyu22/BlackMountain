var user = require('../lib/user');

/*
 * GET /settings/profile page.
 */
exports.profile = function(req, res){
  res.render('settings_profile', {user: user.getUser(req.session.username)});
};

/*
 * GET /settings/account page.
 */
exports.account = function(req, res){
  res.render('settings_account', {user: user.getUser(req.session.username)});
};

/*
 * GET /settings/password page.
 */
exports.password = function(req, res){
  res.render('settings_password', {user: user.getUser(req.session.username)});
};