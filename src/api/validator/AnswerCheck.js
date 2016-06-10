/**
 * @file AnswerCheck.js
 * @date 19/04/2016
 * @version 2.0
 * @author Andrea Venier
 *
 */

/**
 * Classe che contiene tutte le funzioni di controllo della validità dei campi del model Question
 * @constructor
 */
function AnswerCheck() {}

/*
 * @details metodo che controlla se il punteggio passato sia compreso tra 0 e 1 compresi
 * @param[in]  score Punteggio da controllare della domanda
 */
AnswerCheck.prototype.checkScore = function(score) {
    return (score >= 0 && score <= 1);
};

module.exports = AnswerCheck;