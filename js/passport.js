var GitHubStrategy = require("passport-github").Strategy;
var keys = require("../config/keys.js");
var passport = require("passport");
var db = require("../models");

module.exports = function() {
  passport.use(
    new GitHubStrategy(
      {
        clientID: keys.github.clientID,
        clientSecret: keys.github.clientSecret,
        callbackURL: "http://localhost:3000/return"
      },
      function(accessToken, refreshToken, profile, cb) {
        isAdmin(profile);
        return cb(null, profile);
      }
    )
  );
  passport.serializeUser(function(user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  });
};

function isAdmin(profile) {
  var adminAccountNames = [
    "Bgosse1",
    "verna100",
    "ItsGottaBeTheLa",
    "harrysuk"
  ];
  var admin = false;
  for (var i = 0; i < adminAccountNames.length; i++) {
    if (profile.username === adminAccountNames[i]) {
      admin = true;
    }
  }
  console.log("profile " + profile.username);
  db.User.findOrCreate({
    where: { userName: profile.username },
    defaults: { isAdmin: admin }
  }).spread(function(user, created) {
    console.log(
      user.get({
        plain: true
      })
    );
    console.log(created);
  });
}
