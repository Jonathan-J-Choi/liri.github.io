// Required
require("dotenv").config();
const keys = require("./keys");
const fs = require("fs");
const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);
const moment = require("moment");
const axios = require("axios");

// User's query recorded to make function smoother
let query = process.argv[2]
let userQuery = process.argv.slice(3).join(" ");
console.log(userQuery)

// User Commands
let choice ={
  "concert-this": _ => {
    !userQuery ? console.log("Who do you want to see perform?") : concertThis(userQuery);
  },
  "spotify-this-song": _ => {
    !userQuery ? spotifyThis("Sanctuary Joji") : spotifyThis(userQuery);
  },
  "movie-this":_ => {
    !userQuery ? movieThis("Parasite") : movieThis(userQuery);
  },
  "do-what-it-says": _ =>{
    doThis();
  }
}

choice[query]();

// OMDB
function movieThis(userQuery) {
  // The default movie when the user does not choose one
  if (!userQuery) {
    userQuery = "Parasite";
  }

  // Axios call
  axios.get("https://www.omdbapi.com/?t=" +userQuery+ "&apikey=trilogy").then(res => {
    // console.log(res)

    let movie = res.data;
    // Showing the results in a clean display
    let movieResults =
    "\n---------------------------------\n\n" + "Movie Title: " +movie.Title+ "\nRelease Year: " +movie.Year + "\nIMDB Rating: " + movie.imdbRating + "\nRotten Tomatoes Rating: " +movie.Ratings[1].Value + "\nProduced In: " +movie.Country + "\nLanguage: " +movie.Language+ "\nPlot: " +movie.Plot + "\nStarring: " +movie.Actors+ "\n\n---------------------------------\n";

    console.log(movieResults);

    // In case of errors
  }).catch(err => {
    console.log(err)
  })
}

//  Bands In Town
function concertThis(userQuery) {
  // Axios call
  axios.get("https://rest.bandsintown.com/artists/" +userQuery+ "/events?app_id=codingbootcamp").then(res => {
    // Loop through all of the concerts and display information
    for (i = 0; i <res.data.length; i++) {
      let show = res.data[i];
      // Removes the time part of date
      let day = show.datetime.split("T");

      // Showing the results in a clean display
      let concertResults =
      "\n---------------------------------\n\n" + "Venue: " + show.venue.name + "\nLocation: " + show.venue.city + "\nDate: " + moment(day[0]).format("MM/DD/YYYY") + "\n\n---------------------------------\n";
      console.log(concertResults);
    }

    // In case of error
  }).catch(err => {
    console.log(err)
  })
}

// Spotify
function spotifyThis(userQuery) {
  // The default movie when the user does not choose one
  if(!userQuery) {
    userQuery = "Sanctuary Joji";
  }
  // node-spotify-api call
  spotify.search({
    type: "track",
    query: userQuery
  },(err, res) => {
    // In case of error
    if(err) throw err;
    // console.log(res)

    let song = res.tracks.items[0];

    let spotifyResults = 
    // Showing the results in a clean display
    "\n---------------------------------\n\n" + "Artist: " +song.artists[0].name + "\nSong Title: " + song.name + "\nPreview: " + song.preview_url + "\nAlbum: " + song.album.name + "\n\n---------------------------------\n";

    console.log(spotifyResults);
  })
}

// Do what it says
function doThis() {
  fs.readFile("random.txt", "utf8", (function (err, data){
    // In case of error
    if (err) throw err;

    let split = data.split(",");

    spotifyThis(split[1])
  }))
}