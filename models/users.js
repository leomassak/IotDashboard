const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },

    host: {
        type: String,
        required: true,
    },

    port: {
        type: Number,
        required: true,
    },

    usermqtt: {
        type: String,
        required: true,
    },

    passwordmqtt: {
        type: String,
        required: true,
    },
    
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Users', userSchema);