const request = require('request');

module.exports = id => 
  new Promise((resolve, reject) => {
    const url = `http://www.omdbapi.com/?i=${id}&plot=short&r=json`;
    
    request(url, (err, resp, body) => {
      err ? reject(err) : resolve(JSON.parse(body));
    })
  });
