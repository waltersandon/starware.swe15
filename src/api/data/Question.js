var _ = require('./Tag');
var _ = require('./User');
var mongoose = require('mongoose');
var QuestionCheck = require('./../validator/QuestionCheck');
var check = new QuestionCheck();

var QuestionSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false 
    },
    body: {
        type: String,
        required: true,
        validate: {
            validator: check.checkQML,
            message: 'Password troppo corta'
        }
    },
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag',
        required: true
    }]
});

var Question = mongoose.model('Question', QuestionSchema);

/* Metodo che viene chiamato quando è necessario restituire
 * un utente in formato JSON all'esterno
 */
QuestionSchema.options.toJSON = {
    transform: function(doc, ret, options) {
        ret.id = ret._id;
        ret.author = { href: '/api/users/' + ret.author + '/' };
        ret.tags.map(function(tag) {
            return { href: '/api/tags/' + tag._id + '/' };
        });
        delete ret._id;
        delete ret.__v;
        return ret;
    }
};

module.exports = Question;
