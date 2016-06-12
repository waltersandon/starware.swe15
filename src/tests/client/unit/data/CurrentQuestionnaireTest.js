describe('model.data.CurrentQuestionnaire', function() {
    var CurrentQuestionnaire;
    var CurrentQuestionMock;
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
    
    var score = [
        {
            _id: "test_score_1",
            question: "id_question_1",
            questionnaire: "id_questionnaire_1",
            author: "id_author_1",
            score: 1
        },
        {
            _id: "test_score_2",
            question: "id_question_2",
            questionnaire: "id_questionnaire_1",
            author: "id_author_1",
            score: 1
        }
    ];

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
                this.get = function(questionnaire, question,author, next, err) {
                    questionnaire == 'id_questionnaire_1' ? next(score) : next([]);


                };
                this.new = function (questionnaire, question, score, next, err) {
                    expect(score).toEqual(1);
                    next();
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


        });


    });
    describe('Controllo statistiche test getResult ', function () {
        it('Deve visualizzare le statistiche', function () {
            var currentQuest = new CurrentQuestionnaire(questionnaires[0]);

            currentQuest.questions = [];

            currentQuest.questions.push(new  CurrentQuestionMock(questions[0]));
            currentQuest.questions.push(new  CurrentQuestionMock(questions[1]));


            currentQuest.getResult(function (res) {
                expect(res).toBeDefined();
            });

            currentQuest.questions.forEach(function (item) {
                expect(item.stat).toMatch('100%');

            });

        });

        it('Deve gestire caso del scores al nuovo questionario', function () {
            var currentQuest = new CurrentQuestionnaire(questionnaires[1]);

            currentQuest.questions = [];

            currentQuest.questions.push(new  CurrentQuestionMock(questions[0]));
            currentQuest.questions.push(new  CurrentQuestionMock(questions[1]));


            currentQuest.getResult(function (res) {
                expect(res).toBeDefined();
            });

            currentQuest.questions.forEach(function (item) {
                expect(item.stat).toMatch('Non sono presenti statistiche precedenti per questa domanda');

            });
        });

    });
    describe('Controllo getCurrentQuestions ', function () {
        it('Deve ritornare la liste delle currentQuestions', function () {
            var currentQuest = new CurrentQuestionnaire(questionnaires[0]);
            currentQuest.questions = [];
            var res = currentQuest.getCurrentQuestions();
            expect(res).toBeDefined();
        });
    });
    describe('Controllo checkAnswers ', function () {
        it('Deve ritornare la liste delle currentQuestions', function () {
            var currentQuest = new CurrentQuestionnaire(questionnaires[0]);
            currentQuest.questions = [];
            currentQuest.questions.push(new  CurrentQuestionMock(questions[0]));
            currentQuest.questions.push(new  CurrentQuestionMock(questions[1]));

            var res = currentQuest.checkAnswers();
            expect(res).toBe(true);
        });
    });





});