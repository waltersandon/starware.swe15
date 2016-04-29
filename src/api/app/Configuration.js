/**
 * Created by alessio on 19/03/16.
 */

/**
 * Classe che rappresenta i parametri di configurazione del server
 * @constructor
 */
function Configuration(options) {

    /**
     * Variabile d'ambiente che informa se l'applicazione deve essere
     * eseguita in modalità development o production
     * @type {string}
     */
    this.environment = process.env.NODE_ENV;

    /**
     * Indirizzo ip dell'host
     * @type {string}
     */
    this.serverHost = process.env.OPENSHIFT_NODEJS_IP || 'localhost';

    /**
     * Porta su cui il server deve mettersi in ascolto
     * @type {number}
     */
    this.serverPort = process.env.OPENSHIFT_NODEJS_PORT || 3000;

    /**
     * Percorso della cartella che il server deve utilizzare per fornire file statici
     * @type {string}
     */
    this.serverStaticPath = "../../static";

    /**
     * Stringa che identifica l'host del database
     * @type {string}
     */
    this.dbHost = process.env.OPENSHIFT_MONGODB_DB_HOST || 'localhost';

    /**
     * Porta su cui il server di mongodb deve mettersi in ascolto
     * @type {number}
     */
    this.dbPort = process.env.OPENSHIFT_MONGODB_DB_PORT || 27017;

    /**
     * Nome del database dell'applicazione
     * @type {string}
     */
    this.dbName = (options && options.test)
        ? 'quizzipedia-test'
        : 'quizzipedia';

    /**
     * Username per connettersi al database
     * @type {*|string}
     */
    this.dbUser = process.env.OPENSHIFT_MONGODB_DB_USERNAME || null;

    /**
     * Password per connettersi al database
     * @type {*|string}
     */
    this.dbPassword = process.env.OPENSHIFT_MONGODB_DB_PASSWORD || null;

    /**
     * Stringa di connessione al database
     * @type {string}
     */
    this.dbUri = (this.dbPassword)
        ? 'mongodb://' + this.dbUser + ":" + this.dbPassword + "@" +
        this.dbHost + ':' + this.dbPort + '/' + this.dbName
        :'mongodb://' + this.dbHost + ':' + this.dbPort + '/' + this.dbName;


}

module.exports = Configuration;