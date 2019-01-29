var db = require("../models");

module.exports = function(app) {
  // Get all assignments
  app.get("/api/assignment", function(req, res) {
    db.Assignment.findAll({}).then(function(dbAssignment) {
      res.json(dbAssignment);
    });
  });
  //Get next upcoming assignment
  app.get("/api/nextassignment", function(req, res) {
    db.Assignment.findOne({
      where: {
        dueDate: {
          $gt: db.Sequelize.fn("NOW")
        }
      },
      order: [["dueDate", "ASC"]]
    }).then(function(dbAssignment) {
      res.json(dbAssignment);
    });
  });

  //slack slash command endpoint
  app.post("/api/assignment", function(req, res) {
    res.send("hello");
  });

  // Create a new assignment
  app.post("/api/assignment", function(req, res) {
    db.Example.create(req.body).then(function(dbAssignment) {
      res.json(dbAssignment);
      return;
    });
  });

  // Delete an anssignment by id
  app.delete("/api/assignment/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(
      dbAssignment
    ) {
      res.json(dbAssignment);
    });
  });
};
