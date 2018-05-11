const moment = require('moment');

export default function (sequelize, DataTypes) {
  const Order = sequelize.define('Order', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    mealId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    processed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: moment().format('MMM Do YYYY, h:mm:ss a'),
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    deliveryAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});
  Order.associate = (models) => {
    Order.belongsTo(models.User, { foreignKey: 'userId' });
    Order.belongsTo(models.Meal, { foreignKey: 'mealId' });
  };
  return Order;
}
