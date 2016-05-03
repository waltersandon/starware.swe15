var User = require('./../data/User');

/**
 * Classe che contiene tutte le funzioni di controllo della validità dei campi del model User
 * @constructor
 */
function UserCheck() {}

UserCheck.prototype.checkFullName = function(fullName){
    return (fullName.length >= 2);
};

UserCheck.prototype.checkPassword = function(psw){
    return (psw.length >= 6);
};

UserCheck.prototype.checkUserName = function(userName){
    return (userName.length >= 6);
};

module.exports = UserCheck;