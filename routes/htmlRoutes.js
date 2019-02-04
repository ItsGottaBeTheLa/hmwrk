var passport = require("passport");
var db = require("../models");

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

  app.get("/api/amend", function(req, res) {
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

  app.delete("/api/assignment/:id", function(req, res) {
    db.Assignment.destroy({ where: { id: req.params.id } }).then(function(
      dbAssignment
    ) {
      res.json(dbAssignment);
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
