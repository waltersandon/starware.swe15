describe('model.data.CurrentQuestionnaire', function() {
    var CurrentQuestionnaire;
    var q;
    var CurrentQuestionMock;
    var currentQuest;
    var answerMock;
    var questionnaires = [
        {
            id: 'id_questionnaire_1',
            author: 'id_author_1',
            questions: ['id_question_1','id_question_2'],
            tags: ['id_tag_1'],
            title: "Questionario Test"
        },
        {
            id: 'id_questionnaire_2',
            author: 'id_author_1',
            questions: ['id_question_1','id_question_2'],
            tags: [ 'id_tag_1'],
            title: "Questionario Test"
        },
        {
            id: 'id_questionnaire_3',
            author: 'id_author_1',
            questions: ['id_question_1','id_question_2'],
            tags: [ 'id_tag_1' ],
            title: "Questionario Test"
        }
    ];
    var author = {
        id: 'id_author_1',
        userName: 'mario.rossi',
        fullName: 'Mario Rossi',
        role: 'role_id_1'
    };
    var testTags = [{
        id: 'id_tag_1',
        name: 'Matematica',
        description: 'Descrizione matematica'
    }];
    var questions = [
        {
            id: 'id_question_1',
            body: 'Testo domanda\nSeconda linea\n(-)',
            author: 'id_author_1',
            tags: [ 'id_tag_1']
        },
        {
            id: 'id_question_2',
            body: 'Testo domanda\nSeconda linea\n(-)',
            author: 'id_author_1',
            tags: ['id_tag_1']
        },
        {
            id: 'id_question_3',
            body: 'Testo domanda\nSeconda linea\n(-)',
            author: 'id_author_1',
            tags: ['id_tag_1']
        }
    ];
    var answer = {
        question: "",
        questionnaire: "",
        score: NaN
    };

    beforeEach(function () {
        module('CurrentQuestionnaireModule', function ($provide) {
            var CurrentQuestionMock = function () {
                function CurrentQuestion(question) {
                   this.stat = [];
                }

                CurrentQuestion.prototype.answered = function () {
                   // return curQuestion.id === "id_question_1";
                    return true;
                };
                CurrentQuestion.prototype.point = function (id, success, fail) {
                    console.log("mi current hanno chiamato point");

                    return {point: 1, tot: 1, answer: true};
                };
                return CurrentQuestion;
            };

            var QuestionService = function () {
                this.getByID = function(id, success, fail) {
                    console.log("mi question hanno chiamato get");

                    var testQuestion = questions.find(function (question) {
                        return question.id === id
                    });
                    return testQuestion !== undefined ? success(testQuestion) : fail();                };
            };
            var AnswerService = function () {
                this.get = function(questionnaire, question, next, err) {
                    console.log("mi answer hanno chiamato get");
                    next();
                };
                this.new = function (questionnaire, question, score, next, err) {
                    console.log("mi anwser hanno chiamato new");
                }
            };

            $provide.factory("CurrentQuestionModule", CurrentQuestionMock);
            $provide.service("model.service.QuestionService", QuestionService);
            $provide.service("model.service.AnswerService", AnswerService);

        });
        module('app.App');
        inject(function ($injector) {
              CurrentQuestionnaire = $injector.get('model.data.CurrentQuestionnaire');
              CurrentQuestionMock = $injector.get('CurrentQuestionModule');
              answerMock = $injector.get('model.service.AnswerService');
            q = $injector.get('$q');
             currentQuest = new CurrentQuestionnaire(questionnaires[0]);


        });


    });
    describe('Controllo statistiche ', function () {
        it('Deve visualizzare le statistiche', function () {
            var currentQuest = new CurrentQuestionnaire(questionnaires[0]);
           // currentQuest.getCurrentQuestions();
            currentQuest.questions = [];

            console.log("Prima --> "+currentQuest.questions[0]);
            currentQuest.questions.push(new  CurrentQuestionMock(questions[0]));
            currentQuest.questions.push(new  CurrentQuestionMock(questions[1]));

           // console.log("lunghezza --> "+currentQuest.questions.length());

            currentQuest.getResult(function (res) {
                expect(res).toBeDefined();
                console.log("Mamma mia");
            });

            currentQuest.questions.forEach(function (item) {
                console.log("item  --> "+item.answered());

            });
            var a = 0;
for(var i = 0; i < 1000000 ; i++){ a++; }
            console.log("Mamma mia fuori --> "+currentQuest.questions[0].stat);
            currentQuest.questions[0].stat.push("dopo mamma mia");
            console.log("Mamma mia fuori 2 --> "+currentQuest.questions[0].stat);







        });
        it('Deve mandare al server nuovi scores', function () {
            //TODO
        });
        it('Deve gestire caso del scores al nuovo questionario', function () {
            //TODO
        });

    });





});