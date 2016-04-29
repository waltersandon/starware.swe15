var express = require('express');
var fs = require('fs');

var App = require('./api/app/App');
var Loader = require('./api/middleware/Loader');
var Configuration = require('./api/app/Configuration');
var app = new App(new Configuration('quizzipedia'));
var loader = new Loader(app.config());
app.start();