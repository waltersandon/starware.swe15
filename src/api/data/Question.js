/**
 * Created by andre on 21/04/2016.
 */
var mongoose = require('mongoose');

var Question = mongoose.model('Question', new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'User',
        required: true
    },
    body: {
        type: String,
        required: true
    },
    tags: [{
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Tag',
        required: true
    }]
}));

module.exports = Question;