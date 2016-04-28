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
    this.handler = function(err, req, res, next) {
    	if (typeof err === 'number') {
        	console.error("Error code: ", err);
            const messages = {
                404: 'Risorsa non trovata',
                401: 'Accesso non consentito',
                400: 'Errore di validazione'
            };
        	res.status(err).json({
                message: messages[err] || 'Errore sconosciuto'
            });
        } else {
        	console.error("Uknown error: ", err);
        	res.status(500).json({
                message: 'Errore di sistema'
            });
        }
    };

}

module.exports = ErrorHandler;