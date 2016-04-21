var _ = require('./Tag');
var _ = require('./User');
var mongoose = require('mongoose');

var Question = mongoose.model('Question', new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    body: {
        type: String,
        required: true
    },
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag',
        required: true
    }]
}));

module.exports = Question;