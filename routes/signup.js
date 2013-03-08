exports.index = function(req, res){
  res.render('signup', {first: 'Twitter',
                        last: 'Have an account? Sign in'});
};
