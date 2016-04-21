/**
 * Created by alessio on 26/03/16.
 */


/**
 * Classe che si occupa di smistare la richiesta in base all’URI ricevuto e ad invocare l’opportuno servizio
 * @constructor
 */
function TagService() {

    /**
     * Metodo che invoca il servizio per ritornare la lista degli argomenti
     * @param req - Questo oggetto rappresenta la richiesta di tipo Request arrivata al server che il metodo deve gestire
     * @param res - Questo oggetto rappresenta la risposta che il server dovrà inviare al termine ell’elaborazione
     * @param next - Questo parametro rappresenta la callback che il metodo dovrà chiamare al termine dell’elaborazione
     * per passare il controllo ai successivi middleware.
     */
    this.getTags = function(req,res,next){
        console.log("getTags");
    };

    /**
     * Metodo che invoca il servizio per ritornare un argomento specifico
     * @param req - Questo oggetto rappresenta la richiesta di tipo Request arrivata al server che il metodo deve gestire
     * @param res - Questo oggetto rappresenta la risposta che il server dovrà inviare al termine ell’elaborazione
     * @param next - Questo parametro rappresenta la callback che il metodo dovrà chiamare al termine dell’elaborazione
     * per passare il controllo ai successivi middleware.
     */
    this.getTag = function(req,res,next){
        console.log("getTag");
    };

    /**
     * Metodo che invoca il servizio per creare un nuovo argomento
     * @param req - Questo oggetto rappresenta la richiesta di tipo Request arrivata al server che il metodo deve gestire
     * @param res - Questo oggetto rappresenta la risposta che il server dovrà inviare al termine ell’elaborazione
     * @param next - Questo parametro rappresenta la callback che il metodo dovrà chiamare al termine dell’elaborazione
     * per passare il controllo ai successivi middleware.
     */
    this.createTag = function(req,res,next){
        console.log("createSubject");
    };

    /**
     * Metodo che invoca il servizio per modificare un argomento specifico
     * @param req - Questo oggetto rappresenta la richiesta di tipo Request arrivata al server che il metodo deve gestire
     * @param res - Questo oggetto rappresenta la risposta che il server dovrà inviare al termine ell’elaborazione
     * @param next - Questo parametro rappresenta la callback che il metodo dovrà chiamare al termine dell’elaborazione
     * per passare il controllo ai successivi middleware.
     */
    this.modifyTag = function(req,res,next){
        console.log("modifySubject");
    };

    /**
     * Metodo che invoca il servizio per eliminare un argomento specifico
     * @param req - Questo oggetto rappresenta la richiesta di tipo Request arrivata al server che il metodo deve gestire
     * @param res - Questo oggetto rappresenta la risposta che il server dovrà inviare al termine ell’elaborazione
     * @param next - Questo parametro rappresenta la callback che il metodo dovrà chiamare al termine dell’elaborazione
     * per passare il controllo ai successivi middleware.
     */
    this.deleteTag = function(req,res,next){
        console.log("deleteSubject");
    };

}


module.exports = TagService;

