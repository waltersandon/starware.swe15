
/**
 * Classe che contiene tutte le funzioni di controllo della validità dei campi del model Questionnaire
 * @constructor
 */
function QuestionnaireCheck() {

    //controlla che l'array delle domande di un questionario non sia vuoto
    this.checkQuestions = function(questionArray){
        //non vuota
        if (typeof questionArray === 'undefined' || questionArray.length == 0){
            return false;
        }
        //non duplicati
        this.sorted_arr = questionArray.slice().sort();
        for (this.i = 0; this.i < questionArray.length - 1; this.i++) {
            if (this.sorted_arr[this.i + 1] == this.sorted_arr[this.i]) {
                return false;
            }
        }
        return true;
    };
    
    //controlla che il titolo del questionario non sia vuoto
    this.checkTitle = function(title){
        return (title.length !== 0);
    };

    this.checkTags = function(tagsArray){
        //non vuota
        if (typeof tagsArray === 'undefined' || tagsArray.length == 0){
            return false;
        }
        //non duplicati
        this.sorted_arr = tagsArray.slice().sort();
        for (this.i = 0; this.i < tagsArray.length - 1; this.i++) {
            if (this.sorted_arr[this.i + 1] == this.sorted_arr[this.i]) {
                return false;
            }
        }
        return true;
    };
}


module.exports = QuestionnaireCheck;

