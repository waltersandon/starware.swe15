/**
 * @file QuestionnaireCheck.js
 * @date 21/04/2016
 * @version 2.0
 * @author Alessio Vitella
 *
 */

/*!
 * @class   QuestionnaireCheck
 * @details Classe contenente tutte le funzioni di controllo della validità dei
 *          campi del model Questionnaire
 * @par Usage 
 * Viene utilizzata dai service per effettuare controlli sul model User
 */
var Questionnaire = require('./../data/Questionnaire');

/*
 * @constructor
 */
function QuestionnaireCheck() {}

/*
 * @details metodo che controlla che la lista/array di domande passate non sia vuota e che non contenga domande duplicate
 * @param[in]  questions l'elenco delle domande del questionario
 */
QuestionnaireCheck.prototype.checkQuestions = function(questions){
    //non vuota
    if (typeof questions === 'undefined' || questions.length === 0){
        return false;
    }
    //non duplicati
    this.sorted_arr = questions.slice().sort();
    for (this.i = 0; this.i < questions.length - 1; this.i++) {
        if (this.sorted_arr[this.i + 1] == this.sorted_arr[this.i]) {
            return false;
        }
    }
    return true;
};

/*!
 * @details metodo che controlla che il titolo del questionario non sia vuoto
 * @param[in]  title il titolo del questionario da controllare
 */
QuestionnaireCheck.prototype.checkTitle = function(title){
    return (title.length !== 0);
};

/*
 * @details metodo che controlla che la lista/array di argomenti passati non sia vuota
 * @param[in]  tags elenco degli argomenti	
 */
QuestionnaireCheck.prototype.checkTags = function(tags){
    //non vuota
    if (typeof tags === 'undefined' || tags.length === 0){
        return false;
    }
    //non duplicati
    this.sorted_arr = tags.slice().sort();
    for (this.i = 0; this.i < tags.length - 1; this.i++) {
        if (this.sorted_arr[this.i + 1] == this.sorted_arr[this.i]) {
            return false;
        }
    }
    return true;
};

module.exports = QuestionnaireCheck;