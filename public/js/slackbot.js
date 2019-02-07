// Dependencies
// =============================================================
var Slackbot = require("slackbots");
var axios = require("axios");
var bodyParser = require("body-parser");
var path = require("path");
var fs = require("fs");
var request = require("request");
var keys = require("../../config/keys");

module.exports = function() {
  // message variables
  var res = [];
  var Channum = "";
  var User = "";

  // Create bot with name and token
  var bot = new Slackbot({
    token: keys.slack.slackBotToken,
    name: "HmWrkbot"
  });

  var varToken = keys.slack.slackBotToken;

  // Test message for connection
  // bot.postMessageToChannel(
  //     'test',
  //     'Hello'
  // );

  bot.on("error", err => console.log(err));

  // Incomming message to bot
  bot.on("message", data => {
    if (data.type !== "message") {
      return;
    }
    Channum = data.channel;
    User = data.user;
    handleMessage(data.text);
    console.log(data);
  });

  //for debugging
  
  

  // bot.getChannelById(Channum);

  // Response to Data
  function handleMessage(message) {
    if (message.includes(" homework")) {
      thisweekhw();
      console.log(handleMessage);

      // Joke api
    } else if (message.includes(" joke")) {
      nerdJoke();
    } else if (message.includes(" swanson")) {
      Swansonqu();
    }

    // Function to post the homework
    function thisweekhw() {
      var res = message.split(" ");
      console.log(res);
      console.log(res[2]);

      request.post(
        {
          url: "https://slack.com/api/files.upload",
          formData: {
            file: fs.createReadStream("./Homework/week_" + res[2] + ".zip"),
            token: keys.slack.slackBotToken,
            filetype: "zip",
            filename: "Homework week" + res[2] + ".zip",
            channels: Channum,
            title: "Homework week" + res[2] + ".zip"
          }
        },
        function(error, response, body) {
          console.log(body);
        }
      );
    }

    // Function for the api
    function nerdJoke() {
      axios
        .get("http://api.icndb.com/jokes/random?limitTo=[nerdy]")
        .then(res => {
          const nerd = res.data.value.joke;
          console.log(res);
          //bot.postMessageToUser('bryant.gossett', );
          bot.postMessage(Channum, `Joke: ${nerd}`)
        });
    }

    function Swansonqu() {
      axios
        .get("https://ron-swanson-quotes.herokuapp.com/v2/quotes")
        .then(res => {
          const quote = res.data;
          bot.postMessageToChannel(Channum, `${quote} -Ron Swanson`);
        });
    }
  }
};
