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
			new Role({name: 'Studente'}).save(),
			new Role({name: 'Docente'}).save(),
			new Role({name: 'Amministratore'}).save(),
			new Role({name: 'Proprietario'}).save()
		]).then(function() {
			mongoose.disconnect();
			console.log('Aggiunti ruoli base');
		});
	});

});