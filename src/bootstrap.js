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

	// Remove all db content
	Promise.all([
		Role.remove({}),
		User.remove({}),
		Tag.remove({}),
		Question.remove({}),
		Questionnaire.remove({})
	]).then(function() {

		// Add basic Roles and Tags
		var student = new Role({name: 'student'});
		var teacher = new Role({name: 'teacher'});
		var admin = new Role({name: 'admin'});
		var superAdmin = new Role({name: 'superadmin'});

		var tag1 = 	new Tag({name: 'Matematica', description: 'Scienza che si occupa dello studio dei numeri e delle loro relazioni'});
		var tag2 = 	new Tag({name: 'Informatica', description: 'Scienza che si occupa dello studio dei computer'});
		var tag3 = 	new Tag({name: 'Italiano', description: 'Scienza che si occupa dello studio della lingua e grammatica italiana'});
		var tag4 =  new Tag({name: 'SWE', description: 'Scienza che si occupa dello studio della qualità di un SW',parent: tag2._id});

		var usr1 = new User ({fullName:'Mario Rossi', password: 'password', role: student._id, userName: "mrossi" });
		var usr2 = new User ({fullName:'Carlo Bianchi', password: 'password', role: teacher._id, userName: "cbianchi" });
		var usr3 = new User ({fullName:'Amilcare Verdi', password: 'password', role: admin._id, userName: "averdi" });
		var usr4 = new User ({fullName:'Mariuccia Pastafrolla', password: 'password', role: superAdmin._id, userName: "mpastafrolla" });

		var question1 = new Question ({author: usr2._id, body: "<TF>\nRoma è la capitale d’**Italia**?\n[T]", tags: [tag2._id,tag1._id]});
 		var question2 = new Question ({author: usr3._id, body: "<TF>\nRoma è la capitale d’**Italia**?\n[T]", tags: [tag2._id]});
		var question3 = new Question ({author: usr4._id, body: "<TF>\nRoma è la capitale d’**Italia**?\n[T]", tags: [tag3._id]});

		var questionnaire1 = new Questionnaire({author: usr2._id, questions: [question1._id,question2._id,question3._id], tags: [tag1._id,tag2._id,tag3._id], title: "Quiz 1"});


		// Add basic Roles and Tags
		Promise.all([
			student.save(),
			teacher.save(),
			admin.save(),
			superAdmin.save(),
			tag1.save(),
			tag2.save(),
			tag3.save(),
			tag4.save(),
			usr1.save(),
			usr2.save(),
			usr3.save(),
			usr4.save(),
			question1.save(),
			question2.save(),
			question3.save(),
			questionnaire1.save()

		]).then(function() {
			mongoose.disconnect();
			console.log('Aggiunti ruoli base');
			console.log('Aggiunti agromenti base');
			console.log('Aggiunti utenti base');
			console.log('Aggiunte domande base');
			console.log('Aggiunto questionario base');
		});

	});

});