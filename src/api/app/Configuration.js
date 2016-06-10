/**
 * @file Configuration.js
 * @date 19/04/2016
 * @version 2.0
 * @author Nicola De Cao
 *
 */


/*
 * Classe che rappresenta i parametri di configurazione del server
 * @constructor
 */
function Configuration(options) {

    //!variabile d'ambiente che informa se l'applicazione deve essere eseguita in modalità development o production
    this.environment = process.env.NODE_ENV;

    //!campo dati che identifica l'Indirizzo IP dell'host
    this.serverHost = process.env.OPENSHIFT_NODEJS_IP || 'localhost';

    //!campo dati che identifica la porta su cui il server deve mettersi in ascolto
    this.serverPort = process.env.OPENSHIFT_NODEJS_PORT || 3000;

    //!campo dati che identifica il percorso della cartella che il server utilizza per fornire file statici
    this.serverStaticPath = "../../static";

    //!campo dati che identifica l'host del database
    this.dbHost = process.env.OPENSHIFT_MONGODB_DB_HOST || 'localhost';

    //!campo dati che identifica la porta su cui il server di mongodb deve mettersi in ascolto
    this.dbPort = process.env.OPENSHIFT_MONGODB_DB_PORT || 27017;

    //!campo dati che identifica il nome del database dell'applicazione
    this.dbName = (options && options.test)
        ? 'quizzipedia-test'
        : 'quizzipedia';

    this.test = (options && options.test);

    //!campo dati che identifica l'Username per connettersi al database
    this.dbUser = process.env.OPENSHIFT_MONGODB_DB_USERNAME || null;

    //!campo dati che identifica la password per connettersi al database
    this.dbPassword = process.env.OPENSHIFT_MONGODB_DB_PASSWORD || null;

    //!campo dati che identifica l'Uri di connessione al database
    this.dbUri = (this.dbPassword)
        ? 'mongodb://' + this.dbUser + ":" + this.dbPassword + "@" +
        this.dbHost + ':' + this.dbPort + '/' + this.dbName
        :'mongodb://' + this.dbHost + ':' + this.dbPort + '/' + this.dbName;


}

module.exports = Configuration;