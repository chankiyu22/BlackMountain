var hashtags = require('../lib/hashtags');

// ## GET /trends<br>
// Get top hashtags from database hashtags database
exports.get_trends = function(req, res){
  var tags = hashtags.getTopHashtagsHTML(10);
  res.send(tags);
};
