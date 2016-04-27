var User = require('./../data/User');

/**
 * Classe utilizzata per verificare i dati inseriti dall’utente e concedere all'utente i relativi permessi
 * @constructor
 */
function Authorization() {

    /**
     * Metodo che verifica che l’utente sia autenticato richiamando il successivo
     * middleware in caso affermativo, rispondendo con un errore altrimenti
     * @param req - Questo oggetto rappresenta la richiesta di tipo Request arrivata al server che il metodo deve gestire
     * @param res - Questo oggetto rappresenta la risposta che il server dovrà inviare al termine ell’elaborazione
     * @param next - Questo parametro rappresenta la callback che il metodo dovrà chiamare al termine dell’elaborazione
     * per passare il controllo ai successivi middleware.
     */
    this.requireUser = function(req, res, next) {
        if (!req.session.user) return next(401);
        User.findById(req.session.user._id).populate('role').exec(function(err, user) {
            if (user && ['student', 'teacher', 'admin', 'superadmin'].indexOf(user.role.name) >= 0) next();
            else next(401);
        });
    };

    /**
     * Metodo che verifica che l’utente autenticato sia almeno di tipo docente richiamando il successivo
     * middleware in caso affermativo, rispondendo con un errore altrimenti
     * @param req - Questo oggetto rappresenta la richiesta di tipo Request arrivata al server che il metodo deve gestire
     * @param res - Questo oggetto rappresenta la risposta che il server dovrà inviare al termine ell’elaborazione
     * @param next - Questo parametro rappresenta la callback che il metodo dovrà chiamare al termine dell’elaborazione
     * per passare il controllo ai successivi middleware.
     */
    this.requireTeacher = function(req,res,next){
        if (!req.session.user) return next(401);
        User.findById(req.session.user._id).populate('role').exec(function(err, user) {
            if (user && ['teacher', 'admin', 'superadmin'].indexOf(user.role.name) >= 0) next();
            else next(401);
        });
    };

    /**
     * Metodo che verifica che l’utente autenticato sia almeno di tipo amministratore richiamando il successivo
     * middleware in caso affermativo, rispondendo con un errore altrimenti
     * @param req - Questo oggetto rappresenta la richiesta di tipo Request arrivata al server che il metodo deve gestire
     * @param res - Questo oggetto rappresenta la risposta che il server dovrà inviare al termine ell’elaborazione
     * @param next - Questo parametro rappresenta la callback che il metodo dovrà chiamare al termine dell’elaborazione
     * per passare il controllo ai successivi middleware.
     */
    this.requireAdmin = function(req,res,next){
        if (!req.session.user) return next(401);
        User.findById(req.session.user._id).populate('role').exec(function(err, user) {
            if (user && ['admin', 'superadmin'].indexOf(user.role.name) >= 0) next();
            else next(401);
        });
    };

    /**
     * Metodo che verifica che l’utente autenticato sia almeno di tipo proprietario richiamando il successivo
     * middleware in caso affermativo, rispondendo con un errore altrimenti
     * @param req - Questo oggetto rappresenta la richiesta di tipo Request arrivata al server che il metodo deve gestire
     * @param res - Questo oggetto rappresenta la risposta che il server dovrà inviare al termine ell’elaborazione
     * @param next - Questo parametro rappresenta la callback che il metodo dovrà chiamare al termine dell’elaborazione
     * per passare il controllo ai successivi middleware.
     */
    this.requireSuperAdmin = function(req,res,next){
        if (!req.session.user) return next(401);
        User.findById(req.session.user._id).populate('role').exec(function(err, user) {
            if (user && ['superadmin'].indexOf(user.role.name) >= 0) next();
            else next(401);
        });
    };

}

module.exports = Authorization;
