var _ = require('./Role');
var mongoose = require('mongoose');

var User = mongoose.model('User', new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        required: true
    },
    userName: {
        type: String,
        required: true
    }
}));

module.exports = User;