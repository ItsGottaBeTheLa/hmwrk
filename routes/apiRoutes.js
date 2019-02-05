var db = require("../models");
var signVerification = require("../public/js/signVerification");
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
  app.post("/api/add", function(req, res) {
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

  // PUT route for updating posts
  app.put("/api/posts", function(req, res) {
    db.Post.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function(dbPost) {
      res.json(dbPost);
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
            moment(dbAssignment.dueDate).format("MMMM Do YYYY, h:mm a")
        };
        res.json(data);
      });
    });
  });
};
