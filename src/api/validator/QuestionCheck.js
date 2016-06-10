/**
 * @file QuestionCheck.js
 * @date 22/04/2016
 * @version 2.0
 * @author Thomas Pigarelli
 *
 */

/*!
 * @class   QuestionCheck
 * @details Classe contenente tutte le funzioni di controllo della validità dei
 *          campi del model Question
 * @par Usage 
 * Viene utilizzata dai service per effettuare controlli sul model Question
 */
var QML = require('./../../static/js/util/SharedQML');

/*
 * @constructor
 */
function QuestionCheck() {}

/*!
 * @details metodo che controlla che la lista/array di argomenti passati non sia vuota
 * @param[in]  tags elenco degli argomenti
 */
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

/* @details metodo che controlla che la stringa di QML (generalmente quella dell'attributo body del model Question) sia QML valido
 * @param[in]  qml la stringa in formato QML da controllare
 */
QuestionCheck.prototype.checkQML = function(qml){
    var qt = new QML();
    var result = qt.parse(qml);
    return result.status;
};

module.exports = QuestionCheck;