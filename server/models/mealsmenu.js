
module.exports = (sequelize, DataTypes) => {
  const MealsMenu = sequelize.define('MealsMenu', {
    mealId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    menuId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
  MealsMenu.associate = function (models) {
    // associations can be defined here
  };
  return MealsMenu;
};
