// # User Library

// ## User Objects
function User(fullname, email, username, password, isgroup) {
  this.fullname = fullname;
  this.email = email;
  this.username = username;
  this.password = password;
  this.isgroup = isgroup;
}

// This is our stub database until we look at a real database!
var userdb = [
  new User('Mc Testington', 'tester@umass.com', 'test',   '123', false),
  new User('Bill Crane', 'wcrane@student.umass.edu', 'argo15', 'billz', false),
  new User('Steve Jobs', 'sjobs@apple.com', 'sjobs', 'abc', false),
  new User('Tweeters', '', 'Tweeters', '', true),
  new User('Umass Computer Science', '', 'UmassCS', '', true),
  new User('Programmers', '', 'Programmers', '', true),
  new User('Testers', '', 'Testers', '', true),
  new User('Bill\'s Group', '', 'bill', '', true)
];

//
// ## lookup function
// locates a user by `name` if it exists. Invokes callback `cb` with the
// signature cb(error, userobj).
//
exports.lookup = function(username, password, include_groups, cb) {
  var len = userdb.length;
  for (var i = 0; i < len; i++) {
    var u = userdb[i];
    if (!(!include_groups && u.isgroup) && u.username === username) {
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
  exports.lookup(username, password, true, function(error, userobj) {
    if (error == 'user not found')
    {
      new_user = new User(fullname, email, username, password, false);
      userdb.push(new_user);
    }
    else
    {
      signup_error = 'username already exists';
    }
  });
  cb(signup_error, new_user);
};


//
// ## register a group name
// Invokes callback `cb` with the signature cb(error, userobj).
//
exports.registerGroup = function(fullname, username, cb) {
  var new_user = undefined;
  var signup_error = undefined;
  exports.lookup(username, '', true, function(error, userobj) {
    if (error == 'user not found')
    {
      new_user = new User(fullname, '', username, '', true);
      userdb.push(new_user);
    }
    else
    {
      signup_error = 'username already exists';
    }
  });
  cb(signup_error, new_user);
};