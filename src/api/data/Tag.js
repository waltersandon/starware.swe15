var mongoose = require('mongoose');

var Tag = mongoose.model('Tag', new mongoose.Schema({
    name: {
        type: String,
        required: true
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