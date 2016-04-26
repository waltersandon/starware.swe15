/**
 * Created by igor on 26/04/16.
 */
var Router = require('./../../../../api/middleware/Router');
var ErrorHandler = require('./../../../../api/middleware/ErrorHandler');
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');

/**
 * Classe utilizzata per istanziare in modo nascosto all’applicazione tutti i middleware presenti nel componente server::middleware
 * @param app
 * @constructor
 */
function LoaderMock(app, auth) {

    app.use('/', express.static('static'));

    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(session({
        secret: 'a4f8071f-c873-4447-8ee2',
        resave: false,
        saveUninitialized: false
    }));
    this.error = new ErrorHandler();
    this.router = new Router(auth, this.error);
    app.use("/api",this.router.router);
}

module.exports = LoaderMock;