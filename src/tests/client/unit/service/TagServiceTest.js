'use strict';

describe('model.service.TagService', function () {

    var $httpBackend;
    var TagService;
    var Configuration;
    beforeEach(module('TagServiceModule'));
    beforeEach(inject(function ($injector) {
        $httpBackend = $injector.get('$httpBackend');
        TagService = $injector.get('model.service.TagService');
        Configuration = $injector.get('app.Configuration');
    }));

    describe('get', function () {

        it("effettua la richiesta corretta", function () {

            var uri = 'api/tags?keywords=';

            $httpBackend
            .whenGET(Configuration.remote + uri).respond(200, [
                {
                    _id: "1",
                    name: "Matematica",
                    description: "Descrizione matematica"
                },
                {
                    _id: "1",
                    name: "Informatica",
                    description: "Descrizione informatica"
                },
            ]);

            $httpBackend
            .expectGET(Configuration.remote + uri);

            TagService.get([], function() {
                expect(true).toBe(true);
            }, function() {
                expect(true).toBe(false);
            });

            $httpBackend.flush();

        });

        it("effettua la richiesta corretta con keywords", function () {

            var uri = 'api/tags?keywords=mat|desc|info';

            $httpBackend
            .whenGET(Configuration.remote + uri).respond(200, [
                {
                    _id: "1",
                    name: "Matematica",
                    description: "Descrizione matematica"
                },
                {
                    _id: "1",
                    name: "Informatica",
                    description: "Descrizione informatica"
                },
            ]);

            $httpBackend
            .expectGET(Configuration.remote + uri);

            var keywords = ['mat', 'desc', 'info']
            TagService.get(keywords, function() {
                expect(true).toBe(true);
            }, function() {
                expect(true).toBe(false);
            });

            $httpBackend.flush();

        });

    });

    describe('getByID', function () {

        it("effettua la richiesta corretta", function () {

            $httpBackend
            .whenGET(Configuration.remote + 'api/tags/2').respond(200, {
                _id: "1",
                name: "Informatica",
                description: "Descrizione informatica"
            });

            $httpBackend
            .expectGET(Configuration.remote + 'api/tags/2');

            TagService.getByID('2', function() {
                expect(true).toBe(true);
            }, function() {
                expect(true).toBe(false);
            });

            $httpBackend.flush();

        });

    });

    describe('modify', function () {

        it("effettua la richiesta corretta", function () {

            var oldTag = {
                _id: "2",
                name: "Informatica",
                description: "Descrizione informatica"
            };

            var newTag = {
                _id: "2",
                name: "Matematica",
                description: "Descrizione matematica"
            };

            $httpBackend
            .whenPUT(Configuration.remote + 'api/tags/2', newTag).respond(200);

            $httpBackend
            .expectPUT(Configuration.remote + 'api/tags/2', newTag);

            TagService.modify(newTag, function() {
                expect(true).toBe(true);
            }, function() {
                expect(true).toBe(false);
            });

            $httpBackend.flush();

        });

    });

    describe('new', function () {

        it("effettua la richiesta corretta", function () {

            var newTag = {
                name: "Matematica",
                description: "Descrizione matematica"
            };

            $httpBackend
            .whenPOST(Configuration.remote + 'api/tags', newTag).respond(200);

            $httpBackend
            .expectPOST(Configuration.remote + 'api/tags', newTag);

            TagService.new(newTag, function() {
                expect(true).toBe(true);
            }, function() {
                expect(true).toBe(false);
            });

            $httpBackend.flush();

        });

    });

    describe('delete', function () {

        it("effettua la richiesta corretta", function () {

            var oldTag = {
                _id: '2',
                name: "Matematica",
                description: "Descrizione matematica"
            };

            $httpBackend
            .whenDELETE(Configuration.remote + 'api/tags/2').respond(200);

            $httpBackend
            .expectDELETE(Configuration.remote + 'api/tags/2');

            TagService.delete(oldTag, function() {
                expect(true).toBe(true);
            }, function() {
                expect(true).toBe(false);
            });

            $httpBackend.flush();

        });

    });

});