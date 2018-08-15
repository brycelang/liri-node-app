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
    //do-what-it-says
    case "do-it":
      fsRandom(functionData);
        break;

    //spotify
    case "spotifiy-this-song":
      mySpotify(functionData)
        break;

    //omdb
    case "movie-this":
      myMovie();
        break;
  }
};

//fsRandom function uses the fs module to read the random.txt file
// and command node to call the spotify api to reutrn song data
var fsRandom = (functionData) => {
      //running the fs.readFile method to load random.txt
      fs.readFile("random.txt", "utf8", function (error, data) {
          if (error) {
            return console.log(error);
          }
    });
};

//init the app
run(argOne, argTwo);