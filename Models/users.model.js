const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    username: String,
    email: String,
    address: Object,
    phone: String,
    website: String,
    company: Object
}, {
    versionKey: false
});

const UserModel = mongoose.model('users', userSchema);

module.exports = { UserModel };
