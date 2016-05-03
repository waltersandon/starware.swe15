var db = require('../utils/DatabaseUtils');

before(function(done) {
	this.timeout(10000);
	db.databaseSetup(done);
});