const mongoose = require('mongoose');
const { channel_schema } = require("./Channel");

const show_schema = new mongoose.Schema({
    'name': { type: String, required: true },
    'channel': { type: channel_schema, required: true }
});

class Show extends mongoose.model('Show', show_schema) {

}

module.exports = { show_schema, Show };