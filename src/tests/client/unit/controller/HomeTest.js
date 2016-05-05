describe('controller.public.Home', function() {

    var $location;
    var $rootScope;
    var $scope;
    var $cookies;
    var controller;
    beforeEach(function() {
        module('app.App', function($provide){
            var UserService = function () {
                this.getMe = function(success, fail) {
                    return success({
                        _id: 'id_user',
                        userName: 'mario.rossi',
                        fullName: 'Mario Rossi',
                        role: 'id_ruolo'
                    });
                };
            };
            $provide.service("model.service.UserService", UserService);
        });
        inject(function($injector) {
            $location = $injector.get('$location');
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $cookies = $injector.get('$cookies');
            var $controller = $injector.get('$controller');
            controller = $controller('controller.public.Home', {
                $location: $location,
                $rootScope: $rootScope,
                $scope: $scope,
                $cookies: $cookies
            });
        });
    });

    describe('checkLogged', function() {

        it('should have a method to check if the path is active', function() {
            $cookies.put('connect.sid', "id_sessione");
            $scope.checkLogged();
            expect($rootScope.me._id).toBe('id_user');
            expect($rootScope.me.userName).toBe('mario.rossi');
            expect($rootScope.me.fullName).toBe('Mario Rossi');
            expect($rootScope.me.role).toBe('id_ruolo');
            expect($rootScope.logged).toBe(true);
        });

    });
<<<<<<< HEAD
    describe('urlPath', function() {

        it('should have a method to check if the path is active', function() {
            $location.path('/path/giusto');
            expect($scope.urlPath()).toEqual(('/path/giusto').split('/'));
        });

    });
=======
>>>>>>> naughty

});