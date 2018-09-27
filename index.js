const express = require('express');
const winston = require('winston');

const app = express();
const port = process.env.port || 6363;

require('./startup/logging')();
require('./startup/db')();
app.use(require('./routes'));

app.listen(port, () => { winston.info(`Listening on port ${port}..`); })