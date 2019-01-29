var db = require("../models");
var Sequlize = require("sequelize");

module.exports = function(app) {
  // Get all assinments
  app.get("/api/assignment", function(req, res) {
    db.Assignment.findAll({}).then(function(dbAssignment) {
      res.json(dbAssignment);
    });
  });
  //Get next upcoming addignment
  app.get("/api/nextassignment", function(req, res) {
    db.Assignment.findOne({
      where: {
        dueDate: {
          $gt: Sequlize.fn("NOW")
        }
      },
      order: [["dueDate", "ASC"]]
    }).then(function(dbAssignment) {
      res.json(dbAssignment);
    });
  });
  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/assignment/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(
      dbAssignment
    ) {
      res.json(dbAssignment);
    });
  });
};
