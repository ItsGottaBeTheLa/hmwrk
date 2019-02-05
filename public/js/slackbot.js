// Dependencies
// =============================================================
var Slackbot = require("slackbots");
var axios = require("axios");
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

module.exports = function() {
  // Create bot with name and token
  var bot = new Slackbot({
    token: "xoxb-533280073296-538087922165-vFlir3u0neXw7Qk7Ytk3st0d",
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
    } else if (message.includes(" yomama")) {
      yoMamaJoke();
    }
  }

  function thisweekhw() {
    axios.post(
      'curl -F file=@homework-instructions.md, @homework-instructions2.md -F "initial_comment=Homework Week2" -F channels=CFTQNUSGJ -H "Authorization: Bearer xoxb-533280073296-538087922165-vFlir3u0neXw7Qk7Ytk3st0d" https://slack.com/api/files.upload'
    );
  }
};
