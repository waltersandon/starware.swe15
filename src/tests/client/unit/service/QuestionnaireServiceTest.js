'use strict';

describe('model.service.QuestionnaireService', function () {

    var $httpBackend;
    var QuestionnaireService;
    var Configuration;
    beforeEach(module('QuestionnaireServiceModule'));
    beforeEach(inject(function ($injector) {
        $httpBackend = $injector.get('$httpBackend');
        QuestionnaireService = $injector.get('model.service.QuestionnaireService');
        Configuration = $injector.get('app.Configuration');
    }));

    describe("Test QuestionnaireService.new", function () {

        it("effettua la richiesta corretta per post della domanda", function () {
            var questionnaire = {
                author: "TestAuthor",
                questions: ['testQuestion1','testQuestion2'],
                tags: ['testTag1','testTag2'],
                title: "Questionario Test"
            };

            $httpBackend
                .whenPOST(Configuration.remote + 'api/questionnaires', {
                    author: questionnaire.author,
                    questions: questionnaire.questions,
                    tags: questionnaire.tags,
                    title: questionnaire.title

                }).respond(200, 'OK');

            $httpBackend
                .expectPOST(Configuration.remote + 'api/questionnaires', {
                    author: questionnaire.author,
                    questions: questionnaire.questions,
                    tags: questionnaire.tags,
                    title: questionnaire.title
                });

            QuestionnaireService.new(questionnaire, function () {
                expect(true).toBe(true);
            }, function () {
                expect(true).toBe(false);
            });
            $httpBackend.flush();

        });

        it("rifiuta correttamente post delle domande incorrette", function () {
            var questionnaire = {
                author: "TestAuthor",
                questions: ['testQuestion1','testQuestion2'],
                tags: ['testTag1','testTag2'],
                title: "Questionario Test"
            };
            var wrongQuestionnaire = {
                author: "TestAuthor",
                questions: [],
                tags: ['testTag1','testTag2'],
                title: "Questionario Test"
            };

            $httpBackend
                .whenPOST(Configuration.remote + 'api/questionnaires', {
                    author: questionnaire.author,
                    questions: questionnaire.questions,
                    tags: questionnaire.tags,
                    title: questionnaire.title
                }).respond(200);

            $httpBackend
                .whenPOST(Configuration.remote + 'api/questionnaires', {
                    author: wrongQuestionnaire.author,
                    questions: wrongQuestionnaire.questions,
                    tags: wrongQuestionnaire.tags,
                    title: wrongQuestionnaire.title
                }).respond(400);

            $httpBackend
                .expectPOST(Configuration.remote + 'api/questionnaires', {
                    author: wrongQuestionnaire.author,
                    questions: wrongQuestionnaire.questions,
                    tags: wrongQuestionnaire.tags,
                    title: wrongQuestionnaire.title
                });

            QuestionnaireService.new(wrongQuestionnaire, function () {
                expect(true).toBe(false);
            }, function () {
                expect(true).toBe(true);
            });
            $httpBackend.flush();

        });
    });
    describe("Test QuestionnaireService.modify", function () {

        it("effettua la richiesta corretta per put della domanda", function () {
            var questionnaire = {
                id: "questionnaireTest",
                questions: ['testQuestion1','testQuestion2'],
                tags: ['testTag1','testTag2'],
                title: "Questionario Test"
            };

            $httpBackend
                .whenPUT(Configuration.remote + 'api/questionnaires/' + questionnaire.id, {
                    questions: questionnaire.questions,
                    tags: questionnaire.tags,
                    title: questionnaire.title

                }).respond(200, 'OK');

            $httpBackend
                .expectPUT(Configuration.remote + 'api/questionnaires/' + questionnaire.id, {
                    questions: questionnaire.questions,
                    tags: questionnaire.tags,
                    title: questionnaire.title
                });

            QuestionnaireService.modify(questionnaire, function () {
                expect(true).toBe(true);
            }, function () {
                expect(true).toBe(false);
            });
            $httpBackend.flush();

        });
    });
    describe("Test QuestionnaireService.getByID", function () {

        it("effettua la richiesta dei question per id", function () {
            var questionnaire = {
                _id: "questionTest",
                author: "TestAuthor",
                questions: ['testQuestion1','testQuestion2'],
                tags: ['testTag1','testTag2'],
                title: "Questionario Test"
            };

            $httpBackend
                .whenGET(Configuration.remote + 'api/questionnaires/' + questionnaire._id, {}).respond(questionnaire);


            $httpBackend
                .expectGET(Configuration.remote + 'api/questionnaires/' + questionnaire._id, {
                    "Accept": "application/json, text/plain, */*"
                }).respond(questionnaire);

            QuestionnaireService.getByID(questionnaire._id, function (ret) {
                expect(true).toBe(true);
            }, function () {
                expect(true).toBe(false);
            });
            $httpBackend.flush();

        });
    });
    describe("test QuestionnaireService.get", function () {

        it("effettua la richiesta dei questions con author, keywords, tags ", function () {
            var questionnaire = {
                id: "questionnaireTest",
                author: "TestAuthor",
                questions: ['testQuestion1','testQuestion2'],
                tags: ['testTag1','testTag2'],
                title: "Questionario Test"
            };
            var author = ['testAuthor'];
            var title = ['Questionario Test'];
            var tags = ['testTag1', 'testTag2'];
            var param = function (author, tags, title) {
                return'api/questionnaires?' +
                    'author=' + function () {
                        var a = '';
                        if (author instanceof Array)
                            author.forEach(function (item) {
                                a += item + '|';
                            });
                        if (a.length >= 1)
                            a = a.substr(0, a.length - 1);
                        return a;
                    }() +
                    '&tags=' + function () {
                        var a = '';
                        if (tags instanceof Array)
                            tags.forEach(function (item) {
                                a += item + '|';
                            });
                        if (a.length >= 1)
                            a = a.substr(0, a.length - 1);
                        return a;
                    }() +
                    '&title=' + function () {
                        var a = '';
                        if (title instanceof Array)
                            title.forEach(function (item) {
                                a += item + '|';
                            });
                        if (a.length >= 1)
                            a = a.substr(0, a.length - 1);
                        return a;
                    }();
            };

            $httpBackend
                .whenGET(Configuration.remote + param(author, title, tags), {}).respond([questionnaire]);

            $httpBackend
                .expectGET(Configuration.remote + param(author, title, tags), {
                    "Accept": "application/json, text/plain, */*"

                }).respond([questionnaire]);

            QuestionnaireService.get(author, title, tags, function (ret) {
                expect(true).toBe(true);
            }, function () {
                expect(true).toBe(false);
            });
            $httpBackend.flush();

        });
        it("gestisce correttamente risposta vuota", function () {
            var author = ['testAuthor'];
            var keywords = ['key1', 'key2'];
            var tags = ['testTag1', 'testTag2'];
            var param = function (author, tags, title) {
                return'api/questionnaires?' +
                    'author=' + function () {
                        var a = '';
                        if (author instanceof Array)
                            author.forEach(function (item) {
                                a += item + '|';
                            });
                        if (a.length >= 1)
                            a = a.substr(0, a.length - 1);
                        return a;
                    }() +
                    '&tags=' + function () {
                        var a = '';
                        if (tags instanceof Array)
                            tags.forEach(function (item) {
                                a += item + '|';
                            });
                        if (a.length >= 1)
                            a = a.substr(0, a.length - 1);
                        return a;
                    }() +
                    '&title=' + function () {
                        var a = '';
                        if (title instanceof Array)
                            title.forEach(function (item) {
                                a += item + '|';
                            });
                        if (a.length >= 1)
                            a = a.substr(0, a.length - 1);
                        return a;
                    }();
            };

            $httpBackend
                .whenGET(Configuration.remote + param(author, keywords, tags), {}).respond([]);
            $httpBackend
                .expectGET(Configuration.remote + param(author, keywords, tags), {
                    "Accept": "application/json, text/plain, */*"

                }).respond([]);

            QuestionnaireService.get(author, keywords, tags, function () {
                expect(true).toBe(true);
            }, function () {
                expect(true).toBe(false);
            });
            $httpBackend.flush();

        });
    });
    describe("test QuestionnaireService.delete", function () {

        it("effettua la richiesta corretta per delete della domanda", function () {
            var questionnaire = {
                id: "questionnaireTest",
                author: "TestAuthor",
                questions: ['testQuestion1','testQuestion2'],
                tags: ['testTag1','testTag2'],
                title: "Questionario Test"
            };

            $httpBackend
                .whenDELETE(Configuration.remote + 'api/questionnaires/' + questionnaire.id, {
                }).respond(200, 'OK');

            $httpBackend
                .expectDELETE(Configuration.remote + 'api/questionnaires/' + questionnaire.id, {
                    "Accept":"application/json, text/plain, */*"
                }).respond(200, 'OK');

            QuestionnaireService.delete(questionnaire, function () {
                expect(true).toBe(true);
            }, function () {
                expect(true).toBe(false);
            });
            $httpBackend.flush();

        });

    });

});