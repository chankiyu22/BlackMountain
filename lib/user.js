var db = require('db.js');

var users = db.userlist;
user = null;
password = null;

exports.login = function (user, password) {
  console.log("Login function");
  if (user === null) {
    return {isLogin: false,
            reason: null};
  }
  for (var i = 0; i < users.length; i++) {
    if (users[i].name === user)
      if (users[i].password === password) {
        return {isLogin: true,
                reason: null};
      } else {
        return {isLogin: false,
                reason: "noPassword"};
      }
  }
  return {isLogin: false,
          reason: "noName"};
}
    
