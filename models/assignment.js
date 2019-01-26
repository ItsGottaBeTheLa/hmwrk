module.exports = function(sequelize, DataTypes) {
  var Assignment = sequelize.define("Assignment", {
    assignmentName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    assignmentDetails: {
      type: DataTypes.STRING,
      allowNULL: false
    }
  });
  return Assignment;
};
