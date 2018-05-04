'use strict';
module.exports = (sequelize, DataTypes) => {
  var Admin = sequelize.define('Admin', {
    id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    address: DataTypes.STRING,
    company: DataTypes.STRING
  }, {});
  Admin.associate = function(models) {
    // associations can be defined here
  };
  return Admin;
};