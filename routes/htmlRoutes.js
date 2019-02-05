var passport = require("passport");
// var instructions = require("../js/howto.js");
var commands = {
  hwCommand: "thisweekshw",
  hwCommand2: "/thisWeekhw",
  whatHwDoes: "Display's current weeks assignment details" ,
  jokeCommand: "yoMamaJoke",
  jokeCommand2: "/yoMamaJoke",
  whatJokeDoes: "Display's a \"yo mama joke \" from their API"
}
module.exports = function(app) {
  // console.log(instructions);
  // Load index page
  app.get("/", function(req, res) {
    res.render("home", {
      user: req.user
    });
  });

 app.get("/commands", function(req,res) {
   console.log(commands);
   res.render("commands", {
    commands:commands
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
