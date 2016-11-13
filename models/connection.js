const
  Sequelize = require('sequelize'),
  { dbConnection } = require('../config');

module.exports = new Sequelize(dbConnection);
