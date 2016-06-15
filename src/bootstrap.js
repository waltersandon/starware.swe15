var mongoose = require('mongoose');
var Configuration = require('./api/app/Configuration');

var config = new Configuration();

mongoose.connection.on('error', function(err) {
    if (err) console.error(err);
});

mongoose.connect(config.dbUri, function() {

	var Role = require('./api/data/Role');
	var Question = require('./api/data/Question');
	var Questionnaire = require('./api/data/Questionnaire');
	var Tag = require('./api/data/Tag');
	var User = require('./api/data/User');
	var Answer = require('./api/data/Answer');

	// Remove all db content
	Promise.all([
		Role.remove({}),
		User.remove({}),
		Tag.remove({}),
		Question.remove({}),
		Questionnaire.remove({}),
		Answer.remove({})
	]).then(function() {

		// Add basic Roles and Tags
		var student = new Role({name: 'student'});
		var teacher = new Role({name: 'teacher'});
		var admin = new Role({name: 'admin'});
		var superAdmin = new Role({name: 'superadmin'});
		
		var usr1 = new User ({fullName:'Super Admin', password: 'superadmin', role: superAdmin._id, userName: "superadmin" });
		
		// Add basic Roles and Tags
		Promise.all([
			student.save(),
			teacher.save(),
			admin.save(),
			superAdmin.save(),
			usr1.save()
		]).then(function() {
			mongoose.disconnect();
			console.log('Done');
		}, function(err) {
			console.log(err);
		});
	}, function(err) {
		console.log(err);
	});
});