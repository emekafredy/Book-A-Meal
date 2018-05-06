
export default function (sequelize, DataTypes) {
  const OrderDetails = sequelize.define('OrderDetails', {
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    mealId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
  // OrderDetails.associate = function (models) {
  //   OrderDetails.belongsTo(models.Order);
  //   OrderDetails.hasMany(models.Meals);
  // };
  return OrderDetails;
}
