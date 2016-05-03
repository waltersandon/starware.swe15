var db = require('./DatabaseUtils');

before(function(done) {
	this.timeout(10000);
	db.databaseSetup(done);
});