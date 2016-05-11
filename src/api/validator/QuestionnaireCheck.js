var Questionnaire = require('./../data/Questionnaire');

/**
 * Classe che contiene tutte le funzioni di controllo della validità dei campi del model Questionnaire
 * @constructor
 */
function QuestionnaireCheck() {}

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

//controlla che il titolo del questionario non sia vuoto
QuestionnaireCheck.prototype.checkTitle = function(title){
    return (title.length !== 0);
};

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