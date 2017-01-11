'use strict';
module.exports = function(sequelize, DataTypes) {
  var homicide = sequelize.define('homicide', {
    caseNum: DataTypes.STRING,
    date: DataTypes.STRING,
    block: DataTypes.STRING,
    lucrId: DataTypes.STRING,
    locationDesc: DataTypes.STRING,
    arrest: DataTypes.BOOLEAN,
    domestic: DataTypes.BOOLEAN,
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return homicide;
};
