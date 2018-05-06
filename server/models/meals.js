
export default function (sequelize, DataTypes) {
  const Meals = sequelize.define('Meals', {
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
  Meals.associate = (models) => {
    Meals.belongsToMany(models.Menu, {
      through: 'MealsMenu',
    });
  };
  return Meals;
}
