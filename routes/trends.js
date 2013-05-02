var hashtags = require('../lib/hashtags');

// ## GET /trends<br>
// Get top hashtags from database hashtags database
exports.get_trends = function(req, res){
  hashtags.getTopHashtagsHTML(10, function(tags) {
  	res.send(tags);
  });
};
