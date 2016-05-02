var User = require('./../data/User');
var Role = require('./../data/Role');

/**
 * Classe utilizzata per verificare i dati inseriti dall’utente e concedere all'utente i relativi permessi
 * @constructor
 */
function Authorization() {}

/**
 * Metodo che ritorna il middleware che verifica che l’utente sia autenticato 
 * richiamando il successivo middleware in caso affermativo, rispondendo con 
 * un errore altrimenti
 * @param name - Nome del ruolo richiesto
 */
Authorization.prototype.requireRole = function(name) {
    return function(req, res, next) {
        if (!req.session.user) return next(401);
        Role.findOne({ name: name }, function(err, targetRole) {
            User.findById(req.session.user._id).populate('role').exec(function(err, user) {
                if (user.role.greaterThan(targetRole) || user.role.equalTo(targetRole))
                    next();
                else next(401);
            });
        });
    };
};

module.exports = Authorization;