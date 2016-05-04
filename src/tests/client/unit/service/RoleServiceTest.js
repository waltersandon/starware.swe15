'use strict';

describe('RoleServiceModule', function () {

    var $httpBackend;
    var RoleService;
    var Configuration;
    beforeEach(module('RoleServiceModule'));
    beforeEach(inject(function ($injector) {
        $httpBackend = $injector.get('$httpBackend');
        RoleService = $injector.get('model.service.RoleService');
        Configuration = $injector.get('app.Configuration');
    }));

    describe('model.service.RoleService', function () {

        it("effettua la richiesta dei role con keywords ", function () {
            var keywords = ['key1','key2'];
            var param = function (keywords) {
                return 'api/roles?' +
                'keywords=' + function () {
                    var a = '';
                    if (keywords instanceof Array)
                        keywords.forEach(function (item) {
                            a += item + '|';
                        });
                    if (a.length >= 1)
                        a = a.substr(0, a.length - 1);
                    return a;
                }();};

            $httpBackend
                .whenGET(Configuration.remote + param(keywords) , {
                }).respond([{
                            "_id": "idrole" ,
                            "name": "testRole"
                 }]);

            $httpBackend
                .expectGET(Configuration.remote + param(keywords),{
                    "Accept":"application/json, text/plain, */*"

            }).respond(
                [{
                    "_id": "idrole" ,
                    "name": "testRole"
                }]
            );

            RoleService.get(keywords,function(ret) {
                expect(true).toBe(true);
            }, function() {
                expect(true).toBe(false);
            });
            $httpBackend.flush();

        });

        it("effettua la richiesta dei role per id", function () {
            var id = 'idrole';

            $httpBackend
                .whenGET(Configuration.remote + 'api/roles/'+id, {
                }).respond(
                {
                    "_id": "idrole" ,
                    "name": "testRole"
                }
            );


            $httpBackend
                .expectGET(Configuration.remote + 'api/roles/'+id, {
                    "Accept":"application/json, text/plain, */*"

                }).respond(
                {
                    "_id": "idrole" ,
                    "name": "testRole"
                }
            );

            RoleService.getByID(id,function(ret) {
                expect(true).toBe(true);
            }, function() {
                expect(true).toBe(false);
            });
            $httpBackend.flush();

        });

    });

});