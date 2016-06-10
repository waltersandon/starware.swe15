/**
 * @file SessionService.js
 * @date 22/04/2016
 * @version 2.0
 * @author Thomas Pigarelli
 *
 */
/*!
 * @class   SessionService
 * @details Classe che si occupa della gestione della sessione dell'utente,
 *          sfruttando la classe server::data::User per accedere ai dati
 *          persistenti nel database
 * @par Usage
 * Viene utilizzata per gestire il login e logout dell'utente
 */

var User = require('./../data/User');

/*!
 * @details costruttore della classe
 */
function SessionService() {}

/*!
 * @details metodo che crea una sessione con una volta che l'utente effettua
 *          l'accesso all'applicazione
 * @param[in]  req  questo oggetto rappresenta la richiesta arrivata al
 *                   server che il metodo deve gestire
 * @param[in]  res  questo oggetto rappresenta la risposta che il server
 *                   dovrà inviare al termine dell'elaborazione
 * @param[in]  next questo parametro rappresenta la callback che il metodo
 *                   dovrà chiamare al termine dell’elaborazione
 */
SessionService.prototype.new = function(req, res, next){
    var userName = req.body.userName;
    var password = req.body.password;
    if(userName && password){
    User.findOne({ userName: userName }).exec(function(err, user) {
        if (err) next(400);
        else if (user && user.isActive && user.hasPassword(password)) {
            req.session.user = user;
            res.send();
        }
        else {next(401);}
    });
    }
    else{
        next(400);
    }
};

/*!
 * @details metodo che elimina la sessione dell'utente dal database
 * @param[in]  req  questo oggetto rappresenta la richiesta arrivata al
 *                   server che il metodo deve gestire
 * @param[in]  res  questo oggetto rappresenta la risposta che il server
 *                   dovrà inviare al termine dell'elaborazione
 * @param[in]  next questo parametro rappresenta la callback che il metodo
 *                   dovrà chiamare al termine dell’elaborazione
 */
SessionService.prototype.delete = function(req,res,next){
    req.session.user = null;
    res.send();
};

module.exports = SessionService;