exports.connect = function(req, res){
  res.render('connect', {username: req.session.username});
};

exports.mentions = function(req, res){
  res.render('mentions', {username: req.session.username});
};