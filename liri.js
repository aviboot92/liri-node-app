require("dotenv").config();
var keys = require('./keys');
var request = require("request");
var Twitter = require('twitter');
var client = new Twitter(keys.twitter);
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var action = process.argv[2];
var nodeArgs = process.argv;
var value = "";
var omdbApi = keys.omdb.OMDb_API;
// Evaluating Value of "value" variable
if (action == "movie-this") {
  for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
      value = value + "+" + nodeArgs[i];
    }
    else {
      value += nodeArgs[i];
    }
  }
} else {
  for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
      value = value + " " + nodeArgs[i];
    }
    else {
      value += nodeArgs[i];
    }
  };
};
switch (action) {
  case "my-tweets":
    myTweetAPI();
    break;

  case "twitter-post":
    postTweetAPI(value);
    break;

  case "spotify-this-song":
    spotifyAPI(value);
    break;

  case "movie-this":
    omdbAPI(value, omdbApi);
    break;

  case "do-what-it-says":
    lotto();
    break;
}
// Twitter Node Programme
function myTweetAPI() {
  client.get('search/tweets', { q: 'TommyTiger8' }, function (error, tweets, response) {
    var count = 20;
    if (tweets.statuses.length <= count) {
      for (var i = 0; i < tweets.statuses.length; i++) {
        console.log("\nCreated on: " + tweets.statuses[i].created_at + "  " + " Tweet Info: " + tweets.statuses[i].text);
      }
    } else {
      for (var i = 0; i < count; i++) {
        console.log("\nCreated on: " + tweets.statuses[i].created_at + "  " + " Tweet Info: " + tweets.statuses[i].text);
      }
    }
  });
};
// Posting in Twitter
function postTweetAPI(value) {
  client.post('statuses/update', { status: value }, function (error, tweet, response) {
    if (!error) {
      console.log(tweet.text);
    }
  });
};
// Spotify NODE Programme
function spotifyAPI(value) {
  spotify.search({ type: 'track', query: value }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    console.log("\n Name of the Artist: " + data.tracks.items[0].album.artists[0].name);
    console.log("\n A preview link of song from Spotify: " + data.tracks.items[0].external_urls.spotify);
    console.log("\n Name of the Song: " + data.tracks.items[0].name);
    console.log("\n Name of the Album: " + data.tracks.items[0].album.name);
  });
};
// OMDB API IMDB Node Algorithm
function omdbAPI(value, omdbApi) {
  var queryUrl = "http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=" + omdbApi;
  request(queryUrl, function (error, response) {
    if (!error && response.statusCode === 200) {
      // console.log(response.body);
      var resp = JSON.parse(response.body);
      //  console.log(resp);
      console.log("Title of the movie: " + resp.Title);
      console.log("\nYear the movie came out: " + resp.Year);
      console.log("\nIMDB Rating of the movie: " + resp.imdbRating);
      // console.log("\nRotten Tomatoes Rating of the movie: "+resp.Ratings[1].Value);
      console.log("\nCountry where the movie was produced: " + resp.Country);
      console.log("\nLanguage of the movie: " + resp.Language);
      console.log("\nPlot of the movie: " + resp.Plot);
      console.log("\nActors in the movie: " + resp.Actors);
    }
  });
};






