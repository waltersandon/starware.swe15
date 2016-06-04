/**
 * Classe che contiene tutte le funzioni di controllo della validità dei campi del model Question
 * @constructor
 */
function AnswerCheck() {}

/**
 * Funzione che controlla se il punteggio passato è compreso tra 0 e 1 compresi
 * @param score - Punteggio da controllare
 * @returns {boolean}
 */
AnswerCheck.prototype.checkScore = function(score) {
    return (score >= 0 && score <= 1);
};

module.exports = AnswerCheck;