'use strict';
module.exports = function(sequelize, DataTypes) {
  var lucr = sequelize.define('lucr', {
    primaryDesc: DataTypes.STRING,
    secondaryDesc: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        models.lucr.hasMany(models.homicide);
        models.lucr.hasMany(models.robbery);
        models.lucr.hasMany(models.burglary);
        models.lucr.hasMany(models.sexassault);
      }
    }
  });
  return lucr;
};
