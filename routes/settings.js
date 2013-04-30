var user = require('../lib/user');

// ## GET /settings/profile page<br>
// Render the "Profile" section of "Settings"
exports.profile = function(req, res){
	user.getUser(req.session.username, function(err, userdata) {
		res.render('settings_profile', {user: userdata});
	});
};

// ## GET /settings/account page<br>
// Render the "Acount" section of "Settings"
exports.account = function(req, res){
  	user.getUser(req.session.username, function(err, userdata) {
		res.render('settings_account', {user: userdata});
	});
};

// ## GET /settings/password page<br>
// Render the "Password" section of "Settings"
exports.password = function(req, res){
  	user.getUser(req.session.username, function(err, userdata) {
		res.render('settings_password', {user: userdata});
	});
};
