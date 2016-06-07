var mongoose = require('mongoose');
var Configuration = require('../../../api/app/Configuration');
var Role = require('../../../api/data/Role');
var Question = require('../../../api/data/Question');
var Questionnaire = require('../../../api/data/Questionnaire');
var Tag = require('../../../api/data/Tag');
var User = require('../../../api/data/User');
var Answer = require('../../../api/data/Answer');

function databaseSetState(objs, onSetState) {
	var config = new Configuration({ test: true });
	mongoose.connect(config.dbTestUri, function() {
		Promise.all([
			Role.remove({}),
			User.remove({}),
			Tag.remove({}),
			Question.remove({}),
			Questionnaire.remove({}),
            Answer.remove({})
		]).then(function() {
			Promise.all(objs.map(function(e) { return e.save(); }))
				.then(function() { onSetState(); }, console.error);
		}, console.error);
	});
}

function databaseSetup(onSetup) {

	var studentRole = new Role({name: 'student'});
	var teacherRole = new Role({name: 'teacher'});
	var adminRole = new Role({name: 'admin'});
	var superAdminRole = new Role({name: 'superadmin'});

    var user1 = new User({
        userName: 'mario.rossi',
        fullName: 'Mario Rossi',
        password: 'password.mario.rossi',
        role: studentRole._id
    });
    var user2 = new User({
        userName: 'carlo.bianchi',
        fullName: 'Carlo Bianchi',
        password: 'password.carlo.bianchi',
        role: studentRole._id
    });
    var user3 = new User({
        userName: 'tullio.vardanega',
        fullName: 'Tullio Vardanega',
        password: 'password.tullio.vardanega',
        role: teacherRole._id
    });
    var user4 = new User({
        userName: 'riccardo.cardin',
        fullName: 'Riccardo Cardin',
        password: 'password.riccardo.cardin',
        role: teacherRole._id
    });
    var user5 = new User({
        userName: 'francesco.ranzato',
        fullName: 'Francesco Ranzato',
        password: 'password.francesco.ranzato',
        role: adminRole._id
    });
    var user6 = new User({
        userName: 'gregorio.piccoli',
        fullName: 'Gregorio Piccoli',
        password: 'password.gregorio.piccoli',
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
		description: 'Scienza che si occupa dello studio della qualità di un SW'
	});

	var question1 = new Question ({
		author: user3._id, 
		body: "Javascript è un linguaggio compilato\n(-)",
		tags: [tag2._id,tag1._id]});
 	var question2 = new Question ({
 		author: user3._id, 
 		body: "Open Close principle è uno dei principi SOLID?\n(+)",
 		tags: [tag4._id]
 	});
	var question3 = new Question ({
		author: user3._id, 
		body: "####La seguente formula è corretta?####" +
        "\n![equation](http://www.sciweavers.org/tex2img.php?eq=e%5E%7Bi%20%20%5Cvarphi%20%7D%20%3D%20sin%28%5Cvarphi%" +
        "29%20%2B%20i%20%20%20cos%28%20%5Cvarphi%20%29&bc=Transparent&fc=Black&im=png&fs=18&ff=mathptmx&edit=0[/img])\n(+)",
		tags: [tag1._id]
	});

	var questionnaire1 = new Questionnaire({
		author: user3._id, 
		questions: [question1._id,question2._id,question3._id], 
		tags: [tag1._id,tag2._id,tag4._id],
		title: "Quiz 1"
	});
    var questionnaire2 = new Questionnaire({
        author: user3._id,
        questions: [question1._id,question2._id,question3._id],
        tags: [tag1._id,tag2._id,tag4._id],
        title: "Quiz 2"
    });

    var answer1 = new Answer({
        author: user1._id,
        question: question1._id,
        questionnaire: questionnaire1._id,
        score: 1
    });

    var answer2 = new Answer({
        author: user1._id,
        question: question2._id,
        questionnaire: questionnaire1._id,
        score: 0
    });

    var answer3 = new Answer({
        author: user1._id,
        question: question3._id,
        questionnaire: questionnaire1._id,
        score: 1
    });

    var answer4 = new Answer({
        author: user2._id,
        question: question1._id,
        questionnaire: questionnaire1._id,
        score: 0
    });

    databaseSetState([
        studentRole,
        teacherRole,
        adminRole,
        superAdminRole,
        user1,
        user2,
        user3,
        user4,
        user5,
        user6,
        tag1,
        tag2,
        tag3,
        tag4,
        question1,
        question2,
        question3,
        questionnaire1,
        questionnaire2,
        answer1,
        answer2,
        answer3,
        answer4
    ], onSetup);

}

module.exports = {
	databaseSetup: databaseSetup
};