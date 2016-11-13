const
  col = '.titleColumn > a',
  headerItem = '.lister-item-header > a';

// Top 50 by genre
const genreList = [
  'action',
  'adventure',
  'animation',
  'biography',
  'comedy',
  'crime',
  'drama',
  'family',
  'fantasy',
  'film_noir',
  'history',
  'horror',
  'music',
  'musical',
  'mystery',
  'romance',
  'sci_fi',
  'sport',
  'thriller',
  'war',
  'western'
].map(genre => ({
  url: `http://www.imdb.com/search/title?genres=${genre}&sort=user_rating,desc&title_type=feature&num_votes=25000,&pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=2406822102&pf_rd_r=1NR35CS3PB39C11S418X&pf_rd_s=right-6&pf_rd_t=15506&pf_rd_i=top&view=advanced&ref_=chttp_gnr_2`,
  selector: headerItem
}));

module.exports = [ 
  // Top 250 films
  {
    url: 'http://www.imdb.com/chart/top?ref_=nv_mv_250_6',
    selector: col
  }  
].concat(genreList);
