'use strict';

describe('QuestionServiceModule', function () {

    var $httpBackend;
    var QuestionService;
    var Configuration;
    beforeEach(module('QuestionServiceModule'));
    beforeEach(inject(function ($injector) {
        $httpBackend = $injector.get('$httpBackend');
        QuestionService = $injector.get('model.service.QuestionService');
        Configuration = $injector.get('app.Configuration');
    }));

    describe('model.service.QuestionService', function () {

        it("effettua la richiesta corretta per post della domanda", function () {
            var question = {
                author: "autorTest",
                body: "<TF>\nQuesta domanda è da test?\n[T]",
                tags: ['tagid1','tagid2']
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

            QuestionService.new(question,function() {
                expect(true).toBe(true);
            }, function() {
                expect(true).toBe(false);
            });
            $httpBackend.flush();

        });

        it("rifiuta correttamente domande incorrette", function () {
            var question = {
                author: "autorTest",
                body: "<TF>\nQuesta domanda è da test?\n[T]",
                tags: ['tagid1','tagid2']
            };
            var wrongQuestion = {
                author: "autorTest",
                body: "<TF>\nQuesta domanda è sbagliata?",
                tags: ['tagid1','tagid2']
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

            QuestionService.new(wrongQuestion, function() {
                expect(true).toBe(false);
            }, function() {
                expect(true).toBe(true);
            });
            $httpBackend.flush();

        });

    });

});