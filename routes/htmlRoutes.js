var db = require("../models");
var passport = require("passport");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("home", {
      user: req.user
    });
  });

  app.get("/login", function(req, res) {
    res.render("login");
  });

  app.get("/login/github", passport.authenticate("github"));

  app.get(
    "/return",
    passport.authenticate("github", {
      failureRedirect: "/login"
    }),
    function(req, res) {
      res.redirect("/");
    }
  );

  app.get(
    "/profile",
    require("connect-ensure-login").ensureLoggedIn(),
    function(req, res) {
      res.render("profile", {
        user: req.user
      });
    }
  );
};
