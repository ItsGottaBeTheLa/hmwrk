// Dependencies
// =============================================================
var Slackbot = require('slackbots');
var axios = require ("axios");
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 8080;

// Create bot with name and token
var bot = new Slackbot({
    token: 'xoxb-533280073296-538087922165-LZ5aLOywdyxZZ9d7u0owakcf',
    name: 'HmWrkbot'
})

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/api", function(req, res) {
    res.send("curl -F file=@homework-instructions.md, @homework-instructions2.md -F 'initial_comment=Homework Week2' -F channels=CFTQNUSGJ -H 'Authorization: Bearer xoxb-533280073296-538087922165-LZ5aLOywdyxZZ9d7u0owakcf' https://slack.com/api/files.upload ");
  });

bot.postMessageToChannel(
    'general',
    'get ready to do HW'
);

bot.on('error', (err) => console.log(err));

bot.on('message', data => {
    if (data.type !== 'message') {
      return;
    }
  
    handleMessage(data.text);
  });
  
  // Respons to Data
  function handleMessage(message) {
    if (message.includes(' This weeks hw')) {
      thisweekhw();
    } else if (message.includes(' yomama')) {
      yoMamaJoke();
  }
}

  function thisweekhw(){
      axios.post('curl -F file=@homework-instructions.md, @homework-instructions2.md -F "initial_comment=Homework Week2" -F channels=CFTQNUSGJ -H "Authorization: Bearer xoxb-533280073296-538087922165-LZ5aLOywdyxZZ9d7u0owakcf" https://slack.com/api/files.upload'
      )
  };

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
