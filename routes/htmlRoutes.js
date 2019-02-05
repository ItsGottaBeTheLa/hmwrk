var passport = require("passport");
var db = require("../models");
var isAuthenticated = require("../config/middleware/isAuthenticated");
var isAdministrator = require("../config/middleware/isAdministrator");

module.exports = function(app) {
  // Load index page
  app.get(
    "/",
    require("connect-ensure-login").ensureLoggedIn({
      redirectTo: "/login/github",
      setReturnTo: false
    }),
    function(req, res) {
      res.render("home", {
        user: req.user
      });
    }
  );

  app.get("/api/amend", isAdministrator, function(req, res) {
    db.Assignment.findAll({}).then(function(dbAssignment) {
      // res.json(dbAssignment);
      res.render("index", { assignments: dbAssignment });
    });
  });

  app.get("/api/update", function(req, res) {
    db.Assignment.findOne({
      where: {
        dueDate: {
          $gt: db.Sequelize.fn("NOW")
        }
      },
      order: [["dueDate", "ASC"]]
    }).then(function(dbAssignment) {
      // res.json(dbAssignment);
      res.render("single-assign", { assignments: dbAssignment });
    });
  });

  app.get("/api/nextassignment", function(req, res) {
    db.Assignment.findOne({
      where: {
        dueDate: {
          $gt: db.Sequelize.fn("NOW")
        }
      },
      order: [["dueDate", "ASC"]]
    }).then(function(dbAssignment) {
      // res.json(dbAssignment);
      res.render("index", { assignments: dbAssignment });
    });
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
};
