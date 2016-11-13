const
  conn = require('./connection'),
  Sequelize = require('sequelize');

module.exports = conn.define('item_tag', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  tag_id: {
    type: Sequelize.INTEGER,
    unique: 'item_tag_taggable'
  },
  taggable: {
    type: Sequelize.STRING,
    unique: 'item_tag_taggable'
  },
  taggable_id: {
    type: Sequelize.INTEGER,
    unique: 'item_tag_taggable',
    references: null
  }
});
