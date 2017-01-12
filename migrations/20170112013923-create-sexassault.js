'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('sexassaults', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      caseNum: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.STRING
      },
      block: {
        type: Sequelize.STRING
      },
      lucrId: {
        type: Sequelize.STRING
      },
      locationDesc: {
        type: Sequelize.STRING
      },
      arrest: {
        type: Sequelize.BOOLEAN
      },
      domestic: {
        type: Sequelize.BOOLEAN
      },
      lat: {
        type: Sequelize.FLOAT
      },
      lng: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('sexassaults');
  }
};
