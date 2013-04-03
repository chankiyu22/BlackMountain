var user = require('../lib/user');
var util = require('../lib/util');
var tweets = require('../lib/tweets');
var group = require('../lib/groups');

/*
 * GET /groups page.
 * 
 * Displays all tweets that mention any group that the user is a member of.
 */
exports.groups = function(req, res){
	var myGroups = group.getGroupWithMember(req.session.username);
	var groupTweets = [];
	for (var i=0; i<myGroups.length; i++)
	{
		groupTweets = groupTweets.concat(tweets.getTweetsThatMention(myGroups[i].username));
	}
	util.initTweets(groupTweets);
  	res.render('groups', {user: user.getUser(req.session.username),
  						tweets: groupTweets,
  						timeline_header: 'Group Mentions'});
};

/*
 * GET /groups/create page.
 * 
 * Displays a form to register a new group
 */
exports.create = function(req, res){
  	res.render('groups', {user: user.getUser(req.session.username),
  						tweets: []});
};

/*
 * GET /groups/discover page.
 * 
 * Displays all tweets that mention any group that the user is a member of.
 */
exports.discover = function(req, res){
	var theGroups = util.getInitializedGroups(req.session.username);
  	res.render('groups_discover', {user: user.getUser(req.session.username),
  						groups: theGroups});
};

/*
 * Post /groups/join page.
 * 
 * Displays all tweets that mention any group that the user is a member of.
 */
exports.join = function(req, res){
	group.addNewMember(req.body.group_id, req.body.username);
	res.send("success");
};