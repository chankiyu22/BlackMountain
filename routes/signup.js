var users = require('../lib/users');

exports.index = function(req, res){
  res.render('signup', {first: 'Twitter',
  						name: req.body.name,
  						email: req.body.email,
  						password: req.body.password,
                        last: 'Have an account? Sign in'});
};

function createUser(req, res) {
  var username = req.body.username;
  var pwd = req.body.password;
  var userData = {name: username, password: pwd};
  users.addUser(userData);
  res.redirect('/');
}

exports.createUser = createUser;
