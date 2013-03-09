
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('signup', {first: 'Twitter',
                       last: 'Language: English'});
  console.log("Basic Index Page");
};
