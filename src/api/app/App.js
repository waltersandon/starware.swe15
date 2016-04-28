/**
 * Created by alessio on 19/03/16.
 */

var Configuration = require('./Configuration');
var express = require('express');
var http = require('http');
var mongoose = require('mongoose');
//var cors = require('cors');

/**
 * 
 * @constructor
 */
function App() {

    var config = new Configuration();
    var app = express();

    /**
     * Metodo che configura i parametri del server sulla base dell'oggetto di configurazione
     * @param config - Oggetto per la configurazione del server
     */
    this.config = function(){
		//app.use(cors());
        app.set('port', config.serverPort);
        app.set('ip', config.serverHost);
        return app;
    };

    /**
     * Metodo che fa partire il server, non ritorna il controllo finché il server è in funzione
     */
    this.start = function(){
        mongoose.connection.on('error', function(err) {
            console.error("Error: " + err);
        });
        mongoose.connect(config.dbUri);
        var port = app.get('port');
        var ip = app.get('ip');
        app.listen(port, ip, function () {
            console.log('%s: Node server started on %s:%d ', Date(Date.now()), ip, port);
        });
    }
}

module.exports = App;