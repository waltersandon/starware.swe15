/**
 * Created by alessio on 26/03/16.
 */


/**
 * Classe che si occupa di smistare la richiesta in base all’URI ricevuto e ad invocare l’opportuno servizio
 * @constructor
 */
function UserService() {

    /**
     * Metodo che invoca il servizio per ritornare la lista degli utenti
     * @param req - Questo oggetto rappresenta la richiesta di tipo Request arrivata al server che il metodo deve gestire
     * @param res - Questo oggetto rappresenta la risposta che il server dovrà inviare al termine ell’elaborazione
     * @param next - Questo parametro rappresenta la callback che il metodo dovrà chiamare al termine dell’elaborazione
     * per passare il controllo ai successivi middleware.
     */
    this.getUsers = function(req,res,next){
        console.log("getUsers");
    };

    /**
     * Metodo che invoca il servizio per ritornare un utente specificato dalla variabile id
     * @param req - Questo oggetto rappresenta la richiesta di tipo Request arrivata al server che il metodo deve gestire
     * @param res - Questo oggetto rappresenta la risposta che il server dovrà inviare al termine ell’elaborazione
     * @param next - Questo parametro rappresenta la callback che il metodo dovrà chiamare al termine dell’elaborazione
     * per passare il controllo ai successivi middleware.
     */
    this.getUser = function(req,res,next){
        console.log("getUser");
        res.write("ciao");
        res.end();
    };

    /**
     * Metodo che invoca il servizio per ritornare l'utente loggato
     * @param req - Questo oggetto rappresenta la richiesta di tipo Request arrivata al server che il metodo deve gestire
     * @param res - Questo oggetto rappresenta la risposta che il server dovrà inviare al termine ell’elaborazione
     * @param next - Questo parametro rappresenta la callback che il metodo dovrà chiamare al termine dell’elaborazione
     * per passare il controllo ai successivi middleware.
     */
    this.getUserMe = function(req,res,next){
        console.log("getUser");
        res.write("ciao");
        res.end();
    };

    /**
     * Metodo che invoca il servizio per aggiungere un nuovo utente
     * @param req - Questo oggetto rappresenta la richiesta di tipo Request arrivata al server che il metodo deve gestire
     * @param res - Questo oggetto rappresenta la risposta che il server dovrà inviare al termine ell’elaborazione
     * @param next - Questo parametro rappresenta la callback che il metodo dovrà chiamare al termine dell’elaborazione
     * per passare il controllo ai successivi middleware.
     */
    this.createUser = function(req,res,next){
        console.log("createUser");
    };

    /**
     * Metodo che invoca il servizio per modificare i dati dell'utente
     * @param req - Questo oggetto rappresenta la richiesta di tipo Request arrivata al server che il metodo deve gestire
     * @param res - Questo oggetto rappresenta la risposta che il server dovrà inviare al termine ell’elaborazione
     * @param next - Questo parametro rappresenta la callback che il metodo dovrà chiamare al termine dell’elaborazione
     * per passare il controllo ai successivi middleware.
     *
     */
    this.modifyUser = function(req,res,next){
        console.log("modifyUser");
        if(req.body.fullName || req.body.userName){

        }
        else if(req.body.oldPassword || req.body.newPassword){

        }
    };

    /**
     * Metodo che invoca il servizio per eliminare un utente
     * @param req - Questo oggetto rappresenta la richiesta di tipo Request arrivata al server che il metodo deve gestire
     * @param res - Questo oggetto rappresenta la risposta che il server dovrà inviare al termine ell’elaborazione
     * @param next - Questo parametro rappresenta la callback che il metodo dovrà chiamare al termine dell’elaborazione
     * per passare il controllo ai successivi middleware.
     */
    this.deleteUser = function(req,res,next){
        console.log("deleteUser");
    };

    /**
     * Metodo che invoca il servizio per cambiare il ruolo di un utente
     * @param req - Questo oggetto rappresenta la richiesta di tipo Request arrivata al server che il metodo deve gestire
     * @param res - Questo oggetto rappresenta la risposta che il server dovrà inviare al termine ell’elaborazione
     * @param next - Questo parametro rappresenta la callback che il metodo dovrà chiamare al termine dell’elaborazione
     * per passare il controllo ai successivi middleware.
     */
    this.changeRole = function(req,res,next){
        console.log("change role");
    };


}


module.exports = UserService;

