
/**
 * Classe che contiene tutte le funzioni di controllo della validità dei campi del model Questionnaire
 * @constructor
 */
function QuestionnaireCheck() {

    /*Da controllare*/
    this.checkQuestions = function(questionArray){
        if (typeof questionArray !== 'undefined' && questionArray.length > 0) {
            return true;
        }else{
            return false;
        }
    };

    /*Da controllare*/
    this.checkTitle = function(n){
        if(n.length == 0) {
            return false;
        }
        else {
            return true;
        }
    };

}


module.exports = QuestionnaireCheck;

