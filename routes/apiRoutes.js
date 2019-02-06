var db = require("../models");
var signVerification = require("../config/middleware/signVerification");
var moment = require("moment");
moment.locale();

module.exports = function(app) {
  // Get all assignments
  app.get("/api/assignment", function(req, res) {
    db.Assignment.findAll({}).then(function(dbAssignment) {
      res.json(dbAssignment);
    });
  });

  // Get next upcoming assignment
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

  // Add a new assignment
  app.post("/api/assignment", function(req, res) {
    db.Assignment.create(req.body).then(function(dbAssignment) {
      res.json(dbAssignment);
      return;
    });
  });

  // POST route for saving a new assignment
  app.post("/api/assignment", function(req, res) {
    console.log(req.body);
    db.Assignment.create({
      assignmentName: req.body.assignmentName,
      type: req.body.type,
      completed: req.body.completed,
      assignmentDetails: req.body.assignmentDetails,
      dueDate: req.body.dueDate,
      isRequired: req.body.isRequired
    })
      .then(function(dbAssignment) {
        res.json(dbAssignment);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  // PUT route for updating assignments
  app.put("/api/assignment/:id", function(req, res) {
    db.Assignment.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function(dbAssignment) {
      res.json(dbAssignment);
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

  //bot endpoint
  app.post("/api", function(req, res) {
    res.send(
      "curl -F file=@homework-instructions.md, @homework-instructions2.md -F 'initial_comment=Homework Week2' -F channels=CFTQNUSGJ -H 'Authorization: Bearer xoxb-533280073296-538087922165-LZ5aLOywdyxZZ9d7u0owakcf' https://slack.com/api/files.upload "
    );
  });

  //slack slash command endpoint
  app.post("/slack/assignment", signVerification, function(req, res) {
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
          moment(dbAssignment.dueDate).format("MMMM Do YYYY, h:mm a") +
          " here is the link: " +
          dbAssignment.assignmentLink
      };
      res.json(data);
    });
  });
};
