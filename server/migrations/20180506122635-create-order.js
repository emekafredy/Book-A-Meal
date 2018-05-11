const moment = require('moment');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Orders', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    userId: {
      type: Sequelize.INTEGER,
    },
    mealId: {
      type: Sequelize.INTEGER,
    },
    processed: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    date: {
      type: Sequelize.STRING,
      defaultValue: moment().format('MMM Do YYYY, h:mm:ss a'),
    },
    quantity: {
      type: Sequelize.INTEGER,
      defaultValue: 1,
    },
    deliveryAddress: {
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('Orders'),
};
