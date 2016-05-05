'use strict';

describe('model.service.QuestionService', function () {

    var $httpBackend;
    var QuestionService;
    var Configuration;
    beforeEach(module('QuestionServiceModule'));
    beforeEach(inject(function ($injector) {
        $httpBackend = $injector.get('$httpBackend');
        QuestionService = $injector.get('model.service.QuestionService');
        Configuration = $injector.get('app.Configuration');
    }));

        describe("Test QuestionService.new", function () {

            it("effettua la richiesta corretta per post della domanda", function () {
                var question = {
                    author: "autorTest",
                    body: "<TF>\nQuesta domanda è da test?\n[T]",
                    tags: ['tagid1', 'tagid2']
                };

                $httpBackend
                    .whenPOST(Configuration.remote + 'api/questions', {
                        author: question.author,
                        body: question.body,
                        tags: question.tags

                    }).respond(200, 'OK');

                $httpBackend
                    .expectPOST(Configuration.remote + 'api/questions', {
                        author: question.author,
                        body: question.body,
                        tags: question.tags
                    });

                QuestionService.new(question, function () {
                    expect(true).toBe(true);
                }, function () {
                    expect(true).toBe(false);
                });
                $httpBackend.flush();

            });

            it("rifiuta correttamente post delle domande incorrette", function () {
                var question = {
                    author: "autorTest",
                    body: "<TF>\nQuesta domanda è da test?\n[T]",
                    tags: ['tagid1', 'tagid2']
                };
                var wrongQuestion = {
                    author: "autorTest",
                    body: "<TF>\nQuesta domanda è sbagliata?",
                    tags: ['tagid1', 'tagid2']
                };

                $httpBackend
                    .whenPOST(Configuration.remote + 'api/questions', {
                        author: question.author,
                        body: question.body,
                        tags: question.tags
                    }).respond(200);

                $httpBackend
                    .whenPOST(Configuration.remote + 'api/questions', {
                        author: wrongQuestion.author,
                        body: wrongQuestion.body,
                        tags: wrongQuestion.tags
                    }).respond(400);

                $httpBackend
                    .expectPOST(Configuration.remote + 'api/questions', {
                        author: wrongQuestion.author,
                        body: wrongQuestion.body,
                        tags: wrongQuestion.tags
                    });

                QuestionService.new(wrongQuestion, function () {
                    expect(true).toBe(false);
                }, function () {
                    expect(true).toBe(true);
                });
                $httpBackend.flush();

            });
        });
        describe("Test QuestionService.modify", function () {

            it("effettua la richiesta corretta per put della domanda", function () {
                var question = {
                    id: "questionTest",
                    body: "<TF>\nQuesta domanda è da test?\n[T]",
                    tags: ['tagid1', 'tagid2']
                };

                $httpBackend
                    .whenPUT(Configuration.remote + 'api/questions/' + question.id, {
                        body: question.body,
                        tags: question.tags

                    }).respond(200, 'OK');

                $httpBackend
                    .expectPUT(Configuration.remote + 'api/questions/' + question.id, {
                        body: question.body,
                        tags: question.tags
                    });

                QuestionService.modify(question, function () {
                    expect(true).toBe(true);
                }, function () {
                    expect(true).toBe(false);
                });
                $httpBackend.flush();

            });
        });
        describe("Test QuestionService.getByID", function () {

            it("effettua la richiesta dei question per id", function () {
                var question = {
                    _id: "questionTest",
                    author: "autorTest",
                    body: "<TF>\nQuesta domanda è da test?\n[T]",
                    tags: ['tagid1', 'tagid2']
                };

                $httpBackend
                    .whenGET(Configuration.remote + 'api/questions/' + question._id, {}).respond(question);


                $httpBackend
                    .expectGET(Configuration.remote + 'api/questions/' + question._id, {
                        "Accept": "application/json, text/plain, */*"
                    }).respond(question);

                QuestionService.getByID(question._id, function (ret) {
                    expect(true).toBe(true);
                }, function () {
                    expect(true).toBe(false);
                });
                $httpBackend.flush();

            });
        });
        describe("test QuestionService.get", function () {

            it("effettua la richiesta dei questions con author, keywords, tags ", function () {
                var author = ['testAuthor'];
                var keywords = ['key1', 'key2'];
                var tags = ['testTag1', 'testTag2'];
                var param = function (author, keywords, tags) {
                    return 'api/questions?' +
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
                        '&keywords=' + function () {
                            var a = '';
                            if (keywords instanceof Array)
                                keywords.forEach(function (item) {
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
                        }();
                };

                $httpBackend
                    .whenGET(Configuration.remote + param(author, keywords, tags), {}).respond([{
                    " body ": "<TF>\nQuesta domanda è da test?\n[T]",
                    " tags ": ['tagid1', 'tagid2']
                }]);

                $httpBackend
                    .expectGET(Configuration.remote + param(author, keywords, tags), {
                        "Accept": "application/json, text/plain, */*"

                    }).respond(
                    [{
                        " body ": "<TF>\nQuesta domanda è da test?\n[T]",
                        " tags ": ['tagid1', 'tagid2']
                    }]
                );

                QuestionService.get(author, keywords, tags, function (ret) {
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
                var param = function (author, keywords, tags) {
                    return 'api/questions?' +
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
                        '&keywords=' + function () {
                            var a = '';
                            if (keywords instanceof Array)
                                keywords.forEach(function (item) {
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
                        }();
                };

                $httpBackend
                    .whenGET(Configuration.remote + param(author, keywords, tags), {}).respond([]);
                $httpBackend
                    .expectGET(Configuration.remote + param(author, keywords, tags), {
                        "Accept": "application/json, text/plain, */*"

                    }).respond([]);

                QuestionService.get(author, keywords, tags, function () {
                    expect(true).toBe(true);
                }, function () {
                    expect(true).toBe(false);
                });
                $httpBackend.flush();

            });
        });
    describe("test QuestionService.delete", function () {
        
        it("effettua la richiesta corretta per delete della domanda", function () {
            var question = {
                id: "questionTest",
                author: "autorTest",
                body: "<TF>\nQuesta domanda è da test?\n[T]",
                tags: ['tagid1', 'tagid2']
            };

            $httpBackend
                .whenDELETE(Configuration.remote + 'api/questions/' + question.id, {
                }).respond(200, 'OK');

            $httpBackend
                .expectDELETE(Configuration.remote + 'api/questions/' + question.id, {
                    "Accept":"application/json, text/plain, */*"
                }).respond(200, 'OK');

            QuestionService.delete(question, function () {
                expect(true).toBe(true);
            }, function () {
                expect(true).toBe(false);
            });
            $httpBackend.flush();

        });
        
    });

});