var user = require('../lib/user');

//Render interactions (new follows, replies)
exports.connect = function(req, res){
  res.render('connect', {user: user.getUser(req.session.username)});
};

//Render mentions
exports.mentions = function(req, res){
  res.render('mentions', {user: user.getUser(req.session.username)});
};
