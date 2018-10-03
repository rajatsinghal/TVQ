const mongoose = require('mongoose');

const channel_schema = new mongoose.Schema({
    'name': { type: String, required: true },
});

const Channel = mongoose.model('Channel', channel_schema);
module.exports = { channel_schema, Channel };