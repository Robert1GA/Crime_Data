var geocoder = require('geocoder');
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
        models.homicide.belongsTo(models.lucr);
      }
    },
    hooks: {
  beforeCreate: function(place, options, cb) {
    geocoder.geocode(homicide.block, function(err, data) {
      if (err) return cb(err, null);
      place.lat = data.results[0].geometry.location.lat;
      place.lng = data.results[0].geometry.location.lng;
      cb(null, place);
    });
  }
}
  });
  return homicide;
};
