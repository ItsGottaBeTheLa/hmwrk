module.exports = function(sequelize, DataTypes) {
  var Assignment = sequelize.define("Assignment", {
    assignmentName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNULL: false
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    isRequired: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    assignmentDetails: {
      type: DataTypes.STRING,
      allowNULL: false
    }
  });
  return Assignment;
};
