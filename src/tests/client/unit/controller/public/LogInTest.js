describe('controller.public.LogIn', function() {

    var $location;
    var $rootScope;
    var $scope;
    var $cookies;
    var controller;
    beforeEach(function () {
        module('app.App', function ($provide) {
            var UserService = function () {
                this.getMe = function (success, fail) {
                    return success({
                        _id: 'id_user',
                        userName: 'mario.rossi',
                        fullName: 'Mario Rossi',
                        role: 'id_ruolo'
                    });
                };
            };
            var Check = function () {
                this.checkPassword = function (success, fail) {
                    return success({
                        _id: 'id_user',
                        userName: 'mario.rossi',
                        fullName: 'Mario Rossi',
                        role: 'id_ruolo'
                    });
                };
                this.checkUserName = function (userName) {
                    return userName.length >= 2 ? !$scope.error.status:
                        new Error('Il <strong>nome completo</strong> deve avere almeno <strong>6</strong> caratteri',
                            'errorFullName', true, 'alert-warning');
                };
            };
            var SessionService = function () {
                this.getMe = function (success, fail) {
                    return success({
                        _id: 'id_user',
                        userName: 'mario.rossi',
                        fullName: 'Mario Rossi',
                        role: 'id_ruolo'
                    });
                };
            };

            $provide.service("model.service.UserService", UserService);
            $provide.service("util.Check", Check);
            $provide.service("model.service.SessionService", SessionService);
        });
        inject(function ($injector) {
            $location = $injector.get('$location');
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $cookies = $injector.get('$cookies');
            var $controller = $injector.get('$controller');
            controller = $controller('controller.public.LogIn', {
                $location: $location,
                $rootScope: $rootScope,
                $scope: $scope,
                $cookies: $cookies
            });
        });
    });

    describe('checkPassword', function () {

        it('should have a method to check if the path is active', function () {
            
             expect($rootScope.me._id).toBe('id_user');
            
        });

    });
    describe('checkUserName', function () {

        it('should have a method to check if the path is active', function () {
        });


    });
    describe('submit', function () {

        it('should have a method to check if the path is active', function () {
        });


    });

});