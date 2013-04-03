var user = require('../user');

// # Group Library

// ## Group Object
//
//@param id - Unique Group ID<br />
//@param username - Group Name
function Group(id, username) {
  this.id = id;
  this.username = username;
}

// ## Group Object
//@param id - Unique Group ID<br />
//@param username - User name
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

// ## Get all groups
//
// @return - array of all the Groups in the database.
exports.getAllGroups = function() {
  return groupdb;
};

// ## Get group with member
//
// @param username - member whose groups we're interested in<br />
// @return - array of Groups that member `username` belongs to
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

// ## Get group by name
//
// @param username - Group to look up<br />
// @return - Group with the name `username`
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

// ## isMember
//
// @param group_id - ID number for group we're checking<br />
// @param username - Member we're checking<br />
// @return - true if `username` is member of `group_id`
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

// ## getMembersForGroup
//
// @param group_id - ID of group we're interested in<br />
// @return - an array of user objects who are members of `group_id`
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

// ## Add new member to groupmemberdb
//
//@param group_id - Group to add to<br />
//@param username - User to add to group
exports.addNewMember = function(group_id, username) {
  groupmemberdb.push(new GroupMember(group_id, username));
};

// ## Add new group
//
//@param group_name Name of new group
exports.addGroup = function(group_name) {
  groupdb.push(new Group(groupdb.length, group_name));
};
