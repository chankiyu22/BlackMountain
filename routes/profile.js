exports.profile = function(req, res){
  var username = req.param('username');
  res.render('profile', {username: username});
};

exports.following = function(req, res){
  var username = req.param('username');
  res.render('following', {username: username});
};

exports.followers = function(req, res){
  var username = req.param('username');
  res.render('followers', {username: username});
};

exports.favorites = function(req, res){
  var username = req.param('username');
  res.render('favorites', {username: username});
};