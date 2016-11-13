const
  Film = require('./film'),
  Genre = require('./genre'),
  ItemTag = require('./item-tag');

Genre.belongsToMany(Film, {
  through: {
    model: ItemTag,
    unique: false
  },
  foreignKey: 'tag_id',
  constraints: false
});

Film.belongsToMany(Genre, {
  through: {
    model: ItemTag,
    unique: false,
    scope: {
      taggable: 'genre'
    }
  },
  foreignKey: 'taggable_id',
  constraints: false
});

module.exports = { Film, Genre, ItemTag };
