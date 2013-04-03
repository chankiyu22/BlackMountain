var userdb = require('../lib/user');

/*
 * ## Function index(req, res)
 * Routing /login [POST]
 *
 * #### Action
 * Preform login validation and initialize user sesison.
 * If success
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
 * ## Function logout(req, res)
 * Routing /logout
 *
 * #### Action
 * 1. Clear current session login data
 * 2. Go to main page
 */
exports.logout = function(req, res){
  req.session.username = null;
  req.session.password = null;
  req.session.login = false;
  res.redirect("/");
};

/*
 * ## Function captcha(req, res)
 * Routing /captcha
 *
 * #### Render
 * 1. Error Message corresponding to the type of error
 *
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
