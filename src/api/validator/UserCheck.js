var User = require('./../data/User');

/**
 * Classe che contiene tutte le funzioni di controllo della validità dei campi del model User
 * @constructor
 */
function UserCheck() {

    this.checkFullName = function(fullName){
        return (fullName.length >= 2);
    };

    this.checkPassword = function(psw){
        return (psw.length >= 8);
    };

    this.checkUserName = function(userName){
        return (userName.length >= 6);
    };

}


module.exports = UserCheck;

