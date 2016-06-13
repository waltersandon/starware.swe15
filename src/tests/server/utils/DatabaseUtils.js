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
    var tag5 = new Tag({
        name: 'Svago',
        description: 'Tema libero della cultura generale'
    });
    var tag6 = new Tag({
        name: 'Fisica',
        description: 'la scienza della natura nel senso più ampio'
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
    var question4 = new Question ({
        author: user3._id,
        body: "Chi ha scritto il Decameron\n() Dante\n() Petrarca\n(*) " +
        "Boccaccio\n() D'annunzio",
        tags: [tag3._id]
    });
    var question5 = new Question ({
        author: user3._id,
        body: "Chi di questi è un autore italiano\n[] Tolstoj\n[*] Petrarca\n[*] " +
        "Boccaccio\n[] Dickens",
        tags: [tag3._id]
    });
    var question6 = new Question ({
        author: user3._id,
        body: "La chiamavano bocca di [*rosa, cosa, babbuino] metteva l' " +
        "[aracia,*amore,entropia,uva] sopra ogni [rosa, *cosa, babbuino].\n" +
        "Appena scesa dalla stazione del paesino di [Monte Magrè, Dromedario,* " +
        "Sant'Ilario], tutti s'accorsero senza uno sguardo che non si trattava di un" +
        " [*missionario, rinoceronte, pizza, marajè]",
        tags: [tag5._id]
    });
    var question7 = new Question ({
        author: user3._id,
        body: "Riordina le seguenti serie TV in ordine cronologico in base alla" +
        " data del loro primo episodio:\n" +
        "[Lost|Breaking Bad|Game of Thrones]\n",
        tags: [tag5._id]
    });
    var question8 = new Question ({
        author: user3._id,
        body: 'Collega città e squadra di calcio:' +
        '\n{Juventus,Torino|Inter,Milano|Sampdoria,Genova}',
        tags: [tag5._id]
    });
    var question9 = new Question ({
        author: user3._id,
        body: 'Una pallina di gomma viene lanciata verso il basso con velocità pari a 3m/s da un balcone alto 20m ' +
        'rispetto al suolo. Determinare l’istante (in secondi) in cui tocca terra:\n{1.74,0.05}',
        tags: [tag6._id]
    });

	var questionnaire1 = new Questionnaire({
		author: user3._id, 
		questions: [question1._id,question2._id,question3._id],

		tags: [tag1._id,tag2._id,tag4._id,tag5._id,tag6._id],
		title: "Quiz 1"
	});
    var questionnaire2 = new Questionnaire({
        author: user3._id,
        questions: [question4._id],
        tags: [tag1._id,tag2._id,tag4._id],
        title: "Quiz 2"
    });
    var questionnaire3 = new Questionnaire({
        author: user3._id,
        questions: [question5._id],
        tags: [tag1._id,tag2._id,tag4._id],
        title: "Quiz 3"
    });
    var questionnaire4 = new Questionnaire({
        author: user3._id,
        questions: [question6._id],
        tags: [tag1._id,tag2._id,tag4._id],
        title: "Quiz 4"
    });
    var questionnaire5 = new Questionnaire({
        author: user3._id,
        questions: [question7._id],
        tags: [tag1._id,tag2._id,tag4._id],
        title: "Quiz 5"
    });
    var questionnaire6 = new Questionnaire({
        author: user3._id,
        questions: [question8._id],
        tags: [tag1._id,tag2._id,tag4._id],
        title: "Quiz 6"
    });
    var questionnaire7 = new Questionnaire({
        author: user3._id,
        questions: [question9._id],
        tags: [tag1._id,tag2._id,tag4._id],
        title: "Quiz 7"
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
        question4,
        question5,
        question6,
        question7,
        question8,
        question9,
        questionnaire1,
        questionnaire2,
        questionnaire3,
        questionnaire4,
        questionnaire5,
        questionnaire6,
        questionnaire7,
        answer1,
        answer2,
        answer3,
        answer4
    ], onSetup);

}

module.exports = {
	databaseSetup: databaseSetup
};