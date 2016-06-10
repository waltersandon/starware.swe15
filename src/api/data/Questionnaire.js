/**
 * @file Questionnaire.js
 * @date 19/04/2016
 * @version 2.0
 * @author Andrea Venier
 *
 */
/*!
 * @class   Questionnaire
 * @details Classe che rappresenta un questionario
 */

var _ = require('./User');
var _ = require('./Question');
var _ = require('./Tag');

var mongoose = require('mongoose');

var QuestionnaireCheck = require('./../validator/QuestionnaireCheck');
var check = new QuestionnaireCheck();

var QuestionnaireSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Titolo questionario mancante'],
        validate: {
            validator: check.checkTitle,
            message: 'Titolo non corretto'
        }
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Autore questionario non specificato']
    },
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: [true, 'Domande questionario mancanti']
    }],
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag',
        required: [true, 'Argomenti questionario mancanti']
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
        delete ret.__v;
        return ret;
    }
};

var Questionnaire = mongoose.model('Questionnaire', QuestionnaireSchema);
module.exports = Questionnaire;