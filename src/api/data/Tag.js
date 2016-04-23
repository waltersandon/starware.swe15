var mongoose = require('mongoose');

var TagCheck = require('./../validator/TagCheck');
var check = new TagCheck();

var Tag = mongoose.model('Tag', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: {
            validator: check.checkName,
            message: 'Nome troppo corto'
        }
    },
    description: {
        type: String,
        required: false
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag',
        required: false
    }
}));

module.exports = Tag;