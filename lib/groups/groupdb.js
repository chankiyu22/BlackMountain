var user = require('../user');
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('./data/twitter.db');

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

// ## Get all groups
//
// @return - array of all the Groups in the database.
exports.getAllGroups = function(cb) {
  db.all("select G.id, G.username, U.fullname from groups G, users U where U.username=G.username;", [], cb);
};

// ## Get group with member
//
// @param username - member whose groups we're interested in<br />
// @return - array of Groups that member `username` belongs to
exports.getGroupWithMember = function(username, cb) {
  db.all("select G.id, G.username, U1.fullname from groups G, users U1, users U2, groupmembers GM where U1.username=G.username AND GM.group_id=G.id AND GM.user_id = U2.id AND U2.username=?;", 
    [username], cb);
};

// ## Get group by name
//
// @param username - Group to look up<br />
// @return - Group with the name `username`
exports.getGroupByName = function(username, cb) {
  db.get("select G.id, G.username, U.fullname from groups G, users U where U.username=G.username AND G.username=?;", 
    [username], cb);
};

// ## isMember
//
// @param group_id - ID number for group we're checking<br />
// @param username - Member we're checking<br />
// @return - true if `username` is member of `group_id`
exports.isMember = function(group_id, username, cb) {
  db.get("select count(*) as count from groups G, users U1, users U2, groupmembers GM where U1.username=G.username AND GM.group_id=G.id AND GM.user_id = U2.id AND G.id=? AND U2.username=?;", 
    [group_id, username], function(err, rows) {
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

// ## getMembersForGroup
//
// @param group_id - ID of group we're interested in<br />
// @return - an array of user objects who are members of `group_id`
exports.getMembersForGroup = function(group_id, cb) {
  db.all("select U2.username, U2.fullname from groups G, users U1, users U2, groupmembers GM where U1.username=G.username AND GM.group_id=G.id AND GM.user_id = U2.id AND G.id=?;", 
    [group_id], cb);
};

// ## Add new member to groupmemberdb
//
//@param group_id - Group to add to<br />
//@param username - User to add to group
exports.addNewMember = function(group_id, username) {
  db.get("select id from users where username=?;", 
    [username], function(err, id) {
      db.run("insert into groupmembers values (?, ?);",
        [group_id, id.id], function(err, rows) {});
  });
};

// ## Add new group
//
//@param group_name Name of new group
exports.addGroup = function(group_name) {
  db.run("insert into groups (username) values (?);", [group_name], function(err, rows) {});
};
