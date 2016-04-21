var _ = require('./User');
var _ = require('./Question');
var _ = require('./Tag');

var mongoose = require('mongoose');

var Questionnaire = mongoose.model('Questionnaire', new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true
    }],
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag',
        required: true
    }]
}));

module.exports = User;