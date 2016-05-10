/**
 * Classe che contiene tutte le funzioni di controllo della validità dei campi del model Question
 * @constructor
 */
function QuestionCheck() {}

QuestionCheck.prototype.checkTags = function(tags){

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

/**
 * Funzione che controlla se il QML è valido
 * @param qml - Stringa qml da parsare
 * @returns {boolean}
 */
QuestionCheck.prototype.checkQML = function(qml){

    this.checkMultipleChoice = function(qml) {
        var answers = [];
        var text = "";
        var rightAnswer = 0;
        var wrongAnswer = 0;
        var ansflag = false;
        qml.split('\n').map(function(row) {
            if (row == '[answers]') {
                ansflag = true;
            }
            else if (row.startsWith('[]') && ansflag) {
                answers.push({
                    text: row.replace("[]", ""),
                    correct: false
                });
                wrongAnswer++;
            }
            else if (row.startsWith('[*]') && ansflag) {
                answers.push({
                    text: row.replace("[*]", ""),
                    correct: true
                });
                rightAnswer++;
            }
            else if (!ansflag) {
                text += row;
            }
        });
        text.replace("\\[","[");
        text.replace("\\]","]");
        if (rightAnswer == 1 && wrongAnswer > 0){
            return true;
        }
        return false;
    };

    if(qml.charAt(0) == "<"){
        this.type = qml.substring(1, qml.indexOf('>'));
        qml = qml.substring(qml.indexOf('>') + 1);
        if(this.type == "TF F" || this.type == "TF T"){
            return true;
        }
        else if(this.type == "MultipleChoice"){
            return this.checkMultipleChoice(qml);
        }
    }
    return false;

};

module.exports = QuestionCheck;