var user = require('../lib/user');

// ## GET /settings/profile page<br>
// Render the "Profile" section of "Settings"
exports.profile = function(req, res){
  res.render('settings_profile', {user: user.getUser(req.session.username)});
};

// ## GET /settings/account page<br>
// Render the "Acount" section of "Settings"
exports.account = function(req, res){
  res.render('settings_account', {user: user.getUser(req.session.username)});
};

// ## GET /settings/password page<br>
// Render the "Password" section of "Settings"
exports.password = function(req, res){
  res.render('settings_password', {user: user.getUser(req.session.username)});
};
