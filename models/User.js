const mongoose = require('mongoose');

const user_schema = new mongoose.Schema({
    'name': { type: String, required: true, minlength: 3 },
    'balance': { type: Number, default: 0 }
});

user_schema.loadClass(class SchemaClass {
    get auth_token_payload() {
        return { _id: this._id };
    }
});

const User = mongoose.model('User', user_schema);
module.exports = { user_schema, User };