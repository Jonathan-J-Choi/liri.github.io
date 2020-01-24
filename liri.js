require("dotenv").config();
let keys = require("./keys.js");
const axios = require("axios");

// var spotify = new Spotify(keys.spotify);
let query = process.argv[2]

axios
  .get("https://www.omdbapi.com/?t=" +query+ "&apikey=trilogy")
  .then(function(res) {
    console.log(res.data);
  });

  // liri.js <operator> <query>
