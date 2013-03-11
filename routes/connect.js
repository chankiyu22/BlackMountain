var user = require('../lib/user');

exports.connect = function(req, res){
  res.render('connect', {user: user.getUser(req.session.username)});
};

exports.mentions = function(req, res){
  res.render('mentions', {user: user.getUser(req.session.username)});
};