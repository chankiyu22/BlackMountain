// # Follower Library

// ## Follower Objects 
function Follower(follower, following) {
  this.follower = follower;
  this.following = following;
}

// This is our stub database until we look at a real database!
var followerdb = [
  new Follower('test', 'argo15'),
  new Follower('sjobs', 'test'),
  new Follower('argo15', 'sjobs')
];

//
// ## Adds a new follower relation
//
// @param follower - User doing the following<br />
// @param following - User being followed<br />
// @return error/success message 
exports.addFollower = function(follower, following) {
  if (follower == following)
  {
    return 'cannot follow self';
  }
  for (var i=0; i<followerdb.length; i++)
  {
    if (followerdb[i].follower == follower && followerdb[i].following == following)
    {
      return 'already following';
    }
  }
  followerdb.push(new Follower(follower, following));
  return 'success';
};

//
// ## Gets all users followed by 'user'
//
//@param user - Target user<br />
//@return users - Array of users that `user` is following
exports.getFollowedUsers = function(user) {
  var users = [];
  for (var i = 0; i < followerdb.length; i++)
  {
    if (user == followerdb[i].follower)
    {
      users.push(followerdb[i].following);
    }
  }
  return users;
};

//
// ## Gets all users following 'user'
//
//@param user - target user<br />
//@return users - array of users following `user`
exports.getUsersFollowing = function(user) {
  var users = [];
  for (var i = 0; i < followerdb.length; i++)
  {
    if (user == followerdb[i].following)
    {
      users.push(followerdb[i].follower);
    }
  }
  return users;
};
