"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("Birthdays", {
      id: {
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      day: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      month: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable("Birthdays");
  },
};
