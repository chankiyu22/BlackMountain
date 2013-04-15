// # User Library

/* 
 * ## User Objects
 * Object Constructor
 *
 * #### Parameters
 * 1. fullname
 * 2. email
 * 3. username
 * 4. password
 * 5. isgroup
 */
function User(fullname, email, username, password, isgroup) {
  this.fullname = fullname;
  this.email = email;
  this.username = username;
  this.password = password;
  this.isgroup = isgroup;
}

/*
 * ## Fake Database
 */
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
// ## Function lookup
// Lookup user's information
//
// #### Parameters
// 1. username
// 2. password
// 3. include_groups
// 4. cb
//
// #### Action
// locates a user by `name` if it exists. Invokes callback `cb` with the
// signature cb(error, userobj).
//
// Returns error if username already taken
// Returns error if username length 0
// Returns error if password length < 6
exports.lookup = function(username, password, include_groups, cb) {
  var len = userdb.length;
  //Input validifier
  if (username.length==''){
    cb('username length 0');
  } else if (password.length < 6){
    cb('password too short');
  }
  for (var i = 0; i < len; i++) {
    var u = userdb[i];
    if (!(!include_groups && u.isgroup) && u.username === username) {
      if (u.password === password) {
        cb(undefined, u);
      }
      else {
        cb('error');
      }
      return;
    }
  }
  cb('captcha');
};

//
// ## Function getUser
// 
// #### Parameters
// 1. username
//
// #### Returns
// 1. Information of the user
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
// ## Function signup
// Register a new user
//
// #### Parameters
// 1. fullname
// 2. email
// 3. username
// 4. password
// 5. cb
//
// #### Actions
// if a user does not exist, create it. Invokes callback `cb` with the
// signature cb(error, userobj).
//
exports.signup = function(fullname, email, username, password, cb) {
  var new_user = undefined;
  var signup_error = undefined;
  
  //Error handling
  //We don't want to use exports.lookup on a bad username, as it'll
  //still create the user
  if (error == 'username length 0') {
    signup_error = 'Username field empty. Please enter a username.';
    cb(signup_error, undefined);
  }
  else if (error == 'password too short'){
    signup_error = 'Password must be 6 characters or longer.';
    cb(signup_error, undefined);
  }

  exports.lookup(username, password, true, function(error, userobj) {
    if (error == 'captcha')
    {
      new_user = new User(fullname, email, username, password, false);
      userdb.push(new_user);
    }
    else{
      signup_error = 'username already exists';
    }
  });
  cb(signup_error, new_user);
};


//
// ## Function registerGroup
// Register a a new group
//
// #### Parameters
// 1. fullname
// 2. username
// 3. cb
//
// #### Actions
// Invokes callback `cb` with the signature cb(error, userobj).
//
exports.registerGroup = function(fullname, username, cb) {
  var new_user = undefined;
  var signup_error = undefined;
  exports.lookup(username, '', true, function(error, userobj) {
    if (error == 'captcha')
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

//
// ## Function getAllUsers
//
// #### Actions
// returns an array of all users
//
exports.getAllUsers = function() {
    return userdb;
}
