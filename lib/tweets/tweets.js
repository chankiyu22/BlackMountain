function Tweets() {}
Tweets.prototype = {
  len: 0,
  first: null,
  last: null
};

Tweets.tweet = function(text, date){
  this.prev=null;
  this.next=null;
  this.text=text;
  this.date = new Date(date);
}

Tweets.prototype.addTweet = function(tweet){
  if (this.first == null) {
    this.first=tweet;
  } else {
    this.first.prev=tweet;
    tweet.next=this.first;
    this.first=tweet;
  }
  this.len++;
}

Tweets.prototype.removeTweet = function(tweet){
  if (this.len > 1) {
    tweet.prev.next = tweet.next;
    tweet.next.prev = tweet.prev;
  } else {
    this.first=null;
    this.last=null;
  }
  tweet.next=null;
  tweet.prev=null;
  this.len--;
}



tweet1 = [{Text: "Sample Tweet 1, should be on bottom!",
           timestamp: new Date(2013, 03, 09, 15, 30, 22, 00);};
tweet2 = [{Text: "Sample Tweet 2, should be on top!",
           timestamp: new Date(2013, 03, 09, 15, 30, 33, 00);};

exports.addTweet = Tweets.addTweet;


