//packages
var request = require("request");
var Spotify = require("node-spotify-api");
var fs = require("fs");

// (dot).env configuration
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = new Spotify(keys.spotify);

// arguments
var argOne = process.argv[2]
var argTwo = process.argv[3];

//main run function
var run = (argOne, argTwo) => {
  getArg(argOne, argTwo);
};

//switch statement for choosing which command to run and returning the arguments
//to the run function
var getArg = (switchData, functionData) => {
  switch (switchData) {

    //spotify
    case "spotify":
      getSong(functionData)
        break;

    //do-what-it-says
    case "do-it":
      fsRandom(functionData);
        break;

    //omdb
    case "movie":
      myMovie();
        break;

    //default case to return error
    default:
      console.log("LIRI could not recognize this command.");
        break;
  }
};

//getSong function connects to the spotify api and retrieves data for what the user inputs into LIRI
var getSong = (song) => {

    //checks the users input to determine if they defined a song to lookup
    //if it is undefined we set the variable to a default sont
      if (song === undefined){
      song =  "I Want it That Way";
      }

    //querys the API
      Spotify.search({
      type: `track`,
      query: song,
      limit: 1
      },  

      //checks if an error is thrown and logs it to the console
      (error, data) => {
        if (error) {
        return console.log(error);
        }

      //sets songReturned to the data callback in the spotify API
      var songReturned = data.tracks.items;
      
      //loops throgh the array and returns data called
      for (var i = 0; i < songReturned.length; i++) {
        console.log("song name: " +  songReturned[i].name);
        console.log("preview song: " + songReturned[i].preview_url);
    }
  });
};

//fsRandom function uses the fs module to read the random.txt file
// and command node to call the spotify api to reutrn song data
var fsRandom = (functionData) => {
      //running the fs.readFile method to load random.txt
      fs.readFile("random.txt", "utf8", function (error, data) {
          //checks for errors in the fs.readFile function returns the data thrown
          if (error) {
            return console.log(error);
          }
          //splits the data in the Random.txt file at the comma and pushes it into an array
          var array = data.split(",");
          //sets input to the first index of the array which is the title of the song "I Want it That Way"
          var input = array[1];
          console.log("DOING IT");
          //passes input to the getSong() function
          getSong(input);
    });
};

//init the app
run(argOne, argTwo);