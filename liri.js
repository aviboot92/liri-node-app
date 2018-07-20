require("dotenv").config();


var keys = require('./keys');
var Twitter = require('twitter');
var client = new Twitter(keys.twitter);
var action = process.argv[2];
var postMessage = process.argv[3];

// Twitter Node Programme
if (action === "my-tweets") {
  client.get('search/tweets', { q: 'TommyTiger8' }, function (error, tweets, response) {
    console.log(tweets);
    var count = 20;
    if (tweets.statuses.length <= count) {
      for (var i = 0; i < tweets.statuses.length; i++) {
        console.log("\nCreated on: " + tweets.statuses[i].created_at + "  " + " Tweet Info:" + tweets.statuses[i].text);
      }
    } else {
      for (var i = 0; i < count; i++) {
        console.log("\nCreated on: " + tweets.statuses[i].created_at + "  " + " Tweet Info:" + tweets.statuses[i].text);
      }
    }
  });
} else if (action === "twitter-post") {
  client.post('statuses/update', { status: postMessage }, function (error, tweet, response) {
    if (!error) {
      console.log(tweet.text);
    }
  });
}

var spotify = new Spotify(keys.spotify);


