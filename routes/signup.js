var users = require('../lib/user');

exports.index = function(req, res){
  res.render('signup', {first: 'Twitter',
  						name: (req.body.name ? req.body.name : ""),
  						email: (req.body.email ? req.body.email : ""),
              error: req.session.signup_error,
  						password: (req.body.password ? req.body.password : ""),
                        last: 'Have an account? Sign in'});
};

function createUser(req, res) {
  var username = req.body.username;
  var pwd = req.body.password;
  console.log("signup " + username + " " + pwd);
  users.signup(username, pwd, function(error, userobj){
    if (userobj !== undefined)
    {
      req.session.username = userobj.username;
      req.session.password = userobj.password;
      req.session.signup_error = null;
      req.session.login = true;
      res.redirect('/');
    } 
    else
    {
      req.session.signup_error = error;
      req.session.login = false;
      res.redirect('/signup');
    } 
  });
}

exports.createUser = createUser;
