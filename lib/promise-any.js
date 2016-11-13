// Similar to Promise.all but is fulfilled if any promise is fulfills
// Unlike Promise.race this waits until all promises are resolved
// Rejected promises can be handled with the optional error handling
// This function does not resolve with data in the same order
const indiFulfill = (resolve, reject, resolved, fulfilled, total) => {
  if(fulfilled === total) {
    if(resolved.length) {
      resolve(resolved);
    } else {
      reject();
    }
  }
}

module.exports = (errHandler, promises) => 
  new Promise((resolve, reject) => {
    const
      total = promises.length,
      resolved = [];
      
    let fulfilled = 0;
    
    promises.forEach(prom => {
      prom
      .then(data => {
        resolved.push(data);
        indiFulfill(resolve, reject, resolved, ++fulfilled, total);
      })
      .catch(err => {
        if(typeof errHandler === 'function') {
          errHandler(err);
          indiFulfill(resolve, reject, resolved, ++fulfilled, total);
        }
      });
    });
  });
