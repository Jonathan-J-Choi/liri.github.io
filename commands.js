function concert_this (){
  return parseInt(process.argv[2]) + parseInt(process.argv[4]);
}

function spotify_this_song (){
  return parseInt(process.argv[2]) - parseInt(process.argv[4]);
}

function movie_this (){
  return parseInt(process.argv[2]) * parseInt(process.argv[4]);

}

module.exports = {
  concert_this: concert_this,
  spotify_this_song: spotify_this_song,
  movie_this: movie_this,
};