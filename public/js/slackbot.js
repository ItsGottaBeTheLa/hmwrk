// Dependencies
// =============================================================
var Slackbot = require("slackbots");
var axios = require("axios");
var keys = require("../../config/keys");

module.exports = function() {
  // Create bot with name and token
  var bot = new Slackbot({
    token: keys.slack.slackBotToken,
    name: "HmWrkbot"
  });

  bot.postMessageToChannel("general", "get ready to do HW");

  bot.on("error", err => console.log(err));

  bot.on("message", data => {
    if (data.type !== "message") {
      return;
    }

    handleMessage(data.text);
  });

  // Respons to Data
  function handleMessage(message) {
    if (message.includes(" This weeks hw")) {
      thisweekhw();
    } else if (message.includes(" joke")) {
      nerdJoke();
    }
  }

  function thisweekhw() {
    axios.post(
      'curl -F file=@homework-instructions.md, @homework-instructions2.md -F "initial_comment=Homework Week2" -F channels=CFTQNUSGJ -H "Authorization: Bearer ' + bot.token + 'https://slack.com/api/files.upload'
    );
  }

  function nerdJoke() {
    axios.get('http://api.icndb.com/jokes/random?limitTo=[nerdy]').then(res => {
      const nerd = res.data.value.joke;
      console.log(res)
      bot.postMessageToChannel('hmwrkbot', `Joke: ${nerd}`);
    });
  };
};
