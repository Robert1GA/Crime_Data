var geocoder = require('geocoder');
'use strict';
module.exports = function(sequelize, DataTypes) {
  var burglary = sequelize.define('burglary', {
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
        models.burglary.belongsTo(models.lucr);
      }
    },
    hooks: {
      beforeCreate: function(place, options, cb) {
        geocoder.geocode(burglary.block, function(err, data) {
          if (err) return cb(err, null);
          place.lat = data.results[0].geometry.location.lat;
          place.lng = data.results[0].geometry.location.lng;
          cb(null, place);
        });
      }
    }
  });
  return burglary;
};
