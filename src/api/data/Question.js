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


/* Metodo che viene chiamato quando è necessario restituire
 * una domanda in formato JSON all'esterno
 */
QuestionSchema.options.toJSON = {
    transform: function(doc, ret, options) {
        console.log(ret);
        ret.author = { href: '/api/users/' + ret.author + '/' };
        ret.tags = ret.tags.map(function(tag) {
            return { href: '/api/tags/' + tag + '/' };
        });
        delete ret.__v;
        return ret;
    }
};

var Question = mongoose.model('Question', QuestionSchema);
module.exports = Question;