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

		var question1 = new Question ({author: usr2._id, body: "Roma è la capitale d’**Italia**?\n(+)", tags: [tag5._id,tag1._id]});
 		var question2 = new Question ({author: usr3._id, body: "Roma non è la capitale d’**Italia**?\n (-)", tags: [tag5._id]});
		var question3 = new Question ({author: usr4._id, body: "Quanto fa 3 + 5?\n() 7\n(*) 8\n() 9", tags: [tag1._id]});
		var question4 = new Question ({author: usr3._id, body: "Quale di questi numeri è primo?\n() 15\n(*) 2\n() 21", tags: [tag1._id]});
		var question5 = new Question ({author: usr3._id, body: "Chi ha scritto il Decameron\n() Dante\n() Petrarca\n(*) Boccaccio\n() D'annunzio", tags: [tag3._id]});
		var question6 = new Question ({author: usr5._id, body: "Il documento ISO/IEC 12207 riguarda la qualità dei processi software\n(-)", tags: [tag4._id]});
		var question7 = new Question ({author: usr5._id, body: "Chi di questi è più ricco?\n" +
		"() ![paperino](http://www.googledrive.com/host/0B6NSpwWzNVlsN3NUUGlFbF9LNkE)\n" +
		"() ![qui quo qua](http://www.googledrive.com/host/0B6NSpwWzNVlsSWcwTnA2MzhTWDQ)\n" +
		"(*) ![zio paperone](http://www.googledrive.com/host/0B6NSpwWzNVlsdzY2d1hnak14ZzA)", tags: [tag5._id]});
		var question8 = new Question ({author: usr5._id, body: "####La seguente formula è corretta?####\n" +
		"![equation](http://mathurl.com/hkn6tdn.png)\n(+)", tags: [tag2._id]});
        var question9 = new Question ({author: usr5._id, body: "Quale di questi non è uno dei principi SOLID?\n" +
        "() Single Responsibility principle\n" +
        "() Open Close principle\n" +
        "(*) Master Theorem\n" +
        "() Liskov Substitution principle", tags: [tag2._id,tag4._id]});
		var question10 = new Question({author: usr5._id, body: "La chiamavano bocca di [*rosa, cosa, prosa] metteva l'[ipocrisia,*amore,impegno,arte] sopra ogni [rosa, *cosa, prosa].\n" +
		"Appena scesa dalla stazione del paesino di [Monte Mario, Icario,* Sant'Ilario], tutti s'accorsero senza uno sguardo che non si trattava di un [*missionario, precario, funzionario, operaio].\n" +
		"\"\"\"\n" +
		"Bocca di Rosa è una delle canzoni più famose di Fabrizio De André, nonché quella che, come ha dichiarato in un'intervista televisiva concessa a Vincenzo Mollica, il cantautore genovese considerava più cara e più vicina al suo modo di essere.\n" +
		"A testimonianza di quanto questa canzone sia entrata nell'immaginario collettivo, si può citare il fatto che l'espressione \"bocca di rosa\" è entrata nel linguaggio comune, essendo usata - se pur erroneamente - come eufemismo di prostituta; erroneamente in quanto, in realtà, come si afferma nel testo: \"Bocca di rosa né l'uno né l'altro, lei lo faceva per passione\", riferito all'amore.", tags: [tag5._id]});
		var question11 = new Question({author: usr5._id, tags: [tag5._id, tag1._id], body:
			"Riordina le seguenti serie TV in ordine cronologico in base alla data del loro primo episodio:\n" +
			"[Lost|Breaking Bad|Game of Thrones]\n"
		});
		var question12 = new Question({author: usr5._id, tags: [tag1._id], body:"Una pallina di gomma viene lanciata verso il basso con velocità pari a 3m/s da un balcone alto 20m rispetto al suolo. Determinare l’istante (in secondi) in cui tocca terra:\n" +
		"{1.74,0.05}\n" +
		"\"\"\"\n" +
		"La legge oraria della pallina è ![legge](http://mathurl.com/jm878le.png); determiniamo ora l’istante in cui abbiamo ![zero](http://mathurl.com/33acycl.png):\n" +
		"![sistema](http://mathurl.com/hqyrb7a.png)\n" +
		"ovviamente la soluzione negativa va scartata, per cui la soluzione è ![sol](http://mathurl.com/h6wn579.png)"});
		var question13 = new Question({author: usr5._id, tags: [tag2._id], body: "Riordina le seguenti fasi del ciclo di Deming:\n" +
		"[Plan|Do|Check|Act]\n" +
		"\"\"\"\n" +
		"Il ciclo di Deming o Deming Cycle (ciclo di PDCA - plan–do–check–act) è un modello studiato per il miglioramento continuo della qualità in un'ottica a lungo raggio. Serve per promuovere una cultura della qualità che è tesa al miglioramento continuo dei processi e all'utilizzo ottimale delle risorse.\n" +
		"* **Plan:** definire attività, scandenze, responsabilità, risorse utili a raggiungere specifici obbiettivi di miglioramento\n" +
		"*  **Do:** eseguire le attività secondo i piani\n" +
		"*  **Check:** verificare l’esito delle azioni di miglioramento rispetto alle attese\n" +
		"*  **Act:** applicare soluzioni correttive alle carenze rilevate"});
		
		var question14 = new Question({author: usr5._id, tags: [tag3._id], body: "Riordina i seguenti termini in modo tale che ad ogni parola corrisponda la lingua in cui è scritta:\n" +
		"{Patata,Italiano|Kartoffel,Tesesco|Potato,Inglese|Batata,Portoghese|Potatis,Svedese}\n" +

		"\"\"\"\n" +
		"L'associazione corretta tra i precedenti termini è:\n" +
		"* Patata = Italiano\n" +
		"* Kartoffel = Tedesco\n" +
		"* Potato = Inglese\n" +
		"* Batata = Portoghese\n" +
		"* Potatis = Svedese"});
		
		var questionnaire1 = new Questionnaire({author: usr5._id, questions: [question1._id,question2._id, question7._id, question10._id,  question12._id,  question13._id,  question14._id], tags: [tag1._id,tag2._id,tag3._id], title: "Quiz 1"});
		var questionnaire2 = new Questionnaire({author: usr2._id, questions: [question9._id,question4._id,question5._id], tags: [tag5._id], title: "Quiz 2"});
		var questionnaire3 = new Questionnaire({author: usr2._id, questions: [question4._id,question5._id,question1._id, question8._id, question11._id], tags: [tag1._id,tag3._id], title: "Quiz 3"});
		var questionnaire4 = new Questionnaire({author: usr4._id, questions: [question3._id,question4._id,question6._id, question8._id], tags: [tag5._id], title: "Quiz 4"});

		// usr1 results / questionnaire1
		var answer1 = new Answer({ author: usr1._id, questionnaire: questionnaire1._id, question: question1._id, score: 1 });
		var answer2 = new Answer({ author: usr1._id, questionnaire: questionnaire1._id, question: question2._id, score: 1 });
		var answer3 = new Answer({ author: usr1._id, questionnaire: questionnaire1._id, question: question3._id, score: 0 });
		var answer4 = new Answer({ author: usr1._id, questionnaire: questionnaire1._id, question: question10._id, score: 0.40 });

		// usr1 results / questionnaire3
		var answer5 = new Answer({ author: usr1._id, questionnaire: questionnaire3._id, question: question4._id, score: 0 });
		var answer6 = new Answer({ author: usr1._id, questionnaire: questionnaire3._id, question: question5._id, score: 1 });
		var answer7 = new Answer({ author: usr1._id, questionnaire: questionnaire3._id, question: question1._id, score: 1 });
		var answer8 = new Answer({ author: usr1._id, questionnaire: questionnaire3._id, question: question8._id, score: 0 });
		var answer9 = new Answer({ author: usr1._id, questionnaire: questionnaire3._id, question: question11._id, score: 1 });

		// usr2 results / questionnaire1
		var answer10 = new Answer({ author: usr2._id, questionnaire: questionnaire1._id, question: question1._id, score: 0 });
		var answer11 = new Answer({ author: usr2._id, questionnaire: questionnaire1._id, question: question2._id, score: 0 });
		var answer12 = new Answer({ author: usr2._id, questionnaire: questionnaire1._id, question: question3._id, score: 1 });
		var answer13 = new Answer({ author: usr2._id, questionnaire: questionnaire1._id, question: question10._id, score: 0.20 });

		// usr2 results / questionnaire1 #2
		var answer14 = new Answer({ author: usr2._id, questionnaire: questionnaire1._id, question: question1._id, score: 0 });
		var answer15 = new Answer({ author: usr2._id, questionnaire: questionnaire1._id, question: question2._id, score: 1 });
		var answer16 = new Answer({ author: usr2._id, questionnaire: questionnaire1._id, question: question3._id, score: 1 });
		var answer17 = new Answer({ author: usr2._id, questionnaire: questionnaire1._id, question: question10._id, score: 0.60 });

		// usr2 results / questionnaire3
		var answer18 = new Answer({ author: usr2._id, questionnaire: questionnaire3._id, question: question4._id, score: 1 });
		var answer19 = new Answer({ author: usr2._id, questionnaire: questionnaire3._id, question: question5._id, score: 1 });
		var answer20 = new Answer({ author: usr2._id, questionnaire: questionnaire3._id, question: question1._id, score: 0 });
		var answer21 = new Answer({ author: usr2._id, questionnaire: questionnaire3._id, question: question8._id, score: 0 });
		var answer22 = new Answer({ author: usr2._id, questionnaire: questionnaire3._id, question: question11._id, score: 0 });

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
			question10.save(),
			question11.save(),
			question12.save(),
			question13.save(),
			question14.save(),
			questionnaire1.save(),
			questionnaire2.save(),
			questionnaire3.save(),
			questionnaire4.save(),
			answer1.save(),
			answer2.save(),
			answer3.save(),
			answer4.save(),
			answer5.save(),
			answer6.save(),
			answer7.save(),
			answer8.save(),
			answer9.save(),
			answer10.save(),
			answer11.save(),
			answer12.save(),
			answer13.save(),
			answer14.save(),
			answer15.save(),
			answer16.save(),
			answer17.save(),
			answer18.save(),
			answer19.save(),
			answer20.save(),
			answer21.save(),
			answer22.save()
		]).then(function() {
			mongoose.disconnect();
			console.log('Dati test aggiunti');
		});

	});

});