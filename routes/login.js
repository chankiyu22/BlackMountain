var users = require('../lib/users');

exports.index = function(req, res){
  req.session.username = req.body.username;
  req.session.password = req.body.password;
  req.session.login = true;
  res.redirect("/");
};

exports.logout = function(req, res){
  req.session.username = null;
  req.session.password = null;
  req.session.login = false;
  res.redirect("/");
};

exports.captcha = function(req, res) {
  var name = req.body.username;
  for (var i = 0; i < users.length; i++) {
    if (name === users[i].username) {
      msg = "Wrong Username/Email and password combination.";
      res.render('login', {errmsg: msg});
    }
  }
  msg = "We gotta check... are you human?";
  res.render('login', {errmsg: msg});
};
