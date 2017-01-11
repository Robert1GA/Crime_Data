var geocoder = require('geocoder');
'use strict';
module.exports = function(sequelize, DataTypes) {
  var address = sequelize.define('address', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    hooks: {
      beforeCreate: function(address, options, cb) {
        geocoder.geocode(address.address, function(err, data) {
          if (err) return cb(err, null);
          address.lat = data.results[0].geometry.location.lat;
          address.lng = data.results[0].geometry.location.lng;
          console.log(address.lat);
          console.log(address.lng);
          cb(null, address);
        });
      }
    }
  });
  return address;
};
