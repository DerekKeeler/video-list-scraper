const
  conn = require('./connection'),
  Sequelize = require('sequelize');

module.exports = conn.define('genre', {
  name: {
    type: Sequelize.STRING
  }
});
