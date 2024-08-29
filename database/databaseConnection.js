const { Sequelize } = require("sequelize");

module.exports = new Sequelize({
  dialect: "mysql",
  database: process.env.MYSQL_DATABASE_NAME,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  logging: false,
  define: {
    timestamps: false,
  },
});
