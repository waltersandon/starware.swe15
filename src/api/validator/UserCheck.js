var User = require('./../data/User');

/**
 * Classe che contiene tutte le funzioni di controllo della validità dei campi del model User
 * @constructor
 */
function UserCheck() {

    this.checkFullName = function(fn){
        if(fn.length < 2) {
            return false;
        }
        else {
            return true;
        }
    };

    this.checkPassword = function(psw){
        if(psw.length < 8) {
            return false;
        }
        else {
            return true;
        }
    };

    this.checkUserName = function(un){
        if(un.length < 6) {
            return false;
        }
        else {
            return true;
        }
    };

    this.checkUniqueUserName = function(un){
        //var userOut;
        User.find({ userName: un }, function(err, user) {
            if (err) {
                console.log('Signup error');
                return true;
            }
            if (user.length!=0) {
                console.log('Username already exists, username: ' + user);
                return false;
            }

        });
        //while (typeof(userOut) == "undefined");
        //return (!userOut);



    };

}


module.exports = UserCheck;

