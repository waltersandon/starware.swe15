
/**
 * Classe che contiene tutte le funzioni di controllo della validità dei campi del model Tag
 * @constructor
 */
function TagCheck() {}

TagCheck.prototype.checkName = function(name){
    return (name.length !== 0);
};

module.exports = TagCheck;