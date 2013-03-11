// # User Library

// ## User Objects
function User(fullname, email, username, password) {
  this.fullname = fullname;
  this.email = email;
  this.username = username;
  this.password = password;
}

// This is our stub database until we look at a real database!
var userdb = [
  new User('Mc Testington', 'tester@umass.com', 'test',   '123'),
  new User('Bill Crane', 'wcrane@student.umass.edu', 'argo15', 'billz'),
  new User('Steve Jobs', 'sjobs@apple.com', 'sjobs', 'abc')
];

//
// ## lookup function
// locates a user by `name` if it exists. Invokes callback `cb` with the
// signature cb(error, userobj).
//
exports.lookup = function(username, password, cb) {
  var len = userdb.length;
  for (var i = 0; i < len; i++) {
    var u = userdb[i];
    if (u.username === username) {
      if (u.password === password) {
        cb(undefined, u);
      }
      else {
        cb('password is not correct');
      }
      return;
    }
  }
  cb('user not found');
};

//
// gets a user by name, returns undefined otherwise
//
exports.getUser = function(username) {
  var len = userdb.length;
  for (var i = 0; i < len; i++) {
    var u = userdb[i];
    if (u.username === username) {
      return u;
    }
  }
  return undefined;
};

//
// ## register a new user
// if a user does not exist, create it. Invokes callback `cb` with the
// signature cb(error, userobj).
//
exports.signup = function(fullname, email, username, password, cb) {
  var new_user = undefined;
  var signup_error = undefined;
  exports.lookup(username, password, function(error, userobj) {
    if (error == 'user not found')
    {
      new_user = new User(fullname, email, username, password);
      userdb.push(new_user);
    }
    else
    {
      signup_error = 'username already exists';
    }
  });
  cb(signup_error, new_user);
};