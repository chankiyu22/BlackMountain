// ## Hashtag Objects
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('./data/twitter.db');

// ## addHashtag
//
//Adds a hashtag to the DB if one doesn't exist, or updates the count of one that does, then sorts the database.
//
//@param text - The hashtag to add to the DB<br />
//
exports.addHashtag = function(text) {
  db.get("select count(*) as count from hashtags where tag=?;", 
    [text], function(err, rows) {
      if (rows.count > 0)
      {
        db.run("update hashtags set count=count+1 where tag=?;",
          [text], function(err, rows){console.log(err)});
      }
      else
      {
        db.run("insert into hashtags values (?, 1);",
          [text], function(err, rows){});
      }
    });
};

// ## getTopHashtags
//
//Gets the top `count` hashtags.
//
//@param count - Number of tags to retrieve.
//Invokes callback `cb` with the signature cb(error, hashtagobj) 
exports.getTopHashtags = function(count, cb){
  db.all("select * from hashtags order by count desc limit ?;", 
    [count], cb);
}

// ## getTopHashtagsHTML
//
//Gets the top `count` hashtags; returns as HTML for easy embedding into Trends module.
//
//@param count - Number of tags to retrieve.
//Invokes callback `cb` with the signature cb(error, hashtagobj) 
exports.getTopHashtagsHTML = function(count, cb){
  exports.getTopHashtags(count, function(err, hashtags) {
    var html = '';
    for (i=0; i<hashtags.length; i++){
       html+= "<div class='tag'><a class='hashtag' href='/search?searchfor=%23" + hashtags[i].tag + "'>#" + hashtags[i].tag+"</a></div>";
    }
    cb(html);
  });
  
}


