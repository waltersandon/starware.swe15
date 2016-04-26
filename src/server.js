var express = require('express');
var fs = require('fs');

var App = require('./api/app/App');
var Loader = require('./api/middleware/Loader');

var a = new App();
var l = new Loader(a.config());
a.start();