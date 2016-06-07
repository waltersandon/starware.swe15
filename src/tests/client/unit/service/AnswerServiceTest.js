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
                questionnaire: 'testQuestionnaire',
                question: 'testQuestion',
                score: 0.5
            };

            $httpBackend
                .whenPOST(Configuration.remote + 'api/answers', {
                    questionnaire: answer.questionnaire,
                    question: answer.question,
                    score: answer.score

                }).respond(200, 'OK');

            $httpBackend
                .expectPOST(Configuration.remote + 'api/answers', {
                    questionnaire: answer.questionnaire,
                    question: answer.question,
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
                questionnaire: 'testQuestionnaire',
                question: 'testQuestion',
                score: 0.5
            };
            var wrongAnswer = {
                questionnaire: [],
                question: 'testQuestion',
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
                    questionnaire: wrongAnswer.questionnaire,
                    question: wrongAnswer.question,
                    score: wrongAnswer.score
                }).respond(400);

            $httpBackend
                .expectPOST(Configuration.remote + 'api/answers', {
                    questionnaire: wrongAnswer.questionnaire,
                    question: wrongAnswer.question,
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
            var questionnaires = ['key1', 'key2'];
            var questions = ['key1question', 'key2question'];
            var param = function (questionnaires, questions) {
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
                    }();
            };

            $httpBackend
                .whenGET(Configuration.remote + param(questionnaires, questions), {}).respond([answer]);

            $httpBackend
                .expectGET(Configuration.remote + param(questionnaires, questions), {
                    "Accept": "application/json, text/plain, */*"

                }).respond([answer]);

            AnswerService.get(questionnaires, questions, function (ret) {
                expect(true).toBe(true);
            }, function () {
                expect(true).toBe(false);
            });
            $httpBackend.flush();

        });
        it("gestisce correttamente risposta vuota", function () {
            var questionnaires = ['key1', 'key2'];
            var questions = ['key1question', 'key2question'];
            var param = function (questionnaires, questions) {
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
                    }();
            };

            $httpBackend
                .whenGET(Configuration.remote + param(questionnaires, questions), {}).respond([]);
            $httpBackend
                .expectGET(Configuration.remote + param(questionnaires, questions), {
                    "Accept": "application/json, text/plain, */*"

                }).respond([]);

            AnswerService.get(questionnaires, questions, function () {
                expect(true).toBe(true);
            }, function () {
                expect(true).toBe(false);
            });
            $httpBackend.flush();

        });
    });


});