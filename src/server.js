var express = require('express');
var fs = require('fs');

var App = require('./api/app/App');

var a = new App();
a.start();