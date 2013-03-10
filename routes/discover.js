exports.discover = function(req, res){
  res.render('discover', {username: req.session.username});
};

exports.activity = function(req, res){
  res.render('activity', {username: req.session.username});
};