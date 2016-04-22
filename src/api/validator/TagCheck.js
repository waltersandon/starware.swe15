
/**
 * Classe che contiene tutte le funzioni di controllo della validità dei campi del model Tag
 * @constructor
 */
function TagCheck() {

    this.checkName = function(n){
        if(n.length == 0) {
            return false;
        }
        else {
            return true;
        }
    };

}


module.exports = TagCheck;

