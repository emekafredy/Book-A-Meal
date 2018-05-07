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
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {});
  Order.associate = (models) => {
    Order.belongsTo(models.User, { foreignKey: 'userId' });
    Order.belongsTo(models.Meals, { foreignKey: 'mealId' });
  };
  return Order;
}
