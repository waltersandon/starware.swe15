/**
 * Created by alessio on 19/03/16.
 */

var Authorization = require('./Authorization');
var Router = require('./Router');
var ErrorHandler = require('./ErrorHandler');
var express = require('express');

/**
 * Classe utilizzata per istanziare in modo nascosto all’applicazione tutti i middleware presenti nel componente server::middleware
 * @param app
 * @constructor
 */
function Loader(app) {
    app.use('/public', express.static('static'));
    this.authorization = new Authorization();
    this.error = new ErrorHandler();
    this.router = new Router(this.authorization, this.error);
    app.use("/api",this.router.router);
}

module.exports = Loader;