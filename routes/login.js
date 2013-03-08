var users = [
  {username: "Ken"}
];

exports.index = function(req, res){
  var name = req.body.username;
  if(name != users[0].username){
    res.redirect('login/captcha');
  }
  res.render('login');
};

exports.captcha = function(req, res){
  res.render('login');
};
