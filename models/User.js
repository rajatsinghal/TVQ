const mongoose = require('mongoose');

const user_schema = new mongoose.Schema({
    'name': { type: String, required: true, minlength: 3 },
    'balance': { type: Number, default: 0 }
});

user_schema.virtual('auth_token_payload').get(function() {
    return { _id: this._id };
});

class User extends mongoose.model('User', user_schema) {
    
}

module.exports = { user_schema, User };