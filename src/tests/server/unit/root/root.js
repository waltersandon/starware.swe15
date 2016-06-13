var db = require('../../utils/DatabaseUtils');
var app = require('../../utils/AppUtils').testApp;

before(function(done) {
	this.timeout(10000);
	db.databaseSetup(done);
});