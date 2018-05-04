'use strict';
module.exports = (sequelize, DataTypes) => {
  var Meals = sequelize.define('Meals', {
    id: {
      type: DataTypes.INTEGER,
      allowNull:false
    },

    title: {
      type: DataTypes.STRING,
      allowNull:false
    },

    description: {
      type: DataTypes.STRING,
      allowNull:false
    },

    imageUrl: {
      type: DataTypes.STRING,
      allowNull:false
    },

    price: {
      type: DataTypes.INTEGER,
      allowNull:false
    }
  }, {});
  Meals.associate = function(models) {
    // associations can be defined here
    Meals.belongsToMany(models.Menu, {
      foreignKey: 'mealId',
      as: 'foodItems',
    });
  };
  return Meals;
};