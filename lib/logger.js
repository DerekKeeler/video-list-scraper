const 
  winston = require('winston'),
  { debugLogPath, errorLogPath } = require('../config');

winston.cli();

module.exports = new winston.Logger({
  transports: [
    new winston.transports.Console({ json: false, timestamp: true }),
    new winston.transports.File({ filename: debugLogPath, timestamp: true, level: 'debug' })
  ],
  exceptionHandlers: [
    new winston.transports.Console({ json: false, timestamp: true }),
    new winston.transports.File({ filename: errorLogPath, timestamp: true })
  ],
  exitOnError: false
});
