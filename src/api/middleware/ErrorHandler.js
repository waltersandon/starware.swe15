/**
 * @file ErrorHandler.js
 * @date 22/04/2016
 * @version 2.0
 * @author Nicola De Cao
 *
 */
/*!
 * @class   ErrorHandler
 * @details Classe che gestisce gli errori generati nei controllers restituendo
 *          al client la risposta contenente il codice dell'errore verificatosi
 * @par Usage
 * Questo middleware viene utilizzato per ultimo nella catena di gestione delle
 * richieste di Express, in modo da gestire tutti gli errori generati
 * precedentemente
 */
function ErrorHandler() {}

/*!
 * @details metodo che gestisce l'errore generato dalla richiesta e da la
 *          relativa risposta con il codice dell'errore al client
 * @param[in]  req  questo oggetto rappresenta la richiesta arrivata al
 *                   server che il metodo deve gestire
 * @param[in]  res  questo oggetto rappresenta la risposta che il server
 *                   dovrà inviare al termine dell'elaborazione
 * @param[in]  next questo parametro rappresenta la callback che il metodo
 *                   dovrà chiamare al termine dell’elaborazione
 * @param[in]  err  questo parametro rappresenta l'oggetto  dell'errore
 */
ErrorHandler.prototype.handler = function(err, req, res, next) {
	if (typeof err === 'number') {
        const messages = {
            404: 'Risorsa non trovata',
            401: 'Accesso non consentito',
            400: 'Errore di validazione'
        };
    	res.status(err).json({
            message: messages[err] || 'Errore sconosciuto'
        });
    } else if (err.name == 'MongoError' && err.code === 11000) {
        // Duplicates error
        var regex = /([a-zA-Z0-9]+)_[0-9]+ dup key/;
        var key = err.message.match(regex)[1];
        res.status(400).json({
            message: "Attributo '" + key + "' con tale valore già esistente"
        });
    } else if (err.message && err.type) {
        res.status(err.type).json({
            message: err.message
        });
    } else if(err.name === "ValidationError" || err.name === 'MongoError') {
        this.mex = "";
        for(var e in err.errors){
            this.mex = this.mex + err.errors[e].message + ". ";
        }
        this.mex = this.mex.substr(0, this.mex.length -1);
        res.status(400).json({
            message: this.mex
        });
    }
    else {
        console.log(err);
    	res.status(500).json({
            message: 'Errore di sistema'
        });
    }
};

module.exports = ErrorHandler;