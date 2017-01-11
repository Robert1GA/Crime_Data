'use strict';
module.exports = function(sequelize, DataTypes) {
  var lucr = sequelize.define('lucr', {
    primaryDesc: DataTypes.STRING,
    secondaryDesc: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return lucr;
};