var userdb = require('../lib/user');

/*
 * ## Function index(req, res)
 * Routing /login [POST]
 *
 * #### Action
 * Preform login validation and initialize user sesison.
 * If success
 */
exports.index = function(req, res) {
  res.render('login', {username_or_email: '',
                       errmsg: ''});
};

exports.verify = function(req, res){
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
      res.redirect("/"); 
    }
    else
    {
      if (error === 'captcha'){
        res.redirect('/login/captcha?username_or_email=' + username);
      }
      else if (error === 'error') {
        res.redirect('/login/error?username_or_email=' + username);
      }
    }
  });
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
  var username = req.query.username_or_email;
  if(username === undefined) {
    res.render('login', {username_or_email: '',
                           errmsg: ''});
  }
  else {
    res.render('login', {username_or_email: username,
                           errmsg: 'We gonna check...Are you human?'});
  }
};

exports.error = function(req, res) {
  var username = req.query.username_or_email;
  if (username === undefined) {
    res.render('login', {username_or_email: '',
                           errmsg: ''});
  }
  else {
    res.render('login', {username_or_email: username,
                  errmsg: 'Wrong Username/Email and password combination'});
  }
};
