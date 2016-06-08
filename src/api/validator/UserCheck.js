/*!
 * @class   UserCheck
 * @details Classe contenente tutte le funzioni di controllo della validità dei
 *          campi del model User
 * @par Usage 
 * Viene utilizzata dai service per effettuare controlli sul model User
 */
var User = require('./../data/User');

/*
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