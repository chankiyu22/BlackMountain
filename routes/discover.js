var user = require('../lib/user');

exports.discover = function(req, res){
  res.render('discover', {user: user.getUser(req.session.username)});
};

exports.activity = function(req, res){
  res.render('activity', {user: user.getUser(req.session.username)});
};