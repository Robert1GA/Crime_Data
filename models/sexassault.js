'use strict';
module.exports = function(sequelize, DataTypes) {
  var sexassault = sequelize.define('sexassault', {
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
        models.sexassault.belongsTo(models.lucr);
      }
    }
  });
  return sexassault;
};
