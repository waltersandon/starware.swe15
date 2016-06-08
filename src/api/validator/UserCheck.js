var User = require('./../data/User');

/**
 * Classe che contiene tutte le funzioni di controllo della validità dei campi del model User
 * @constructor
 */
function UserCheck() {}

 /*
  * metodo che controlla che il nome completo passato contenga almeno 2 caratteri
  * @param[in]  fullName il nome completo da controllare
  */

UserCheck.prototype.checkFullName = function(fullName){
    return (fullName.length >= 2);
};

/*!
 * metodo che controlla che la password passata contenga almeno 6 caratteri
 * @param[in]  psw la password, ovviamente in chiaro (non l'hash), da controllare
 */
UserCheck.prototype.checkPassword = function(psw){
    return (psw.length >= 6);
};

/*
 * @details metodo che controlla che l'username passato contenga almeno 6 caratteri
 * @param[in]  userName l'username da controllare
 */
UserCheck.prototype.checkUserName = function(userName){
    return (userName.length >= 6);
};

module.exports = UserCheck;