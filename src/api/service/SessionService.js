var User = require('./../data/User');

/**
 * Classe che si occupa di smistare la richiesta in base all’URI ricevuto e ad invocare l’opportuno servizio
 * @constructor
 */
function SessionService() {

    /**
     * Metodo che invoca il servizio per creare una nuova sessione associata all'utente
     * @param req - Questo oggetto rappresenta la richiesta di tipo Request arrivata al server che il metodo deve gestire
     * @param res - Questo oggetto rappresenta la risposta che il server dovrà inviare al termine ell’elaborazione
     * @param next - Questo parametro rappresenta la callback che il metodo dovrà chiamare al termine dell’elaborazione
     * per passare il controllo ai successivi middleware.
     */
    this.login = function(req, res, next){
        var userName = req.body.userName;
        var password = req.body.password;
        User.findOne({ userName: userName }).exec(function(err, user) {
            if (err) next(err);
            if (user && user.isActive && new User(user).hasPassword(password)) {
                req.session.user = user;
                res.json(user);
            }
            else next(401);
        });
    };

    /**
     * Metodo che invoca il servizio per eliminare la sessione dell'utente
     * @param req - Questo oggetto rappresenta la richiesta di tipo Request arrivata al server che il metodo deve gestire
     * @param res - Questo oggetto rappresenta la risposta che il server dovrà inviare al termine ell’elaborazione
     * @param next - Questo parametro rappresenta la callback che il metodo dovrà chiamare al termine dell’elaborazione
     * per passare il controllo ai successivi middleware.
     */
    this.logout = function(req,res,next){
        req.session.user = null;
    };

}

module.exports = SessionService;