var _ = require('./Tag');
var _ = require('./User');
var mongoose = require('mongoose');
var QuestionCheck = require('./../validator/QuestionCheck');
var check = new QuestionCheck();

var QuestionSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Autore domanda mancante']
    },
    body: {
        type: String,
        required: [true, 'Corpo domanda mancante'],
        validate: {
            validator: check.checkQML,
            message: 'Errore QML'
        }
    },
    explanation: {
        type: String,
        required: false
    },
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag',
        required: [true, 'Argomenti domanda mancanti']
    }]
});

QuestionSchema.path('tags').validate(
    check.checkTags, 
    'La lista degli argomenti non può essere vuota'
);

/* Metodo che viene chiamato quando è necessario restituire
 * una domanda in formato JSON all'esterno
 */
QuestionSchema.options.toJSON = {
    transform: function(doc, ret, options) {
        delete ret.__v;
        return ret;
    }
};

var Question = mongoose.model('Question', QuestionSchema);
module.exports = Question;