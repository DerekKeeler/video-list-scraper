const
  getIds = require('./lib/id-query'),
  getData = require('./lib/data-query'),
  sources = require('./lib/sources'),
  promiseAny = require('./lib/promise-any').bind(this, err => { logger.error(err); }),
  { Genre, Film, ItemTag } = require('./models/index'),
  logger = require('./lib/logger');

logger.info('Starting data processing');

Promise.all([ Genre.sync(), Film.sync(), ItemTag.sync() ])
.then(_ => promiseAny(sources.map(page => getIds(page.url, page.selector))))
.then(data => 
  // Flatten array of arrays
  data.reduce((col, arr) =>
    col.concat(arr)
  , [])
)
.then(data => {
  // Filter to ensure unique IDs
  const uniqIds = {};
  
  logger.info('ID list pulled successfully');
  
  return data.filter(id =>
    uniqIds[id] ? false : uniqIds[id] = true
  );
})
.then(ids => {
    logger.debug(`${ids.length} IDs found`);
    
    return promiseAny( ids.map(getData) )
  }
)
.then(mediaData => {
  // Create a seperate list of genres and parse media genres
  // Store values in objects in order to pass by reference for later manipulation
  const genres = {};
  
  logger.info('Media data pulled successfully');
  logger.debug(`${mediaData.length} media items found`);
  
  return {
    genres,
    media: mediaData.map(media => {
      const mediaGenres = media['Genre'].split(', ');
      
      media['Genre'] = mediaGenres.map(genre =>
        // Using objects so that individual genre list contains references to reduced genre map
        // This lets us manipulate only the total genre map and get individual changes here
        genres[genre] = genres[genre] || {}
      );
      
      return media;
    })
  };
})
.then(mapped => {
  // Start saving things to DB
  // Find or create genres first
  // Genres shouldn't need to be updated they just need to exist
  const genres = Object.keys(mapped.genres);
  
  logger.debug(`${genres.length} genres found`);
  
  return promiseAny(
    genres
    .map(genre =>
      Genre.findOrCreate({ where: { name: genre } })
      .spread((genreRow, created) => {
        mapped.genres[genre].item = genreRow;
      })
    )
  )
  .then(_ => mapped)
})
.then(mapped => {
  logger.info('Genres created successfully');
  
  // Upsert films now that genres have been created
  // This data may have changed from the last time so let's update it  
  return promiseAny(
    mapped.media.map(m =>
      Film.upsertWithReturn({
        where: {
          imdbID: m['imdbID']
        },
        defaults: {
          title: m['Title'],
          imdbRating: m['imdbRating'],
          imdbID: m['imdbID'],
          year: m['Year'],
          plot: m['Plot'],
          actors: m['Actors'],
          director: m['Director'],
          rated: m['Rated']
        }
      })
      .spread((row, created) =>
        row.setGenres(m['Genre'].map(g => g.item))
      )
    )
  )
})
.then(_ => {
  logger.info('Finished data processing');
})
.catch(err => {
  logger.error(err);
});
