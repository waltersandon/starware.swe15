'use strict';

describe('model.service.AnswerService', function () {

    var $httpBackend;
    var AnswerService;
    var Configuration;
    beforeEach(module('AnswerServiceModule'));
    beforeEach(inject(function ($injector) {
        $httpBackend = $injector.get('$httpBackend');
        AnswerService = $injector.get('model.service.AnswerService');
        Configuration = $injector.get('app.Configuration');
    }));

    describe("Test AnswerService.new", function () {

        it("effettua la richiesta corretta per post della answer", function () {
            var answer = {
                questionnaire: {id:'testQuestionnaire'},
                question: {id:'testQuestion'},
                score: 0.5
            };

            $httpBackend
                .whenPOST(Configuration.remote + 'api/answers', {
                    questionnaire: answer.questionnaire.id,
                    question: answer.question.id,
                    score: answer.score

                }).respond(200, 'OK');

            $httpBackend
                .expectPOST(Configuration.remote + 'api/answers', {
                    questionnaire: answer.questionnaire.id,
                    question: answer.question.id,
                    score: answer.score
                });

            AnswerService.new(answer.questionnaire,answer.question,answer.score, function () {
                expect(true).toBe(true);
            }, function () {
                expect(true).toBe(false);
            });
            $httpBackend.flush();

        });

        it("rifiuta correttamente post delle answers incorrette", function () {
            var answer = {
                questionnaire: {id:'testQuestionnaire'},
                question:{id: 'testQuestion'},
                score: 0.5
            };
            var wrongAnswer = {
                questionnaire: [],
                question: {id:'testQuestion'},
                score: 0.5
            };

            $httpBackend
                .whenPOST(Configuration.remote + 'api/answers', {
                    questionnaire: answer.questionnaire,
                    question: answer.question,
                    score: answer.score
                }).respond(200);

            $httpBackend
                .whenPOST(Configuration.remote + 'api/answers', {
                    questionnaire: wrongAnswer.questionnaire.id,
                    question: wrongAnswer.question.id,
                    score: wrongAnswer.score
                }).respond(400);

            $httpBackend
                .expectPOST(Configuration.remote + 'api/answers', {
                    questionnaire: wrongAnswer.questionnaire.id,
                    question: wrongAnswer.question.id,
                    score: wrongAnswer.score
                });

            AnswerService.new(wrongAnswer.questionnaire,wrongAnswer.question,wrongAnswer.score, function () {
                expect(true).toBe(false);
            }, function () {
                expect(true).toBe(true);
            });
            $httpBackend.flush();

        });
    });


    describe("test AnswerService.get", function () {

        it("effettua la richiesta dei answers con questionnaires, questions ", function () {
            var answer = {
                _id: "answerTest",
                question: "questioTest",
                questionnaire: 'questionnaireTest',
                author: "TestAuthor",
                score: 0.5
            };
            var questionnaire = ['key1', 'key2'];
            var question = ['key1question', 'key2question'];
            var author = "";
            var param = function (questionnaire, question, author) {
                return'api/answers?' +
                    'questionnaires=' + function () {
                        var a = '';
                        if (questionnaire instanceof Array)
                            questionnaire.forEach(function (item) {
                                a += item + '|';
                            });
                        if (a.length >= 1)
                            a = a.substr(0, a.length - 1);
                        return a;
                    }() +
                    '&questions=' + function () {
                        var a = '';
                        if (question instanceof Array)
                            question.forEach(function (item) {
                                a += item + '|';
                            });
                        if (a.length >= 1)
                            a = a.substr(0, a.length - 1);
                        return a;
                    }()+
                    '&authors=' + function () {
                        var a = '';
                        if (author instanceof Array)
                            author.forEach(function (item) {
                                a += item + '|';
                            });
                        if (a.length >= 1)
                            a = a.substr(0, a.length - 1);
                        return a;
                    }();
            };

            $httpBackend
                .whenGET(Configuration.remote + param(questionnaire, question,author), {

                }).respond([answer]);

            $httpBackend
                .expectGET(Configuration.remote + param(questionnaire, question,author), {
                    "Accept": "application/json, text/plain, */*"

                }).respond([answer]);

            AnswerService.get(questionnaire, question,author, function (ret) {
                expect(true).toBe(true);
            }, function () {
                expect(true).toBe(false);
            });
            $httpBackend.flush();

        });
        it("gestisce correttamente risposta vuota", function () {
            var questionnaire = ['key1', 'key2'];
            var question = ['key1question', 'key2question'];
            var author = "";
            var param = function (questionnaire, question, author) {
                return'api/answers?' +
                    'questionnaires=' + function () {
                        var a = '';
                        if (questionnaire instanceof Array)
                            questionnaire.forEach(function (item) {
                                a += item + '|';
                            });
                        if (a.length >= 1)
                            a = a.substr(0, a.length - 1);
                        return a;
                    }() +
                    '&questions=' + function () {
                        var a = '';
                        if (question instanceof Array)
                            question.forEach(function (item) {
                                a += item + '|';
                            });
                        if (a.length >= 1)
                            a = a.substr(0, a.length - 1);
                        return a;
                    }()+
                    '&authors=' + function () {
                        var a = '';
                        if (author instanceof Array)
                            author.forEach(function (item) {
                                a += item + '|';
                            });
                        if (a.length >= 1)
                            a = a.substr(0, a.length - 1);
                        return a;
                    }();
            };

            $httpBackend
                .whenGET(Configuration.remote + param(questionnaire, question, author), {}).respond([]);
            $httpBackend
                .expectGET(Configuration.remote + param(questionnaire, question, author), {
                    "Accept": "application/json, text/plain, */*"

                }).respond([]);

            AnswerService.get(questionnaire, question,author, function () {
                expect(true).toBe(true);
            }, function () {
                expect(true).toBe(false);
            });
            $httpBackend.flush();

        });
    });


});