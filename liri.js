require("dotenv").config();
let keys = require("./keys.js");
const axios = require("axios");

// var spotify = new Spotify(keys.spotify);
let query = process.argv[2]

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

  