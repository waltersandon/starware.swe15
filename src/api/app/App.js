var express = require('express');
var http = require('http');
var mongoose = require('mongoose');

/**
 * 
 * @constructor
 */
function App(config) {
    this.app = express();
    this.configuration = config;
}

/*
 * @details metodo che configura i parametri del server sulla base dell'oggetto di configurazione
 */
App.prototype.config = function() {
	//app.use(cors());
    this.app.set('port', this.configuration.serverPort);
    this.app.set('ip', this.configuration.serverHost);
    return this.app;
};

/*
 * @details metodo che avvia il server. Non ritorna il controllo fino a che il server è in funzione
 */
App.prototype.start = function(){
    mongoose.connection.on('error', (function(err) {
        if (!this.configuration.test) console.error("Error: " + err);
    }).bind(this));
    mongoose.connect(this.configuration.dbUri);
    var port = this.app.get('port');
    var ip = this.app.get('ip');
    this.app.listen(port, ip, (function () {
        if (!this.configuration.test) 
            console.log('%s: Node server started on %s:%d ', Date(Date.now()), ip, port);
    }).bind(this));
};

module.exports = App;