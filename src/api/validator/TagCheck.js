
/*
 * Classe che contiene tutte le funzioni di controllo della validità dei campi del model Tag
 * @constructor
 */
function TagCheck() {}

/*
 * @details metodo che controlla che il nome dell'argomento non sia vuoto
 * @param[in]  name il nome dell'argomento da controllare
 */
TagCheck.prototype.checkName = function(name){
    return (name.length !== 0);
};

module.exports = TagCheck;