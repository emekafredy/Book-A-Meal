
export default function (sequelize, DataTypes) {
  const Menu = sequelize.define('Menu', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    isCurrent: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  }, {});
  Menu.associate = (models) => {
    Menu.belongsToMany(models.Meal, {
      through: 'MealsMenu',
      as: 'meals',
      foreignKey: 'menuId',
    });
  };
  return Menu;
}
