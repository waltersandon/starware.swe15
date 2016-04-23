/**
 * Classe utilizzata per gestire tutti gli errori che vengono generati
 * @constructor
 */
function ErrorHandler() {

    /**
     * Metodo che spedisce l'errore ricevuto al client
     * @param err - Questo oggetto rappresenta l’errore che il metodo deve gestire
     * @param req - Questo oggetto rappresenta la richiesta di tipo Request arrivata al server che il metodo deve gestire
     * @param res - Questo oggetto rappresenta la risposta che il server dovrà inviare al termine ell’elaborazione
     * @param next - Questo parametro rappresenta la callback che il metodo dovrà chiamare al termine dell’elaborazione
     * per passare il controllo ai successivi middleware.
     */
    this.handler = function(err,req,res,next){
        //da discriminare se è un errore server o client
        
        res.send(err);
    };

}

module.exports = ErrorHandler;