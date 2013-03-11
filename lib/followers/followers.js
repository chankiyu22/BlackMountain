// # Follower Library

// ## Follower Objects 
function Follower(follower, following) {
  this.follower = follower;
  this.following = following;
}

// This is our stub database until we look at a real database!
var followerdb = [
  new Follower('test', 'argo15')
];

//
// ## adds a new follower relation
//
exports.addFollower = function(follower, following) {
  if (follower == following)
  {
    return;
  }
  for (var i=0; i<followerdb.length; i++)
  {
    if (followerdb[i].follower == follower && followerdb[i].following == following)
    {
      return;
    }
  }
  followerdb.push(new Follower(follower, following));
};

//
// ## gets all users followed by 'user'
//
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
// ## gets all users following 'user'
//
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