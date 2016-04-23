var mongoose = require('mongoose');

var TagCheck = require('./../validator/TagCheck');
var check = new TagCheck();

var TagSchema = new mongoose.Schema({
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
});

/* Metodo che viene chiamato quando è necessario restituire
 * una domanda in formato JSON all'esterno
 */
TagSchema.options.toJSON = {
    transform: function(doc, ret, options) {
        console.log(ret);
        if (ret.parent)
            ret.parent = { href: '/api/tags/' + ret.parent + '/' };
        delete ret.__v;
        return ret;
    }
};

var Tag = mongoose.model('Tag', TagSchema);
module.exports = Tag;