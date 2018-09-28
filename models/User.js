const mongoose = require('mongoose');

const user_schema = new mongoose.Schema({
    'name': { type: String, required: true },
    'balance': { type: Number, default: 0 }
});

class User extends mongoose.model('User', user_schema) {

    getAuthTokenPayload() {
        return { _id: this._id };
    }

}

module.exports = { user_schema, User };