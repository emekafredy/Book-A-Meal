export default function (sequelize, DataTypes) {
  const Order = sequelize.define('Order', {
    userId: {
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
    total: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  }, {});
  // Order.associate = (models) => {
  //   Order.belongsTo(models.User, {
  //     foreignKey: 'orderId',
  //   });
  // };
  return Order;
}
