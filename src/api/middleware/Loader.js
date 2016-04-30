var Authorization = require('./Authorization');
var Router = require('./Router');
var ErrorHandler = require('./ErrorHandler');

var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');

/**
 * Classe utilizzata per istanziare in modo nascosto all’applicazione tutti i middleware presenti nel componente server::middleware
 * @param app
 * @constructor
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

    this.authorization = new Authorization();
    this.error = new ErrorHandler();
    this.router = new Router(this.authorization, this.error);
    app.use("/api",this.router.router);
}

module.exports = Loader;