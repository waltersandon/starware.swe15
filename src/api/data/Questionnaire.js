var _ = require('./User');
var _ = require('./Question');
var _ = require('./Tag');

var mongoose = require('mongoose');

var QuestionnaireCheck = require('./../validator/QuestionnaireCheck');
var check = new QuestionnaireCheck();

var QuestionnaireSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        validate: {
            validator: check.checkTitle,
            message: 'Titolo non corretto'
        }
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
});

QuestionnaireSchema.path('questions').validate(
    check.checkQuestions, 
    'La lista delle domande non può essere vuota'
);

QuestionnaireSchema.path('tags').validate(
    check.checkTags, 
    'La lista degli argomenti non può essere vuota'
);

/* Metodo che viene chiamato quando è necessario restituire
 * una domanda in formato JSON all'esterno
 */
QuestionnaireSchema.options.toJSON = {
    transform: function(doc, ret, options) {
        //ret.author = { href: '/api/users/' + ret.author + '/' };
        ret.author = { href: ret.author };
		ret.questions = ret.questions.map(function(question) {
			//return { href: '/api/questions/' + question + '/' };
            return { href: question };
        });
        ret.tags = ret.tags.map(function(tag) {
			//return { href: '/api/tags/' + tag + '/' };
            return { href: tag };
        });
        delete ret.__v;
        return ret;
    }
};

var Questionnaire = mongoose.model('Questionnaire', QuestionnaireSchema);
module.exports = Questionnaire;