exports.profile = function(req, res){
  res.render('settings_profile', {username: req.body.username});
};

exports.account = function(req, res){
  res.render('settings_account', {username: req.body.username});
};

exports.password = function(req, res){
  res.render('settings_password', {username: req.body.username});
};