var express = require('express');
var fs = require('fs');

var App = require('./api/app/App');
var Loader = require('./api/middleware/Loader');
var Configuration = require('./api/app/Configuration');
var a = new App(new Configuration());
var l = new Loader(a.config());
a.start();