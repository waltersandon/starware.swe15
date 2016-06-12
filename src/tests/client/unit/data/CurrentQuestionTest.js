describe('model.data.CurrentQuestionnaire', function() {
    var CurrentQuestion;



    var questions = [
        {
            id: 'id_question_1',
            body: 'Testo domanda\nSeconda linea\n(-)',
            author: 'id_author_1',
            tags: [ 'id_tag_1']
        },
        {
            id: 'id_question_2',
            body: 'Chi ha scritto il Decameron\n() Dante\n() Petrarca\n(*) Boccaccio\n() D\'annunzio',
            author: 'id_author_1',
            tags: ['id_tag_1']
        },
        {
            id: 'id_question_3',
            body: 'Testo domanda\nSeconda linea\n[]sbaliato\n[*]vero\n[*]vero\n[]sbaliato',
            author: 'id_author_1',
            tags: ['id_tag_1']
        },
        {
            id: 'id_question_4',
            body: 'Testo domanda [sbaliato1,*giusto1]\nSeconda linea [sbaliato2,*giusto2] ',
            author: 'id_author_1',
            tags: ['id_tag_1']
        },
        {
            id: 'id_question_5',
            body: 'Lista \n[primo|secondo|terzo|quarto]',
            author: 'id_author_1',
            tags: ['id_tag_1']
        },
        {
            id: 'id_question_6',
            body: 'Collega città e squadra di calcio:' +
            '\n{Juventus,Torino|Inter,Milano|Sampdoria,Genova}',
            author: 'id_author_1',
            tags: ['id_tag_1']
        },
        {
            id: 'id_question_7',
            body: 'Una pallina di gomma viene lanciata verso il basso con velocità pari a 3m/s da un balcone alto 20m ' +
            'rispetto al suolo. Determinare l’istante (in secondi) in cui tocca terra:\n{1.74,0.05}',
            author: 'id_author_1',
            tags: ['id_tag_1']
        }

    ];


    beforeEach(function () {
        module('app.App');
        inject(function ($injector) {
            CurrentQuestion = $injector.get('model.data.CurrentQuestion');


        });


    });
    describe('Controllo punti test point & answered ', function () {
        it('Deve corregere bene la domanda TF sbagliata', function () {
            var currentQuest = new CurrentQuestion(questions[0]);
            expect(currentQuest).toBeDefined;
            currentQuest.selectedAnswer = "true";
            var res = currentQuest.point();
            expect(res).toBeDefined();
            expect(res.point).toEqual(0);
            expect(res.tot).toEqual(1);
            expect(currentQuest.right).toEqual(false);
            expect(currentQuest.answered()).toEqual(true);


        });
        it('Deve corregere bene la domanda TF coretta', function () {
            var currentQuest = new CurrentQuestion(questions[0]);
            expect(currentQuest).toBeDefined;
            currentQuest.selectedAnswer = "false";
            var res = currentQuest.point();
            expect(res).toBeDefined();
            expect(res.point).toEqual(1);
            expect(res.tot).toEqual(1);
            expect(currentQuest.right).toEqual(true);
            expect(currentQuest.answered()).toEqual(true);


        });
        it('Deve corregere bene la domanda MC sbagliata', function () {
            var currentQuest = new CurrentQuestion(questions[1]);
            expect(currentQuest).toBeDefined;
            currentQuest.selectedAnswer = "1";
            var res = currentQuest.point();
            expect(res).toBeDefined();
            expect(res.point).toEqual(0);
            expect(res.tot).toEqual(1);
            expect(currentQuest.right).toEqual(false);
            expect(currentQuest.answered()).toEqual(true);


        });
        it('Deve corregere bene la domanda MC coretta', function () {
            var currentQuest = new CurrentQuestion(questions[1]);
            expect(currentQuest).toBeDefined;
            currentQuest.selectedAnswer = "2";
            var res = currentQuest.point();
            expect(res).toBeDefined();
            expect(res.point).toEqual(1);
            expect(res.tot).toEqual(1);
            expect(currentQuest.right).toEqual(true);
            expect(currentQuest.answered()).toEqual(true);


        });
        it('Deve corregere bene la domanda MA sbagliata totalmente', function () {
            var currentQuest = new CurrentQuestion(questions[2]);
            expect(currentQuest).toBeDefined;
            currentQuest.selectedAnswer = ["0","3"];
            var res = currentQuest.point();
            expect(res).toBeDefined();
            expect(res.point).toEqual(0);
            expect(res.tot).toEqual(1);
            expect(currentQuest.right).toEqual(false);
            expect(currentQuest.answered()).toEqual(true);


        });
        it('Deve corregere bene la domanda MA coretta parzialmente', function () {
            var currentQuest = new CurrentQuestion(questions[2]);
            expect(currentQuest).toBeDefined;
            currentQuest.selectedAnswer = ["1"];
            var res = currentQuest.point();
            expect(res).toBeDefined();
            expect(res.point).toEqual(0.5);
            expect(res.tot).toEqual(1);
            expect(currentQuest.right).toEqual(false);
            expect(currentQuest.answered()).toEqual(true);


        });
        it('Deve corregere bene la domanda MA coretta', function () {
            var currentQuest = new CurrentQuestion(questions[2]);
            expect(currentQuest).toBeDefined;
            currentQuest.selectedAnswer = ["1","2"];
            var res = currentQuest.point();
            expect(res).toBeDefined();
            expect(res.point).toEqual(1);
            expect(res.tot).toEqual(1);
            expect(currentQuest.right).toEqual(true);
            expect(currentQuest.answered()).toEqual(true);


        });
        it('Deve corregere bene la domanda CT sbagliata totalmente', function () {
            var currentQuest = new CurrentQuestion(questions[3]);
            expect(currentQuest).toBeDefined;
            currentQuest.selectedAnswer = ["0","0"];
            var res = currentQuest.point();
            expect(res).toBeDefined();
            expect(res.point).toEqual(0);
            expect(res.tot).toEqual(1);
            expect(currentQuest.right).toEqual(false);
            expect(currentQuest.answered()).toEqual(true);


        });
        it('Deve corregere bene la domanda CT coretta parzialmente', function () {
            var currentQuest = new CurrentQuestion(questions[3]);
            expect(currentQuest).toBeDefined;
            currentQuest.selectedAnswer = ["1","0"];
            var res = currentQuest.point();
            expect(res).toBeDefined();
            expect(res.point).toEqual(0.5);
            expect(res.tot).toEqual(1);
            expect(currentQuest.right).toEqual(false);
            expect(currentQuest.answered()).toEqual(true);


        });
        it('Deve corregere bene la domanda CT coretta', function () {
            var currentQuest = new CurrentQuestion(questions[3]);
            expect(currentQuest).toBeDefined;
            currentQuest.selectedAnswer = ["1","1"];
            var res = currentQuest.point();
            expect(res).toBeDefined();
            expect(res.point).toEqual(1);
            expect(res.tot).toEqual(1);
            expect(currentQuest.right).toEqual(true);
            expect(currentQuest.answered()).toEqual(true);


        });
        it('Deve corregere bene la domanda OI sbagliata ', function () {
            var currentQuest = new CurrentQuestion(questions[4]);
            expect(currentQuest).toBeDefined;
            currentQuest.selectedAnswer = ["quarto","terzo","secondo","primo"];
            var res = currentQuest.point();
            expect(res).toBeDefined();
            expect(res.point).toEqual(0);
            expect(res.tot).toEqual(1);
            expect(currentQuest.right).toEqual(false);
            expect(currentQuest.answered()).toEqual(true);


        });
        it('Deve corregere bene la domanda OI coretta', function () {
            var currentQuest = new CurrentQuestion(questions[4]);
            expect(currentQuest).toBeDefined;
            currentQuest.selectedAnswer = ["primo", "secondo", "terzo" ,"quarto"];
            var res = currentQuest.point();
            expect(res).toBeDefined();
            expect(res.point).toEqual(1);
            expect(res.tot).toEqual(1);
            expect(currentQuest.right).toEqual(true);
            expect(currentQuest.answered()).toEqual(true);


        });
        it('Deve corregere bene la domanda CI sbagliata ', function () {
            var currentQuest = new CurrentQuestion(questions[5]);
            expect(currentQuest).toBeDefined;
            currentQuest.selectedAnswer = {
                left : ["Juventus", "Inter", "Sampdoria" ],
                right: ["Milano","Torino", "Genova" ]
            };
            var res = currentQuest.point();
            expect(res).toBeDefined();
            expect(res.point).toEqual(0);
            expect(res.tot).toEqual(1);
            expect(currentQuest.right).toEqual(false);
            expect(currentQuest.answered()).toEqual(true);


        });
        it('Deve corregere bene la domanda CI coretta con permutazioni', function () {
            var currentQuest = new CurrentQuestion(questions[5]);
            expect(currentQuest).toBeDefined;
            var answers = {
                left : ["Juventus", "Inter", "Sampdoria" ],
                right: ["Torino", "Milano", "Genova" ]
            };
            for(var i = 0; i < 3; i++){
                for(var j = 0; j < 2; j++){
                    var next = i === 0 ? 1: i === 1 ? 2 : i === 2 ? 0: -1;
                    var previus =  i === 0 ? 2: i === 1 ? 0 : i === 2 ? 1: -1;
                    if(j === 1){
                        var swap = next;
                        next = previus;
                        previus = swap;
                    }
                    currentQuest.selectedAnswer ={
                        left : [answers.left[i], answers.left[next], answers.left[previus] ],
                        right: [answers.right[i], answers.right[next],answers.right[previus] ]
                    };
                    var res = currentQuest.point();
                    expect(res).toBeDefined();
                    expect(res.point).toEqual(1);
                    expect(res.tot).toEqual(1);
                    expect(currentQuest.right).toEqual(true);
                    expect(currentQuest.answered()).toEqual(true);


                }
            }


        });

        it('Deve corregere bene la domanda NT sbagliata ', function () {
            var currentQuest = new CurrentQuestion(questions[6]);
            expect(currentQuest).toBeDefined;
            currentQuest.selectedAnswer = 1.80;
            var res = currentQuest.point();
            expect(res).toBeDefined();
            expect(res.point).toEqual(0);
            expect(res.tot).toEqual(1);
            expect(currentQuest.right).toEqual(false);
            expect(currentQuest.answered()).toEqual(true);


        });
        it('Deve corregere bene la domanda NT coretta', function () {
            var currentQuest = new CurrentQuestion(questions[6]);
            expect(currentQuest).toBeDefined;
            currentQuest.selectedAnswer = 1.74;
            var res = currentQuest.point();
            expect(res).toBeDefined();
            expect(res.point).toEqual(1);
            expect(res.tot).toEqual(1);
            expect(currentQuest.right).toEqual(true);
            expect(currentQuest.answered()).toEqual(true);


        });


    });
});