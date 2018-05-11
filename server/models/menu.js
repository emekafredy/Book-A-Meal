
export default function (sequelize, DataTypes) {
  const Menu = sequelize.define('Menu', {
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: new Date(),
    },
  }, {});
  Menu.associate = (models) => {
    Menu.belongsToMany(models.Meal, {
      through: 'MealsMenu',
      as: 'meals',
      foreignKey: 'menuId',
    });
    Menu.belongsToMany(models.Order, {
      through: 'UserOrder',
      as: 'orders',
      foreignKey: 'mealId',
    });
  };
  return Menu;
}
