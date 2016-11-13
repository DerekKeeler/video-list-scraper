const jsdom = require('jsdom');

module.exports = (url, selector) =>
  new Promise((resolve, reject) => {
    if(!url || !selector) {
      reject('No url or selector specified');
    } else {
    
      jsdom.env(
        url,
        (err, window) => {    
          if(err) {
            reject(err);
          } else {
            const
              re = /\/(tt\d*)/,
              nodeList = window.document.querySelectorAll(selector);
            
            if(!nodeList.length) {
              reject('No items found');
            } else {
              resolve(
                Array.from(nodeList)
                .reduce((col, node) => {
                  const id = re.exec( node.getAttribute('href') )[1];
                  
                  if(id) {
                    col.push(id);
                  }
                  
                  return col;
                }, [])
              );
            }
            
            // Free up window memory
            window.close();
          }
        });
      }
  });
