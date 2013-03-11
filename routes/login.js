var userdb = require('../lib/user');

exports.index = function(req, res){
  var username = req.body.username;
  var password = req.body.password;
  userdb.lookup(username, password, function(error, userobj) {
    if (userobj)
    {
      req.session.username = userobj.username;
      req.session.password = userobj.password;
      req.session.login_error = null;
      req.session.login = true;
    }
    else
    {
      req.session.login_error = error;
    }
  });
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
