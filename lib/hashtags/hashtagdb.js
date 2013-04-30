// ## Hashtag Objects
//
//@param tag - Text of the hashtag<br />
//@param count - How many occurrences of the tag to add to the db<br />
//@param date - Hashtag timestamp, for future trend expansion
function Hashtag(tag, count, date) {
  this.tag = tag;
  this.count = count;
  this.date = date;
}

//## Stub database, based on tweet stub database
var hashtagdb = [
  new Hashtag('test',   2, new Date()),
  new Hashtag('tweet',  1, new Date()),
  new Hashtag('bill',   1, new Date())
];


// ## addHashtag
//
//Adds a hashtag to the DB if one doesn't exist, or updates the count of one that does, then sorts the database.
//
//@param text - The hashtag to add to the DB<br />
//@param message - Number of occurrences of the tag to add<br />
//
exports.addHashtag = function(text, count) {
  var found=false;
  for (var i=0; i<hashtagdb.length; i++){
    if (hashtagdb[i].tag==text){
      hashtagdb[i].count+=count;
      hashtagdb[i].date=new Date();
      found=true;
      i=hashtagdb.length;
    }
  }
  if (found==false){
    var new_hashtag=new Hashtag(text, count, new Date());
    hashtagdb.push(new_hashtag);
  }
  
  hashtagdb.sort(function(a,b){
    return(b.count - a.count);
  });
  console.log(hashtagdb);
};

// ## getTopHashtags
//
//Gets the top `count` hashtags.
//
//@param count - Number of tags to retrieve.
//@return tags - Array of hashtag objects.
exports.getTopHashtags = function(count){
  var tags = [];
  if (count > hashtagdb.length) { count = hashtagdb.length; }
  for (i=0; i<count; i++){
    if (hashtagdb[i]!=undefined) tags.push(hashtagdb[i]);
  }
  return tags;
}

// ## getTopHashtagsHTML
//
//Gets the top `count` hashtags; returns as HTML for easy embedding into Trends module.
//
//@param count - Number of tags to retrieve.
//@return tags - Array of hashtag objects.
exports.getTopHashtagsHTML = function(count){
  var html = '';
  if (count > hashtagdb.length) { count = hashtagdb.length; }
  for (i=0; i<count; i++){
     html+= "<div class='tag'><a class='hashtag' href='/search?searchfor=%23" + hashtagdb[i].tag + "'>#" + hashtagdb[i].tag+"</a></div>";
  }
  return html;
}


