var _ = require('./User');
var _ = require('./Question');
var _ = require('./Tag');

var mongoose = require('mongoose');

var QuestionnaireCheck = require('./../validator/QuestionnaireCheck');
var check = new QuestionnaireCheck();

var Questionnaire = mongoose.model('Questionnaire', new mongoose.Schema({
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
        required: true,
        validate: {
            validator: check.checkQuestions,
            message: 'La lista delle domande non può essere vuota'
        }
    }],
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag',
        required: true,
        validate: {
            validator: check.checkTags,
            message: 'La lista degli argomenti non può essere vuota'
        }
    }]
}));

module.exports = Questionnaire;