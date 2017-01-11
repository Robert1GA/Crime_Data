var geocoder = require('geocoder');
'use strict';
module.exports = function(sequelize, DataTypes) {
  var crime = sequelize.define('crime', {
    caseNum: DataTypes.STRING,
    date: DataTypes.STRING,
    block: DataTypes.STRING,
    lucr: DataTypes.STRING,
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
    },
    hooks: {
      beforeCreate: function(crime, options, cb) {
        geocoder.geocode(crime.block, function(err, data) {
          if (err) return cb(err, null);
          crime.lat = data.results[0].geometry.location.lat;
          crime.lng = data.results[0].geometry.location.lng;
          console.log('lat: ', crime.lat);
          console.log('lng: ', crime.lng);
          cb(null, crime);
        });
      }
    }
  });
  return crime;
};
