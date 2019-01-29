var db = require("../models");
var passport = require("passport");

module.exports = function(app) {
  // Load index page

  app.get("/", function(req, res) {
    res.render("home", {
      user: req.user
    });
  });

<<<<<<< HEAD
  app.get("/login", function(req, res) {
    res.render("login");
=======
  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });
>>>>>>> 1ae1358346dbf9d291c5e7eaa7ac39882f1d7082
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
