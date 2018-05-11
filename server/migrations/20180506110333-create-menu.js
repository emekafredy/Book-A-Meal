

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Menus', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    date: {
      type: Sequelize.DATEONLY,
      defaultValue: new Date(),
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATEONLY,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATEONLY,
    },
  }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('Menus'),
};
