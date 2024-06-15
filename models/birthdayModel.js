const { Model, DataTypes } = require("sequelize");
const connection = require("../database/databaseConnection");

class Birthday extends Model {}

Birthday.init(
  {
    day: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    month: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize: connection,
    modelName: "Birthday",
  }
);

module.exports = { Birthday };
