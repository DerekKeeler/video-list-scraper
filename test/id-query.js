const
  expect = require('chai').expect,
  query = require('../src/id-query'),
  testSource =   {
    url: 'http://www.imdb.com/chart/top?ref_=nv_mv_250_6',
    selector: '.titleColumn > a'
  };

describe('ID Querying', function() {
  it('should return a Promise', function() {
    const makeQuery = query(testSource.url, testSource.selector);
    
    expect(makeQuery).to.be.an.instanceof(Promise);
  });
  
  // describe('Expecting succesful query' () => {
  //   it('should return a Promise', () => {
  //     assert.equal(-1, [1,2,3].indexOf(4));
  //   });
  // });
  
});
