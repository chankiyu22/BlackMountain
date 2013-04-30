
var user = require('../lib/user');
var util = require('../lib/util');
var tweets = require('../lib/tweets');
var group = require('../lib/groups');

/*
 * ## Function groups(req, res)
 * Routing /groups
 * 
 * #### Render
 * 1. Groups which current user belongs to
 * 2. Tweets of group members
 */
exports.groups = function(req, res){
	var myGroups = group.getGroupWithMember(req.session.username);
	tweets.getTweetsOfGroups(req.session.username, function(err, groupTweets) {
		util.initTweets(groupTweets);
		user.getUser(req.session.username, function(err, userdata) {
			res.render('groups', {user: userdata,
  						tweets: groupTweets,
  						timeline_header: 'Group Mentions',
  						wtf: util.getWhoToFollow(req.session.username)});
		});
	});
};

/*
 * ## Function create(req, res)
 * Routing /groups/create
 * 
 * #### Render
 */
exports.create = function(req, res){
	user.getUser(req.session.username, function(err, userdata) {
  		res.render('groups_create', {user: userdata,
  						tweets: [],
  						wtf: util.getWhoToFollow(req.session.username)});
  	});
};

/*
 * ## Function discover(req, res)
 * Routing /groups/discover
 * 
 * #### Render
 * 1. All groups
 */
exports.discover = function(req, res){
	user.getUser(req.session.username, function(err, userdata) {
		var theGroups = util.getInitializedGroups(req.session.username);
	  	res.render('groups_discover', {user: userdata,
	  						groups: theGroups,
	  						wtf: util.getWhoToFollow(req.session.username)});
  });
};

/*
 * ## Function join(req, res)
 * Routing /groups/join [POST]
 * 
 * #### Action
 * 1. Add user to dest group
 */
exports.join = function(req, res){
	group.addNewMember(req.body.group_id, req.body.username);
	res.send("success");
};

/*
 * ## Function register(req, res)
 * Routing /groups/register [POST]
 * 
 * #### Action
 * 1. Create a new group
 */
exports.register = function(req, res){
	user.registerGroup(req.body.fullname, req.body.username, function(error, userobj) {
		if (userobj)
		{
			group.addGroup(req.body.username);
			res.send("success");
		}
		else
		{
			res.send("Username unavailable");
		}
	});
};