var userdb = require('../lib/user');

/*
 * POST /login form.
 * Preform login validation and initialize user sesison.
 */
exports.index = function(req, res){
  var username = req.body.username;
  var password = req.body.password;
  userdb.lookup(username, password, false, function(error, userobj) {
    if (userobj)
    {
      req.session.fullname = userobj.fullname;
      req.session.email    = userobj.email;
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
  //Return to index and rerender; index is conditional on login status
  res.redirect("/"); 
};

/*
 * GET /logout.
 * Clear current session login data
 */
exports.logout = function(req, res){
  req.session.username = null;
  req.session.password = null;
  req.session.login = false;
  res.redirect("/");
};

/*
 * GET captcha.
 *
 * Display an error message if bad username/pass combination
 */
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
