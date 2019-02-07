// Dependencies
// =============================================================
var Slackbot = require('slackbots');
var axios = require ("axios");
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var fs = require('fs');
var request = require('request');


// Sets up the Express App
// =============================================================
var app = express();
var PORT = 8085;

// message variables 
var res = [];
var Channum = "";
var User = "";

// Create bot with name and token
var bot = new Slackbot({
    token: 'xoxb-533280073296-538087922165-9IQZYaEOPzobfcYiCXE9xwRF',
    name: 'HmWrkbot'
})

var varToken = ("xoxb-533280073296-538087922165-9IQZYaEOPzobfcYiCXE9xwRF")

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Test message for connection
// bot.postMessageToChannel(
//     'test',
//     'Hello'
// );

bot.on('error', (err) => console.log(err));

// Incomming message to bot
bot.on('message', data => {
    if (data.type !== 'message') {
      return;
    }
    Channum = (data.channel);
    User = (data.user);
    handleMessage(data.text);
    console.log(data);
  });

  // bot.getChannelById(Channum);  
  
  // Response to Data
  function handleMessage(message) {
    if (message.includes(' homework')) {
        thisweekhw();
        console.log(handleMessage);

    // Joke api
    } else if (message.includes(' joke')) {
      nerdJoke();
        } else if (message.includes(' swanson')) {
            Swansonqu();
            }

// Function to post the homework
  function thisweekhw(){
    var res = message.split(" ");
    console.log(res);
    console.log(res[2]);

    request.post({
      url: 'https://slack.com/api/files.upload',
      formData: {
          file: fs.createReadStream('./Homework/week_' + res[2] +'.zip'),
          token: 'xoxb-533280073296-538087922165-9IQZYaEOPzobfcYiCXE9xwRF',
          filetype: 'zip',
          filename:  ('Homework week' + res[2] + '.zip'),
          channels: Channum,
          title: ('Homework week' + res[2] + '.zip'),
      },
  }, function(error, response, body) {
      console.log(body);
  });
      };

// Function for the api
  function nerdJoke() {
    axios.get('http://api.icndb.com/jokes/random?limitTo=[nerdy]').then(res => {
      const nerd = res.data.value.joke;
      console.log(res)
      bot.postMessageToUser(Bryant, `Joke: ${nerd}`);
    });
  }

  function Swansonqu() {
  axios.get('https://ron-swanson-quotes.herokuapp.com/v2/quotes').then(res => {
    const quote = res.data;
    bot.postMessageToChannel(Channum , `${quote} -Ron Swanson`);
  });
  }
}