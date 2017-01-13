var geocoder = require('geocoder');
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
    },
    hooks: {
      beforeCreate: function(sexassault, options, cb) {
        geocoder.geocode(sexassault.block, function(err, data) {
          if (err) return cb(err, null);
          sexassault.lat = data.results[0].geometry.location.lat;
          sexassault.lng = data.results[0].geometry.location.lng;
          cb(null, sexassault);
        });
      }
    }
  });
  return sexassault;
};
