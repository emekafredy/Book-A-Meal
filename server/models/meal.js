
export default function (sequelize, DataTypes) {
  const Meal = sequelize.define('Meal', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  }, {});
  Meal.associate = (models) => {
    Meal.belongsToMany(models.Menu, {
      through: 'MealsMenu',
      as: 'menus',
      foreignKey: 'mealId',
    });
    Meal.belongsToMany(models.Order, {
      through: 'UserOrder',
      as: 'orders',
      foreignKey: 'mealId',
    });
  };
  return Meal;
}
