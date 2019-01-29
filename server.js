require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var keys = require("./config/keys.js");
var passport = require("passport");
var GitHubStrategy = require("passport-github").Strategy;
var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Configure view engine to render EJS templates.
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

// Middleware
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());
app.use(express.static("public"));
app.use(require("morgan")("combined"));
app.use(require("cookie-parser")());
app.use(
  require("body-parser").urlencoded({
    extended: true
  })
);
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

// Passport
passport.use(
  new GitHubStrategy(
    {
      clientID: keys.github.clientID,
      clientSecret: keys.github.clientSecret,
      callbackURL: "http://localhost:3000/return"
    },
    function(accessToken, refreshToken, profile, cb) {
      // User.findOrCreate(
      //   {
      //     githubId: profile.id
      //   },
      //   function(err, user) {
      //     return cb(err, user);
      //   }
      // );
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

// Handlebars
// app.engine(
//   "handlebars",
//   exphbs({
//     defaultLayout: "main"
//   })
// );
// app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = {
  force: false
};

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
