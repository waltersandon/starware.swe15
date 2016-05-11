var express = require('express');
var fs = require('fs');

var db = require('./tests/server/utils/DatabaseUtils');

var App = require('./api/app/App');
var Loader = require('./api/middleware/Loader');
var Configuration = require('./api/app/Configuration');
var app = new App(new Configuration({
    test: true
}));
var loader = new Loader(app.config());

app.start();
db.databaseSetup(function () {
    console.log("db-test on");

});
