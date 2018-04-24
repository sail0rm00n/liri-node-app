var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs");
var request = require('request')
var twitterKeys = keys.twitter;
var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);
var action = process.argv[2];
var query = process.argv[3];
var liri = function(){
    if(action){
    if (action == "my-tweets"){
        client.get("statuses/user_timeline", function(error, tweets, response){
            if(error) throw error;
            for(var i=0; i<tweets.length;i++){
        console.log(i + ")" + "On - "+ tweets[i].created_at + " - " + tweets[i].text)
    }});
    }else if (action == "spotify-this-song"){
        if(query){
        spotify.search({ type: 'track', query: query }, function(err, data) {
            if (err) {
            return console.log('Error occurred: ' + err);
            }
            var results = data.tracks.items[0];
            console.log("Title: " + results.name)
            console.log("Artists: " + results.artists[0].name);
            console.log("Album: " + results.album.name);
            console.log("Listen Here: " + results.preview_url);
            })
        }else{spotify
            .request("https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE")
            .then(function(data){
                console.log("Title: " + data.name)
                console.log("Artists: " + data.artists[0].name);
                console.log("Album: " + data.album.name);
                console.log("Listen Here: " + data.preview_url);
            })
            .catch(function(err){
                console.log("Error: " + err);
            })}
    }else if (action == "movie-this"){
        if(query){
        var queryURL= "https://www.omdbapi.com/?t=" + query + "&y=&plot=short&apikey=trilogy"
        request(queryURL, function(error, response, body){
            if (!error && response.statusCode === 200){
                var results = JSON.parse(body)
                console.log("Title: " + results.Title)
                console.log("Year: " + results.Year)
                console.log("Rated " + results.imdbRating+ " on IMDB")
                console.log("Produced in: " + results.Country)
                console.log("Language: " + results.Language)
                console.log("Plot: " + results.Plot)
                console.log("Cast: " + results.Actors)
            }
        })}else{
        var queryURL= "https://www.omdbapi.com/?t=Mr Nobody&y=&plot=short&apikey=trilogy"
        request(queryURL, function(error, response, body){
            if (!error && response.statusCode === 200){
                var results = JSON.parse(body)
                console.log("Title: " + results.Title)
                console.log("Year: " + results.Year)
                console.log("Rated " + results.imdbRating+ " on IMDB")
                console.log("Produced in: " + results.Country)
                console.log("Language: " + results.Language)
                console.log("Plot: " + results.Plot)
                console.log("Cast: " + results.Actors)
            }
        })}
    }
}else {
    console.log("Commands");
    console.log("========");
    console.log("Look up a song with - spotify-this-song '<your search term>'")
    console.log("Find information on a movie with - movie-this '<your search term>")
    console.log("List your moost recent tweets with - my-tweets")    
    console.log("If you're feeling extra spicy, run a command from the text file with - simon-says")
}}
if(action == "simon-says"){
    fs.readFile("random.txt", "utf8", function(error,data){
        if (error) {
            return console.log(error);
          }
          var dataArr = data.split(",");
          action = dataArr[0]
          query = dataArr[1]
          console.log("====");
          console.log("Simon Says: " + action + " " + query);
        liri();
    })
}else {liri()}