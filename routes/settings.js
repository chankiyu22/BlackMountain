var user = require('../lib/user');

exports.profile = function(req, res){
  res.render('settings_profile', {user: user.getUser(req.session.username)});
};

exports.account = function(req, res){
  res.render('settings_account', {user: user.getUser(req.session.username)});
};

exports.password = function(req, res){
  res.render('settings_password', {user: user.getUser(req.session.username)});
};