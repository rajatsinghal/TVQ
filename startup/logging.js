const winston = require('winston');
require('express-async-errors');

module.exports = function() {
    winston.add(new winston.transports.File({ filename: 'logfile.log', handleExceptions: true }));
    winston.add(new winston.transports.Console({ format: winston.format.colorize(), handleExceptions: true }));

    process.on('unhandledRejection', (e) => { throw(e); } );    
}