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
		var tag4 =  new Tag({name: 'SWE', description: 'Scienza che si occupa dello studio della qualità di un SW'});
		var tag5 =  new Tag({name: 'Svago', description: 'Scienza del divining'});
		
		var usr1 = new User ({fullName:'Mario Rossi', password: 'password', role: student._id, userName: "mrossi" });
		var usr2 = new User ({fullName:'Carlo Bianchi', password: 'password', role: teacher._id, userName: "cbianchi" });
		var usr3 = new User ({fullName:'Amilcare Verdi', password: 'password', role: admin._id, userName: "averdi" });
		var usr4 = new User ({fullName:'Mariuccia Pastafrolla', password: 'password', role: superAdmin._id, userName: "mpastafrolla" });
		var usr5 = new User ({fullName:'Alessio Vitella', password: 'password', role: admin._id, userName: "avitella" });
		var usr6 = new User ({fullName:'Walter Sandon', password: 'password', role: student._id, userName: "wsandon" });

		var question1 = new Question ({author: usr2._id, body: "<TF T>\nRoma è la capitale d’**Italia**?", tags: [tag5._id,tag1._id]});
 		var question2 = new Question ({author: usr3._id, body: "<TF F>\nRoma non è la capitale d’**Italia**?", tags: [tag5._id]});
		var question3 = new Question ({author: usr4._id, body: "<MultipleChoice>\nQuanto fa 3 + 5?\n[answers]\n[] 7\n[*] 8\n[] 9", tags: [tag1._id]});
		var question4 = new Question ({author: usr3._id, body: "<MultipleChoice>\nQuale di questi numeri è primo?\n[answers]\n[] 15\n[*] 2\n[] 21", tags: [tag1._id]});
		var question5 = new Question ({author: usr3._id, body: "<MultipleChoice>\nChi ha scritto il Decameron\n[answers]\n[] Dante\n[] Petrarca\n[*] Boccaccio\n[] D'annunzio", tags: [tag3._id]});
		var question6 = new Question ({author: usr5._id, body: "<TF F>\nIl documento ISO/IEC 12207 riguarda la qualità dei processi software", tags: [tag4._id]});
		var question7 = new Question ({author: usr5._id, body: "<MultipleChoice>\nChi di questi è più ricco?\n[answers]\n" +
		"[] ![paperino](http://www.googledrive.com/host/0B6NSpwWzNVlsN3NUUGlFbF9LNkE)\n" +
		"[] ![qui quo qua](http://www.googledrive.com/host/0B6NSpwWzNVlsSWcwTnA2MzhTWDQ)\n" +
		"[*] ![zio paperone](http://www.googledrive.com/host/0B6NSpwWzNVlsdzY2d1hnak14ZzA)", tags: [tag5._id]});
		var question8 = new Question ({author: usr5._id, body: "<TF T>\n####La seguente formula è corretta?####\n" +
		"![equation](http://www.sciweavers.org/tex2img.php?eq=e%5E%7Bi%20%20%5Cvarphi%20%7D%20%3D%20sin%28%5Cvarphi%29%20%2B%20i%20%20%20cos%28%20%5Cvarphi%20%29&bc=Transparent&fc=Black&im=png&fs=18&ff=mathptmx&edit=0[/img])", tags: [tag2._id]});
        var question9 = new Question ({author: usr5._id, body: "<MultipleChoice>\nQuale di questi non è uno dei principi SOLID?\n[answers]\n" +
        "[] Single Responsibility principle\n" +
        "[] Open Close principle\n" +
        "[*] La pizza\n" +
        "[] Liskov Substitution principle", tags: [tag2._id,tag4._id]});

		var questionnaire1 = new Questionnaire({author: usr5._id, questions: [question1._id,question2._id,question3._id], tags: [tag1._id,tag2._id,tag3._id], title: "Quiz 1"});


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
			tag5.save(),
			usr1.save(),
			usr2.save(),
			usr3.save(),
			usr4.save(),
			usr5.save(),
			usr6.save(),
			question1.save(),
			question2.save(),
			question3.save(),
			question4.save(),
			question5.save(),
			question6.save(),
			question7.save(),
			question8.save(),
            question9.save(),
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