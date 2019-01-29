var db = require("../models");
var signVerification = require("../js/signVerification.js");

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
  app.post("/slack/assignment", function(req, res) {
    signVerification(req, res, function() {
      db.Assignment.findOne({
        where: {
          dueDate: {
            $gt: db.Sequelize.fn("NOW")
          }
        },
        order: [["dueDate", "ASC"]]
      }).then(function(dbAssignment) {
        var data = {
          // eslint-disable-next-line camelcase
          response_type: "in-channel",
          text:
            "The Next Assignment is " +
            dbAssignment.assignmentName +
            " and is due on " +
            dbAssignment.dueDate
        };
        res.json(data);
      });
    });
  });

  // Create a new assignment
  app.post("/api/assignment", function(req, res) {
    db.Assignment.create(req.body).then(function(dbAssignment) {
      res.json(dbAssignment);
      return;
    });
  });

  // Delete an anssignment by id
  app.delete("/api/assignment/:id", function(req, res) {
    db.Assignment.destroy({ where: { id: req.params.id } }).then(function(
      dbAssignment
    ) {
      res.json(dbAssignment);
    });
  });
};
