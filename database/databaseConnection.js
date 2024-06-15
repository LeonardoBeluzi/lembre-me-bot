const { Sequelize } = require("sequelize");

module.exports = new Sequelize({
  dialect: "sqlite",
  storage: "./database/db.sqlite",
  logging: false,
  define: {
    timestamps: false,
  },
});
