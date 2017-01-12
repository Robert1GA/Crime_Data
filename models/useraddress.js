'use strict';
module.exports = function(sequelize, DataTypes) {
  var useraddress = sequelize.define('useraddress', {
    userId: DataTypes.INTEGER,
    addressId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return useraddress;
};