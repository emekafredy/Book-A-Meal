
export default function (sequelize, DataTypes) {
  const Menu = sequelize.define('Menu', {
    mealId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
  Menu.associate = (models) => {
    Menu.belongsTo(models.Meals, {
      foreignKey: 'mealId',
    });
  };
  return Menu;
}
