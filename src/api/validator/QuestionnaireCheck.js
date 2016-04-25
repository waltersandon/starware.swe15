
/**
 * Classe che contiene tutte le funzioni di controllo della validità dei campi del model Questionnaire
 * @constructor
 */
function QuestionnaireCheck() {

    //controlla che l'array delle domande di un questionario non sia vuoto
    this.checkQuestions = function(questionArray){
        return (typeof questionArray !== 'undefined' && questionArray.length > 0);
    };
    
    //controlla che il titolo del questionario non sia vuoto
    this.checkTitle = function(title){
        return (title.length !== 0);
    };

    this.checkTags = function(tagsArray){
        return (typeof tagsArray !== 'undefined' && tagsArray.length > 0);
    };
}


module.exports = QuestionnaireCheck;

