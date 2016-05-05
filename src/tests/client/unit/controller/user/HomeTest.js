describe('controller.user.Home', function() {

    var $location;
    var $rootScope;
    var $scope;
    var $cookies;
    var controller;
    var users = [
        {
            _id: 'id_user_1',
            userName: 'mario.rossi',
            fullName: 'Mario Rossi',
            role: 'role_id_1'
        },
        {
            _id: 'id_user_2',
            userName: 'giovanni.rossi',
            fullName: 'Giovanni Rossi',
            role: 'role_id_2'
        },
        {
            _id: 'id_user_3',
            userName: 'giacomo.rossi',
            fullName: 'Giacomo Rossi',
            role: 'role_id_3'
        }
    ];
    var roles = [
        { _id: 'role_id_1', name: 'student' },
        { _id: 'role_id_2', name: 'teacher' },
        { _id: 'role_id_3', name: 'admin' },
        { _id: 'role_id_4', name: 'superadmin' }
    ];
    beforeEach(function() {
        module('app.App', function($provide){
            var SessionService = function () {
                this.logout = function(success, fail) {
                    success();
                };
            };
            $provide.service("model.service.SessionService", SessionService);
        });
        inject(function($injector) {
            $location = $injector.get('$location');
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $cookies = $injector.get('$cookies');
            var $controller = $injector.get('$controller');
            controller = $controller('controller.user.Home', {
                $location: $location,
                $rootScope: $rootScope,
                $scope: $scope,
                $cookies: $cookies
            });
        });
    });

    describe('logout', function() {

        it('it should filter the list of roles', function() {
            $cookies.put('connect.sid', "id_sessione");
            $rootScope.me = { 
                _id: 'user_id_1', 
                userName: 'mario.rossi',
                fullName: 'Mario Rossi',
                role: 'role_id_1'
            };
            $cookies.put('me', $rootScope.me);
            $rootScope.logged = true;
            $scope.logout();
            expect($rootScope.me._id).not.toBeDefined();
            expect($rootScope.logged).toBe(false);
            expect($cookies.get('connect.sid')).not.toBeDefined();
            expect($cookies.get('me')).not.toBeDefined();
        });

    });

});