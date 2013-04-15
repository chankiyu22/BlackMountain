var users = require('../lib/user');

//  ## POST /signup page. <br>
// Display information for signup page
exports.index = function(req, res){
  res.render('signup', {first: 'Twitter',
  						name: (req.body.name ? req.body.name : ""),
  						email: (req.body.email ? req.body.email : ""),
              error: req.session.signup_error,
  						password: (req.body.password ? req.body.password : ""),
                        last: 'Have an account? Sign in'});
};

// ## POST /signup/addUser.<br>
// Generate a new user based on signup information and log them in,
// or display an error.<br>
// fullname = user's full name<br>
// email = user's email address<br>
// username = user's chosen display name<br>
// pwd = user's password<br>
exports.createUser = function(req, res) {
  var fullname = req.body.name;
  var email = req.body.email;
  var username = req.body.username;
  var pwd = req.body.password;

  console.log("signup " + username + " " + pwd);
  users.signup(fullname, email, username, pwd, function(error, userobj){
    // If all info is present, signup is successful and redirects to '/'
    if (error == undefined)
    {

      req.session.fullname = userobj.fullname;
      req.session.email    = userobj.email;
      req.session.username = userobj.username;
      req.session.password = userobj.password;
      req.session.signup_error = null;
      req.session.login = true;
      res.redirect('/');
    } 
    // If info is missing, it causes an error and redirects back to '/signup'
    else
    {
      req.session.signup_error = error;
      req.session.login = false;
      res.redirect('/signup');
    } 
  });
}

