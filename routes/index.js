
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', {username: req.session.username,
  					   first: 'Twitter',
  					   login: req.session.login,
  					   error: req.session.login_error,
                       last: 'Language: English'});
  console.log("Basic Index Page");
};

