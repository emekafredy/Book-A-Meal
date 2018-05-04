'use strict';
import meals from './../data/meals';
module.exports = (sequelize, DataTypes) => {
  var Menu = sequelize.define('Menu', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {});
  Menu.associate = function(models) {
    // associations can be defined here
    Menu.hasMany(models.meals, {
      foreignKey: 'menuId',
      as: models.foodItems
    });
  };
  return Menu;
};