/**
 * Created by alessio on 26/03/16.
 */


/**
 * Classe che si occupa di smistare la richiesta in base all’URI ricevuto e ad invocare l’opportuno servizio
 * @constructor
 */
function RoleService() {

    /**
     * Metodo che invoca il servizio per eliminare un amministratore
     * @param req - Questo oggetto rappresenta la richiesta di tipo Request arrivata al server che il metodo deve gestire
     * @param res - Questo oggetto rappresenta la risposta che il server dovrà inviare al termine ell’elaborazione
     * @param next - Questo parametro rappresenta la callback che il metodo dovrà chiamare al termine dell’elaborazione
     * per passare il controllo ai successivi middleware.
     */
    this.getRoles = function(req,res,next){
        console.log("getRoles");
    };

    /**
     * Metodo che invoca il servizio per ottenere la lista dei ruoli o il ruolo di un utente specificato
     * @param req - Questo oggetto rappresenta la richiesta di tipo Request arrivata al server che il metodo deve gestire
     * @param res - Questo oggetto rappresenta la risposta che il server dovrà inviare al termine ell’elaborazione
     * @param next - Questo parametro rappresenta la callback che il metodo dovrà chiamare al termine dell’elaborazione
     * per passare il controllo ai successivi middleware.
     */
    this.getRole = function(req,res,next){
        console.log("getRole");
    };
}


module.exports = RoleService;

