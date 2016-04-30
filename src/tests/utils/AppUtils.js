var App = require('../../api/app/App');
var Configuration = require('../../api/app/Configuration');
var Loader = require('../../api/middleware/Loader');

var app = new App(new Configuration({
	test: true
}));
var loader = new Loader(app.config());
app.start();

module.exports = {
	testApp: app.app
};