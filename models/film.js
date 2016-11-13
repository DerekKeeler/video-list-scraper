const
  conn = require('./connection'),
  Sequelize = require('sequelize');

module.exports = conn.define('film', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  imdbRating: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  imdbID: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  year: {
    type: Sequelize.INTEGER
  },
  plot: {
    type: Sequelize.TEXT
  },
  actors: {
    type: Sequelize.STRING
  },
  director: {
    type: Sequelize.STRING
  },
  rated: {
    type: Sequelize.STRING
  }
}, {
  classMethods: {
    upsertWithReturn: function (options) {
      return this.findOrCreate(options).spread(function (row, created) {
          if (created) {
            return [row, created];
          } else {
            return row.updateAttributes(options.defaults).then(function (updated) {
                return [updated, created];
            });
          }
      });
  }
}
});
