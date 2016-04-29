var mongoose = require('mongoose');
var Configuration = require('../../api/app/Configuration');
var Role = require('../../api/data/Role');
var Question = require('../../api/data/Question');
var Questionnaire = require('../../api/data/Questionnaire');
var Tag = require('../../api/data/Tag');
var User = require('../../api/data/User');

function databaseConnect(onConnect) {
	var config = new Configuration();
    mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
	mongoose.connect(config.dbTestUri);
	onConnect();
}

function objLoader(objs, onLoaded) {
	if (objs.length > 0) {
		var obj = objs.shift(); // pop front
		obj.save().then(function() {
			objLoader(objs, onLoaded);
		}, console.error);
	} else {
		return onLoaded();
	}
}

function resetDatabase(onReset) {
	Promise.all([
		Role.remove({}),
		User.remove({}),
		Tag.remove({}),
		Question.remove({}),
		Questionnaire.remove({})
	]).then(onReset, console.error);
}

function databaseSetState(objs, fn) {
	resetDatabase(function() {
		objLoader(objs, fn);
	});
}

function databaseSetup(onSetup) {

	var studentRole = new Role({name: 'student'});
	var teacherRole = new Role({name: 'teacher'});
	var adminRole = new Role({name: 'admin'});
	var superAdminRole = new Role({name: 'superadmin'});

    var student1 = new User({
        userName: 'mario.rossi',
        fullName: 'Mario Rossi',
        password: 'password.mario.rossi',
        role: studentRole._id
    });
    var student2 = new User({
        userName: 'carlo.bianchi',
        fullName: 'Carlo Bianchi',
        password: 'password.carlo.bianchi',
        role: studentRole._id
    });
    var student3 = new User({
        userName: 'tullio.vardanega',
        fullName: 'Tullio Vardanega',
        password: 'password.tullio.vardanega',
        role: teacherRole._id
    });
    var student4 = new User({
        userName: 'riccardo.cardin',
        fullName: 'Riccardo Cardin',
        password: 'password.riccardo.cardin',
        role: teacherRole._id
    });
    var student5 = new User({
        userName: 'francesco.ranzato',
        fullName: 'Francesco Ranzato',
        password: 'password.francesco.ranzato',
        role: adminRole._id
    });
    var student6 = new User({
        userName: 'alessandro.sperduti',
        fullName: 'Alessandro Sperduti',
        password: 'password.alessandro.sperduti',
        role: superAdminRole._id
    });

	var tag1 = new Tag({
		name: 'Matematica', 
		description: 'Scienza che si occupa dello studio dei numeri e delle loro relazioni'
	});
	var tag2 = new Tag({
		name: 'Informatica', 
		description: 'Scienza che si occupa dello studio dei computer'
	});
	var tag3 = new Tag({
		name: 'Italiano', 
		description: 'Scienza che si occupa dello studio della lingua e grammatica italiana'
	});
	var tag4 = new Tag({
		name: 'SWE', 
		description: 'Scienza che si occupa dello studio della qualità di un SW',
		parent: tag2._id
	});

	var question1 = new Question ({
		author: usr2._id, 
		body: "<TF>\nRoma è la capitale d’**Italia**?\n[T]", 
		tags: [tag2._id,tag1._id]});
 	var question2 = new Question ({
 		author: usr3._id, 
 		body: "<TF>\nRoma è la capitale d’**Italia**?\n[T]", 
 		tags: [tag2._id]
 	});
	var question3 = new Question ({
		author: usr4._id, 
		body: "<TF>\nRoma è la capitale d’**Italia**?\n[T]", 
		tags: [tag3._id]
	});

	var questionnaire1 = new Questionnaire({
		author: usr2._id, 
		questions: [question1._id,question2._id,question3._id], 
		tags: [tag1._id,tag2._id,tag3._id], 
		title: "Quiz 1"
	});

    databaseSetState([
        studentRole,
        teacherRole,
        adminRole,
        superAdminRole,
        student1,
        student2,
        student3,
        student4,
        student5,
        student6,
        tag1,
        tag2,
        tag3,
        tag4,
        question1,
        question2,
        question3,
        questionnaire1
    ], done);

}

module.exports = {
	databaseConnect: databaseConnect,
	databaseSetup: databaseSetup,
};