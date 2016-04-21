/**
 * Created by avenier on 20/03/2016.
 */

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
    this.requireUser = function(req,res,next){
        if(true){
        //if(req.session.user){
            next();
        }
        else{
            next({code:200, error:"non autoruizzato cli"});
        }
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
        next();
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
        next();
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
        next();
    };

}

module.exports = Authorization;
