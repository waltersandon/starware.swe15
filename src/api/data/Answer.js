var _ = require('./Question');
var _ = require('./Questionnaire');
var _ = require('./User');
var mongoose = require('mongoose');

var AnswerSchema = new mongoose.Schema({
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: [true, 'Manca la domanda a cui si riferisce la risposta']
    },
    questionnaire: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Questionnaire',
        required: [true, 'Manca il questionario a cui si riferisce la risposta']
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    score: {
        type: Number,
        required: [true, 'Punteggio non specificato']
    }
});

/* Metodo che viene chiamato quando è necessario restituire
 * una domanda in formato JSON all'esterno
 */
AnswerSchema.options.toJSON = {
    transform: function(doc, ret, options) {
        delete ret.__v;
        return ret;
    }
};

var Answer = mongoose.model('Answer', AnswerSchema);
module.exports = Answer;