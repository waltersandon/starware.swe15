var mongoose = require('mongoose');
var Configuration = require('./api/app/Configuration');

var config = new Configuration();

mongoose.connection.on('error', function(err) {
    if (err) console.error(err);
});

mongoose.connect(config.dbUri, function() {

	var Role = require('./api/data/Role');

	// Remove all roles
	Promise.all([
		Role.remove({})
	]).then(function() {
		// Add basic roles
		Promise.all([
			new Role({name: 'student'}).save(),
			new Role({name: 'teacher'}).save(),
			new Role({name: 'admin'}).save(),
			new Role({name: 'superadmin'}).save()
		]).then(function() {
			mongoose.disconnect();
			console.log('Aggiunti ruoli base');
		});
	});

});