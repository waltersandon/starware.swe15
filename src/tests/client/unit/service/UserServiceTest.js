'use strict';

describe('model.service.UserService', function () {

    var $httpBackend;
    var UserService;
    var Configuration;
    beforeEach(module('UserServiceModule'));
    beforeEach(inject(function ($injector) {
        $httpBackend = $injector.get('$httpBackend');
        UserService = $injector.get('model.service.UserService');
        Configuration = $injector.get('app.Configuration');
    }));

    describe('get', function () {

        it("effettua la richiesta corretta", function () {

            $httpBackend
            .whenGET(Configuration.remote + 'api/users?fullName=&userName=').respond(200, [
                {
                    _id: "1",
                    userName: "mario.rossi",
                    fullName: "Mario Rossi",
                    role: '100'
                },
                {
                    _id: "2",
                    userName: "giovanni.bianchi",
                    fullName: "Giovanni bianchi",
                    role: '200'
                },
            ]);

            $httpBackend
            .expectGET(Configuration.remote + 'api/users?fullName=&userName=');

            UserService.get([], [], function() {
                expect(true).toBe(true);
            }, function() {
                expect(true).toBe(false);
            });

            $httpBackend.flush();

        });

        it("effettua la richiesta corretta con user names", function () {

            $httpBackend
            .whenGET(Configuration.remote + 'api/users?fullName=&userName=mario.rossi|giovanni.rossi')
            .respond(200, [
                {
                    _id: "1",
                    userName: "mario.rossi",
                    fullName: "Mario Rossi",
                    role: '100'
                }
            ]);

            $httpBackend
            .expectGET(Configuration.remote + 'api/users?fullName=&userName=mario.rossi|giovanni.rossi');

            UserService.get([], ['mario.rossi', 'giovanni.rossi'], function() {
                expect(true).toBe(true);
            }, function() {
                expect(true).toBe(false);
            });

            $httpBackend.flush();

        });

        it("effettua la richiesta corretta con full names e user names", function () {

            var uri = 'api/users?fullName=Mario Rossi|Giovanni Rossi'
                + '&userName=mario.rossi|giovanni.rossi';

            $httpBackend
            .whenGET(Configuration.remote + uri)
            .respond(200, [
                {
                    _id: "1",
                    userName: "mario.rossi",
                    fullName: "Mario Rossi",
                    role: '100'
                }
            ]);

            $httpBackend
            .expectGET(Configuration.remote + uri);

            UserService.get(
            ["Mario Rossi", "Giovanni Rossi"], 
            ['mario.rossi', 'giovanni.rossi'], 
            function() {
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
            .whenGET(Configuration.remote + 'api/users/2').respond(200, {
                _id: "2",
                userName: "giovanni.bianchi",
                fullName: "Giovanni bianchi",
                role: '200'
            });

            $httpBackend
            .expectGET(Configuration.remote + 'api/users/2');

            UserService.getByID('2', function() {
                expect(true).toBe(true);
            }, function() {
                expect(true).toBe(false);
            });

            $httpBackend.flush();

        });

    });

    describe('getMe', function () {

        it("effettua la richiesta corretta", function () {

            $httpBackend
            .whenGET(Configuration.remote + 'api/users/me').respond(200, {
                _id: "2",
                userName: "giovanni.bianchi",
                fullName: "Giovanni bianchi",
                role: '200'
            });

            $httpBackend
            .whenGET(Configuration.remote + 'api/roles/200').respond(200, {
                _id: "200",
                name: 'student'
            });

            $httpBackend
            .expectGET(Configuration.remote + 'api/users/me');

            $httpBackend
            .expectGET(Configuration.remote + 'api/roles/200');

            UserService.getMe(function() {
                expect(true).toBe(true);
            }, function() {
                expect(true).toBe(false);
            });

            $httpBackend.flush();

        });

    });

    describe('modifyRole', function () {

        it("effettua la richiesta corretta", function () {

            var userBefore = {
                _id: "2",
                userName: "giovanni.bianchi",
                fullName: "Giovanni bianchi",
                role: '200'
            };

            var userAfter = {
                _id: "2",
                userName: "giovanni.bianchi",
                fullName: "Giovanni bianchi",
                role: '400'
            };

            var newRole = {
                role: "400"
            };

            $httpBackend
            .whenPOST(Configuration.remote + 'api/users/2', newRole)
            .respond(200, userAfter);

            $httpBackend
            .expectPOST(Configuration.remote + 'api/users/2', newRole);

            UserService.modifyRole(userBefore, { _id: "400" }, function() {
                expect(true).toBe(true);
            }, function() {
                expect(true).toBe(false);
            });

            $httpBackend.flush();

        });

    });

    describe('signUp', function () {

        it("effettua la richiesta corretta", function () {

            var newUser = {
                fullName: 'Mario Rossi',
                userName: 'mario.rossi',
                password: 'password.mario.rossi'
            };

            $httpBackend
            .whenPOST(Configuration.remote + 'api/users', newUser)
            .respond(200);

            $httpBackend
            .expectPOST(Configuration.remote + 'api/users', newUser);

            UserService.signUp(newUser.fullName, newUser.password, newUser.userName, function() {
                expect(true).toBe(true);
            }, function() {
                expect(true).toBe(false);
            });

            $httpBackend.flush();

        });

    });

    describe('updateInformation', function () {

        it("effettua la richiesta corretta", function () {

            var oldUser = {
                _id: '2',
                fullName: 'Mario Rossi',
                userName: 'mario.rossi',
                password: 'password.mario.rossi'
            };

            var updates = {
                fullName: 'Giovanni Rossi',
                userName: 'giovanni.rossi'
            };

            var newUser = {
                _id: oldUser._id,
                fullName: updates.fullName,
                userName: updates.userName,
                password: oldUser.password
            };

            $httpBackend
            .whenPOST(Configuration.remote + 'api/users/me', updates)
            .respond(200, newUser);

            $httpBackend
            .expectPOST(Configuration.remote + 'api/users/me', updates);

            UserService.updateInformation(updates.fullName, updates.userName, function() {
                expect(true).toBe(true);
            }, function() {
                expect(true).toBe(false);
            });

            $httpBackend.flush();

        });

    });

    describe('updatePassword', function () {

        it("effettua la richiesta corretta", function () {

            var oldUser = {
                _id: '2',
                fullName: 'Mario Rossi',
                userName: 'mario.rossi',
                password: 'hash(password.mario.rossi)'
            };

            var updates = {
                oldPassword: oldUser.password,
                newPassword: 'password.mario.rossi.2'
            };

            var newUser = {
                _id: oldUser._id,
                fullName: oldUser.fullName,
                userName: oldUser.userName,
                password: 'hash(password.mario.rossi.2)'
            };

            $httpBackend
            .whenPOST(Configuration.remote + 'api/users/me', updates)
            .respond(200, newUser);

            $httpBackend
            .expectPOST(Configuration.remote + 'api/users/me', updates);

            UserService.updatePassword(updates.newPassword, updates.oldPassword, function() {
                expect(true).toBe(true);
            }, function() {
                expect(true).toBe(false);
            });

            $httpBackend.flush();

        });

    });

    describe('delete', function () {

        it("effettua la richiesta corretta", function () {

            var oldUser = {
                _id: '2',
                fullName: 'Mario Rossi',
                userName: 'mario.rossi',
                password: 'hash(password.mario.rossi)'
            };

            $httpBackend
            .whenDELETE(Configuration.remote + 'api/users/' + oldUser._id)
            .respond(200);

            $httpBackend
            .expectDELETE(Configuration.remote + 'api/users/' + oldUser._id);

            UserService.delete(oldUser, function() {
                expect(true).toBe(true);
            }, function() {
                expect(true).toBe(false);
            });

            $httpBackend.flush();

        });

    });

});