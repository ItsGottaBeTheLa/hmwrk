module.exports = function(sequelize, DataTypes) {
  var Assignment = sequelize.define("Assignment", {
    assignmentName: {
      type: DataTypes.STRING,
      allowNull: false
    },
<<<<<<< HEAD
=======
    type: {
      type: DataTypes.STRING,
      allowNULL: false
    },
>>>>>>> 1ae1358346dbf9d291c5e7eaa7ac39882f1d7082
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
<<<<<<< HEAD
=======
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    isRequired: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
>>>>>>> 1ae1358346dbf9d291c5e7eaa7ac39882f1d7082
    assignmentDetails: {
      type: DataTypes.STRING,
      allowNULL: false
    }
  });
  return Assignment;
};
