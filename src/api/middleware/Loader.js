/**
 * @file Loader.js
 * @date 22/04/2016
 * @version 2.0
 * @author Nicola De Cao
 *
 */
var Authorization = require('./Authorization');
var Router = require('./Router');
var ErrorHandler = require('./ErrorHandler');

var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');

/*!
 * @class   Loader
 * @details Classe utilizzata per istanziare tutti i middleware
 *          dell'applicazione
 * @par Usage
 * Viene utilizzato per istanziare in modo nascosto all’applicazione tutti i
 * middleware presenti nel componente server::middleware
 */
function Loader(app) {

    app.use('/', express.static('static'));

    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(session({
        secret: 'a4f8071f-c873-4447-8ee2',
        resave: false,
        saveUninitialized: false,
		cookie: {
			httpOnly: false,
			maxAge: 3600*24*365*1000
		}
    }));

    //!campo dati che rappresenta un riferimento al Middleware Authorization, utilizzato per l'autorizzazione delle richieste
    this.authorization = new Authorization();
    //!campo dati che rappresenta un riferimento al Middleware ErrorHandler, che si occupa di inoltrare le risposte d'errore al client
    this.error = new ErrorHandler();
    //!campo dati che rappresenta un riferimento al Middleware Router per gestire il reindirizzamento delle richieste
    this.router = new Router(this.authorization, this.error);
    app.use("/api",this.router.router);
}

module.exports = Loader;