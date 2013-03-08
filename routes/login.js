var users = require('../lib/users');

exports.index = function(req, res){
  res.render('login', {errmsg: ''});
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
