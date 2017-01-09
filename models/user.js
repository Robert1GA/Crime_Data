'use strict';

var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Invalid email address'
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [2,99],
          msg: 'Name must be between 2 and 99 characters.'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8,20],
          msg: 'Password must be between 8 and 20 characters.'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: function(createdUser, options, callback) {
        var hash = bcrypt.hashSync(createdUser.password, 10);
        createdUser.password = hash;
        callback(null, createdUser);
      }
    },
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    instanceMethods: {
      validPassword: function(password) {
        return bcrypt.compareSync(password, this.password);
      },
      toJSON: function() {
        var jsonUser = this.get();
        delete jsonUser.password;
        return jsonUser;
      }
    }
  });
  return user;
};
