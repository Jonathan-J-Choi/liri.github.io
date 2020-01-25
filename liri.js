require("dotenv").config();
const keys = require("./keys");
const fs = require("fs");
const spotify = new Spotify(keys.spotify);
const Spotify = require("node-spotify-api");
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
    !userInput ? spotifyThis("Sanctuary Joji") : spotifyThis(userQuery);
  },
  "movie-this":_ => {
    !userInput ? movieThis("Parasite") : movieThis(userQuery);
  },
  "do-what-it-says": _ =>{
    doThis();
  }
}

choice[method]();
// OMDB
// axios
//   .get("https://www.omdbapi.com/?t=" +query+ "&apikey=trilogy")
//   .then(function(res) {
//     console.log(res.data.Title);
//     console.log(res.data.Year);
//     console.log(res.data.Ratings[1]);
//     console.log(res.data.Country);
//     console.log(res.data.Language);
//     console.log(res.data.Plot);
//     console.log(res.data.Actors);
//   });

//  Bands in town
axios
  .get("https://rest.bandsintown.com/artists/" + query + "/events?app_id=codingbootcamp")
  .then(function(res) {
    console.log(res.data);
  });

  // liri.js <operator> <query>

  