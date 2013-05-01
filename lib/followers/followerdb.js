// # Follower Library
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('./data/twitter.db');

//
// ## Adds a new follower relation
//
// @param follower - User doing the following<br />
// @param following - User being followed<br />
// @return error/success message 
exports.addFollower = function(follower, following, cb) {
  if (follower == following)
  {
    cb('cannot follow self');
  }
  db.get("select count(*) as count from followers F, users U1, users U2 where U1.id=F.follower_id AND U2.id=F.following_id AND U1.username=? AND U2.username=?;", 
    [follower, following], function(err, rows) {
      if (rows.count > 0)
      {
        cb('already following');
      }
      else
      {
        db.get("select U1.id as follower_id, U2.id as following_id from users U1, users U2 where U1.username=? AND U2.username=?;", 
          [follower, following], function(err, user_ids) {
            db.run("insert into followers values (?, ?);",
              [user_ids.follower_id, user_ids.following_id], function(err, rows) {
                cb('success');
              });
          });
      }
  });
};

//
// ## Gets all users followed by 'user'
//
//@param user - Target user<br />
//@return users - Array of users that `user` is following
exports.getFollowedUsers = function(user, cb) {
  db.all("select U2.username, U2.fullname from users U1, users U2, followers F where U1.username=? AND U1.id=F.follower_id AND U2.id=F.following_id;", 
    [user], cb);
};

//
// ## Gets all users following 'user'
//
//@param user - target user<br />
//@return users - array of users following `user`
exports.getUsersFollowing = function(user, cb) {
  db.all("select U2.username, U2.fullname from users U1, users U2, followers F where U1.username=? AND U1.id=F.following_id AND U2.id=F.follower_id;", 
    [user], cb);
};

//
// ## Is Following
//
//@param follower - follower<br />
//@param following - following<br />
//@return true if 'follower' is following 'following'
exports.isFollowing = function(follower, following, cb) {
  if (follower == following) {
    cb(true);
    return;
  }
  db.get("select count(*) as count from followers F, users U1, users U2 where U1.id=F.follower_id AND U2.id=F.following_id AND U1.username=? AND U2.username=?;", 
    [follower, following], function(err, rows) {
    if (rows.count > 0)
    {
      cb(true);
    }
    else
    {
      cb(false);
    }
  });
};
