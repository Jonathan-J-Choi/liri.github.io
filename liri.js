require("dotenv").config();
const keys = require("./keys");
const fs = require("fs");
const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);
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
    // console.log(res)
    let movie = res.data;
    let movieResults =
    "\n---------------------------------\n\n" + "Movie Title: " +movie.Title+ "\nRelease Year: " +movie.Year + "\nIMDB Rating: " + movie.imdbRating + "\nRotten Tomatoes Rating: " +movie.Ratings[1].Value + "\nProduced In: " +movie.Country + "\nLanguage: " +movie.Language+ "\nPlot: " +movie.Plot + "\nStarring: " +movie.Actors+ "\n\n---------------------------------\n";

    console.log(movieResults);

  }).catch(err => {
    console.log(err)
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

  }).catch(err => {
    console.log(err)
  })
}

// Spotify
function spotifyThis(userQuery) {
  if(!userQuery) {
    userQuery = "Sanctuary Joji";
  }
  spotify.search({
    type: "track",
    query: userQuery
  },(err, res) => {
    if(err) throw err;
    console.log(res)

    let song = res.tracks.items[0];

    let spotifyResults = "\n---------------------------------\n\n" + "Artist: " +song.artists[0].name + "\nSong  Title: " + song.name + "\nPreview: " + song.preview_url + "\nAlbum: " + song.album.name + "\n\n---------------------------------\n";

    console.log(spotifyResults);
  })
}

// Do as I say not as I do
function doThis() {
  fs.readFile("random.txt", "utf8", (function (err, data){
    if (err) throw err;

    let split = data.split(",");

    spotifyThis(split[1])
  }))
}