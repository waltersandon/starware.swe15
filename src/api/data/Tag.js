var mongoose = require('mongoose');

var TagCheck = require('./../validator/TagCheck');
var check = new TagCheck();

var TagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: check.checkName,
            message: 'Nome troppo corto'
        }
    },
    description: {
        type: String,
        required: false
    }
});

/* Metodo che viene chiamato quando è necessario restituire
 * una domanda in formato JSON all'esterno
 */
TagSchema.options.toJSON = {
    transform: function(doc, ret, options) {
        delete ret.__v;
        return ret;
    }
};

var Tag = mongoose.model('Tag', TagSchema);
module.exports = Tag;