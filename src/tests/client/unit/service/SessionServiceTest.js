'use strict';

describe('model.service.SessionService', function () {

    var $httpBackend;
    var SessionService;
    var Configuration;
    beforeEach(module('SessionServiceModule'));
    beforeEach(inject(function ($injector) {
        $httpBackend = $injector.get('$httpBackend');
        SessionService = $injector.get('model.service.SessionService');
        Configuration = $injector.get('app.Configuration');
    }));

    describe('login', function () {

        it("effettua la richiesta corretta per l'accesso", function () {
            var username = 'mario.rossi';
            var password = 'password.mario.rossi';

            $httpBackend
            .whenPOST(Configuration.remote + 'api/session', {
                userName: username,
                password: password
            }).respond(200, 'OK');

            $httpBackend
            .expectPOST(Configuration.remote + 'api/session', {
                userName: username,
                password: password
            });

            SessionService.login(password, username, function() {
                expect(true).toBe(true);
            }, function() {
                expect(true).toBe(false);
            });
            $httpBackend.flush();

        });

        it("rifiuta correttamente credenziali incorrette", function () {
            var username = 'mario.rossi';
            var password = 'password.mario.rossi';
            var wrongPassword = 'wrong.password';

            $httpBackend
            .whenPOST(Configuration.remote + 'api/session', {
                userName: username,
                password: password
            }).respond(200);

            $httpBackend
            .whenPOST(Configuration.remote + 'api/session', {
                userName: username,
                password: wrongPassword
            }).respond(401);

            $httpBackend
            .expectPOST(Configuration.remote + 'api/session', {
                userName: username,
                password: wrongPassword
            });

            SessionService.login(wrongPassword, username, function() {
                expect(true).toBe(false);
            }, function() {
                expect(true).toBe(true);
            });
            $httpBackend.flush();

        });

    });

    describe('logout', function () {

        it("effettua la richiesta corretta per la disconnessione", function () {

            $httpBackend
            .whenDELETE(Configuration.remote + 'api/session').respond(200);

            $httpBackend
            .expectDELETE(Configuration.remote + 'api/session');

            SessionService.logout(function() {
                expect(true).toBe(true);
            }, function() {
                expect(true).toBe(false);
            });
            $httpBackend.flush();

        });

    });

});