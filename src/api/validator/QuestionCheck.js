
var QML = require('./../../static/js/util/SharedQML');

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
        if (this.sorted_arr[this.i + 1] === this.sorted_arr[this.i]) {
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
    var qt = new QML();
    return qt.parse(qml).status;

};

module.exports = QuestionCheck;