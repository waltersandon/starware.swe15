/**
 * @file Authorization.js
 * @date 22/04/2016
 * @version 2.0
 * @author Nicola De Cao
 *
 */
var User = require('./../data/User');
var Role = require('./../data/Role');

/*!
 * @class   Authorization
 * @details Classe che si occupa dell’autorizzazione delle richieste
 * @par Usage
 * Viene utilizzata per verificare i permessi dell'utente per ogni richiesta
 */
function Authorization() {}

/*!
 * @details metodo che verifica che l’utente autenticato sia almeno di
 *          ruolo specificato, richiamando il successivo middleware in caso
 *          affermativo, rispondendo con un errore altrimenti
 * @param[in]  name il nome del ruolo minimo richiesto
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