
export default function (sequelize, DataTypes) {
  const Menu = sequelize.define('Menu', {
    mealId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});
  Menu.associate = (models) => {
    Menu.belongsToMany(models.Meals, {
      foreignKey: 'menuId',
      through: 'MenuMeals',
    });
  };
  return Menu;
}
