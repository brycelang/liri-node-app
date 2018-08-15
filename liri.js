//packages
var request = require("request");
var Spotify = require("node-spotify-api");
var fs = require("fs");

// (dot).env configuration
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = new Spotify(keys.spotify);

// arguments
var arg1 = process.argv[2]
var arg2 = process.argv[3];

//main run function
var run = (arg1, arg2) => {
  getArg(arg1, arg2);
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
      myMovie(functionData);
        break;

    //default case to return error
    default:
      console.log("LIRI could not recognize this command.");
        break;
  }
};

//loops through the artist array untill it finds artist
var getArtist = (data) => {
  return data.name;
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
        //uses the map() function to return an array and loop through it untill you find the artist name
        console.log(songReturned[i].artists.map(getArtist));
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

//function for querying omdb to return movie information
var myMovie = (functionData) => {

  //defines the queryUrl for obtaining movie data
  var queryUrl = "http://www.omdbapi.com/?t=" + functionData + "&apikey=6704a841";

  //obtains information from the API by passing queryURL to the request() function
  request(queryUrl, (error, response, body) => {
    //checks if the arg2 has received any input from the user
    if (functionData === undefined) {
      //if not sets the input to default of "Mr. Nobody" and logs the body for that movie.
      request("http://www.omdbapi.com/?t=mr+nobody&apikey=9379fb14", (error, response, body) => {
        if (!error && response.statusCode === 200) {
        console.log(JSON.parse(body), null, 2);
        }
      }); 
    }


    //checks if the response code = 200(good response) and pushes
    if (response.statusCode === 200) {
        console.log("Title: " + JSON.parse(body).Title);
        console.log("Year Released: " + JSON.parse(body).Year);
        console.log("Rating: " + JSON.parse(body).imdbRating);
        console.log("Country Produced: " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Plot Summary: " + JSON.parse(body).Plot);
        console.log("Actors Involed: " + JSON.parse(body).Actors);
      }
  });
};

//init the app
run(arg1, arg2);