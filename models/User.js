const mongoose = require('mongoose');

const user_schema = new mongoose.Schema({
    'name': { type: String, required: true },
    'balance': { type: Number, default: 0 }
});

class User extends mongoose.model('User', user_schema) {

}

module.exports = { user_schema, User };