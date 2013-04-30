var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('./data/twitter.db');

// # User Library

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
  if (include_groups)
  {
    db.get("select * from users where username=? AND password=?;",
    [username, password], cb);
  }
  else
  {
    db.get("select * from users where username=? AND password=? AND isgroup=0",
    [username, password], function (err, row)
    {
      cb(err, row);
    });
  }
  
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
exports.getUser = function(username, cb) {
  db.get("select * from users where username=?;", [username], cb);
};

// ## Function illegalUsername
// Helper function for determining whether a username is part of
// the app route pathing structure.
//
// @return true if the username is part of the route pathing and, thus,
// should not be allowed
exports.illegalUsername = function(username){
  if (username.search('/')!=-1) return true;
  if (username.search('login')!=-1) return true;
  if (username.search('logout')!=-1) return true;
  if (username.search('signup')!=-1) return true;
  if (username.search('follow')!=-1) return true;
  if (username.search('publish_tweet')!=-1) return true;
  if (username.search('connect')!=-1) return true;
  if (username.search('mentions')!=-1) return true;
  if (username.search('discover')!=-1) return true;
  if (username.search('activity')!=-1) return true;
  if (username.search('groups')!=-1) return true;
  if (username.search('username')!=-1) return true;
  if (username.search('trends')!=-1) return true;
  if (username.search('search')!=-1) return true;
  if (username.search('settings')!=-1) return true;
  return false;
}

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
  if (username.length==0) {
    signup_error = 'Username field empty. Please enter a username.';
    cb(signup_error, undefined);
  }
  else if (password.length < 6){
    signup_error = 'Password must be 6 characters or longer.';
    cb(signup_error, undefined);
  } else if (this.illegalUsername(username) == true) {
    signup_error = 'Illegal username.';
    cb(signup_error, undefined);
  }
  else {
    exports.lookup(username, password, true, function(error, userobj) {
      if (userobj === undefined)
      {
        db.run("insert into users (fullname, email, username, password, isgroup) values ( ?, ?, ?, ?, 0)",
          [fullname, email, username, password]);
        cb(undefined, {fullname: fullname, email: email, username: username, password: password});
      }
      else{
        cb('username already exists');
      }
    });
  }
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
    if (!userobj)
    {
       db.run("insert into users (fullname, email, username, password, isgroup) values ( ?, ?, ?, ?, 1)",
          [fullname, '', username, '']);
       cb(undefined, {fullname: fullname, email: '', username: username, password: ''});
    }
    else
    {
      cb('username already exists');
    }
  });
};

//
// ## Function getAllUsers
//
// #### Actions
// returns an array of all users
//
exports.getAllUsers = function(cb) {
    db.all("select * from users;", [], cb);
}
