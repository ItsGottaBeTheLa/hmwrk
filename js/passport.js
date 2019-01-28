require("dotenv").load();
var keys = require("../config/keys.js");
var express = require("express");
var passport = require("passport");
var GitHubStrategy = require("passport-github").Strategy;

passport.use(
  new GitHubStrategy(
    {
      clientID: keys.github.clientID,
      clientSecret: keys.github.clientSecret,
      callbackURL: "http://127.0.0.1:3000/auth/github/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
      User.findOrCreate(
        {
          githubId: profile.id
        },
        function(err, user) {
          return cb(err, user);
        }
      );
    }
  )
);

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// Create a new Express application.
var app = express();

// Configure view engine to render EJS templates.
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require("morgan")("combined"));
app.use(require("cookie-parser")());
app.use(require("body-parser").urlencoded({ extended: true }));
app.use(
  require("express-session")({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
  })
);

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

// Define routes.
app.get("/", function(req, res) {
  res.render("home", { user: req.user });
});

app.get("/login", function(req, res) {
  res.render("login");
});

app.get("/login/github", passport.authenticate("github"));

app.get(
  "/return",
  passport.authenticate("github", { failureRedirect: "/login" }),
  function(req, res) {
    res.redirect("/");
  }
);

app.get("/profile", require("connect-ensure-login").ensureLoggedIn(), function(
  req,
  res
) {
  res.render("profile", { user: req.user });
});

app.listen(process.env.PORT || 3000);
console.log("successfully connected");
