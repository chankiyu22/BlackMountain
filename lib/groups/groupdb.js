var user = require('../user');

// # Group Library

// ## Group Object
function Group(id, username) {
  this.id = id;
  this.username = username;
}

// ## Group Object
function GroupMember(group_id, username) {
  this.group_id = group_id;
  this.username = username;
}


// Temporary db holding group names
var groupdb = [
  new Group(0, 'Tweeters'),
  new Group(1, 'UmassCS'),
  new Group(2, 'Programmers'),
  new Group(3, 'Testers'),
  new Group(4, 'bill')
];

// This is our stub database until we look at a real database!
var groupmemberdb = [
  new GroupMember(0, 'test'),
  new GroupMember(0, 'argo15'),
  new GroupMember(0, 'sjobs'),
  new GroupMember(1, 'test'),
  new GroupMember(1, 'argo15'),
  new GroupMember(2, 'argo15'),
  new GroupMember(2, 'sjobs'),
  new GroupMember(3, 'test'),
  new GroupMember(3, 'sjobs')
];

//
// ## get all groups
// returns an array of all the Groups
//
exports.getAllGroups = function() {
  return groupdb;
};

//
// ## get group with member
// returns an array of Groups with the member 'username'
//
exports.getGroupWithMember = function(username) {
  var groups = [];
  for (var i=0; i<groupmemberdb.length; i++)
  {
  	if (groupmemberdb[i].username == username)
  	{
  		groups.push(groupdb[groupmemberdb[i].group_id]);
  	}
  }
  return groups;
};

//
// ## get group by name
// returns Groups with the name 'username'
//
exports.getGroupByName = function(username) {
  for (var i=0; i<groupdb.length; i++)
  {
    if (groupdb[i].username == username)
    {
     return groupdb[i];
    }
  }
  return undefined;
};

//
// ## is member
// returns true if username is member of group_id
//
exports.isMember = function(group_id, username) {
  for (var i=0; i<groupmemberdb.length; i++)
  {
    if (groupmemberdb[i].username == username && groupmemberdb[i].group_id == group_id )
    {
      return true;
    }
  }
  return false;
};

//
// ## get members for group
// returns an array of user objects who are members of group_id
//
exports.getMembersForGroup = function(group_id) {
  var users = []
  for (var i=0; i<groupmemberdb.length; i++)
  {
    if (groupmemberdb[i].group_id == group_id )
    {
      users.push(user.getUser(groupmemberdb[i].username));
    }
  }
  return users;
};

//
// ## add new member to groupmemberdb
//
exports.addNewMember = function(group_id, username) {
  groupmemberdb.push(new GroupMember(group_id, username));
};

//
// ## add new group
//
exports.addGroup = function(group_name) {
  groupdb.push(new Group(groupdb.length, group_name));
};