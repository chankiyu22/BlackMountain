
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', {first: 'Twitter',
                       last: 'Language: English'});
  console.log("Basic Index Page");
};
