const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
    user_name: {
        type: String,
        required: true
    },
    user_email: {
        type: String,
        required: true
    },
    user_password: {
        type: String,
        required: true
    }
})

module.exports = User = mongoose.model('users', userSchema)