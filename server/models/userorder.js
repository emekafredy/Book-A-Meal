module.exports = (sequelize, DataTypes) => {
  const Userorder = sequelize.define('UserOrder', {
    mealId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
  Userorder.associate = function (models) {
    // associations can be defined here
  };
  return Userorder;
};
