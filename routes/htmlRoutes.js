var passport = require("passport");

// var instructions = require("../js/howto.js");
var commands = {
  hwCommand: "thisweekshw",
  hwCommand2: "/thisWeekhw",
  whatHwDoes: "Display's current weeks assignment details" ,
  jokeCommand: "Joke",
  jokeCommand2: "/Joke",
  whatJokeDoes: "Display's a \"yo mama joke \" from their API"
}

var db = require("../models");

module.exports = function(app) {
  // console.log(instructions);
  // Load index page
  app.get("/", function(req, res) {
    res.render("admin", {
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
      // console.log("WORKING UPDATE: ", dbAssignment);
      // res.json(dbAssignment);
      res.render("single-assign", { assignments: dbAssignment });
    });
  });

  // app.delete("/api/assignment/:id", function(req, res) {
  //   db.Assignment.destroy({ where: { id: req.params.id } }).then(function(
  //     dbAssignment
  //   ) {
  //     res.json(dbAssignment);
  //   });
  // });

  app.get("/api/next-assignment", function(req, res) {
    db.Assignment.findOne({
      where: {
        dueDate: {
          $gt: db.Sequelize.fn("NOW")
        }
      },
      order: [["dueDate", "DESC"]]
    }).then(function(dbAssignment) {
      console.log("WORKING VALUE: ", dbAssignment.dataValues);
      // res.json(dbAssignment);
      // res.render("next-assign", { assignments: dbAssignment });
      res.render("next-assign", dbAssignment.dataValues);
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
