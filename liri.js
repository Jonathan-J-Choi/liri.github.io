require("dotenv").config();
const keys = require("./keys");
const fs = require("fs");
// const Spotify = require("node-spotify-api");
// const spotify = new Spotify(keys.spotify);
const moment = require("moment");
const axios = require("axios");


let query = process.argv[2]
let userQuery = process.argv.slice(3).join(" ");
console.log(userQuery)

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
  if (!userQuery) {
    userQuery = "Parasite";
  }

  axios.get("https://www.omdbapi.com/?t=" +userQuery+ "&apikey=trilogy").then(res => {
    let movie = res.data;
    let movieResults =
    "\n---------------------------------\n\n" + "Movie Title: " +movie.Title+ "\nRelease Year: " +movie.Year + "\nIMDB Rating: " + movie.imdbRating + "\nRotten Tomatoes Rating: " +movie.Ratings[1].Value + "\nProduced In: " +movie.Country + "\nLanguage: " +movie.Language+ "\nPlot: " +movie.Plot + "\nStarring: " +movie.Actors+ "\n\n---------------------------------\n";

    console.log(movieResults);
  })
}

//  Bands in town
function concertThis(userQuery) {
  axios.get("https://rest.bandsintown.com/artists/" +userQuery+ "/events?app_id=codingbootcamp").then(res => {
    for (i = 0; i <res.data.length; i++) {
      let show = res.data[i];
      let day = show.datetime.split("T");

      let concertResults = "\n---------------------------------\n\n" + "Venue: " + show.venue.name + "\nLocation: " + show.venue.city + "\nDate: " + moment(day[0]).format("MM/DD/YYYY") + "\n\n---------------------------------\n";
      console.log(concertResults);
    }
  })
}

  // liri.js <operator> <query>

  