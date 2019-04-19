require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var Spotify = require('node-spotify-api');

var movieName = process.argv.slice(3).join('+')
var artist = process.argv.slice(3).join('')

var spotify = new Spotify(keys.spotify);
 



// Then run a request with axios to the OMDB API with the movie specified


if (process.argv[2] === "movie-this") {
    axios.get("http://www.omdbapi.com/?t=" + movieName +"&y=&plot=short&apikey=d49b623f").then(
        function(response) {
            console.log("Title: " + response.data.Title);
            console.log("Release Date: " + response.data.Released);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("Country: " + response.data.imdbRating);
            console.log("Language: " + response.data.Country);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
            //node liri.js movie-this casablanca
  }
);
} if (process.argv[2] === "concert-this") {
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
        function(response) {
            var bandsInfo = response.data[1];
            var time =  bandsInfo.datetime;
            var convertedTime = moment(time).format("L");
            console.log(`Venue: ${bandsInfo.venue.name}`);
            console.log(`Location: ${bandsInfo.venue.city}`);
            console.log(`Location: ${convertedTime}`);
            //node liri.js concert-this post malone
            
  }
);
} if (process.argv[2] === "spotify-this-song") {
    var songQuery = process.argv.slice(3).join('+');
    spotify.search({ type: 'track', query: songQuery })
    .then(function (response) {
            console.log(`Artist: ${response.tracks.items[0].album.artists[0].name}`);
            console.log(`Song Title: ${response.tracks.items[0].name}`);
            console.log(`Album: ${response.tracks.items[0].album.name}`);
            console.log(`Preview: ${response.tracks.items[0].preview_url}`); 
            //node liri.js spotify-this-song all the small things
    });
}
