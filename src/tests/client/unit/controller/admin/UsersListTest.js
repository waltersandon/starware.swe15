describe('controller.admin.UsersList', function() {

    var $location;
    var $rootScope;
    var $scope;
    var $cookies;
    var controller;
    var users = [
        {
            id: 'id_user_1',
            userName: 'mario.rossi',
            fullName: 'Mario Rossi',
            role: 'role_id_1'
        },
        {
            id: 'id_user_2',
            userName: 'giovanni.rossi',
            fullName: 'Giovanni Rossi',
            role: 'role_id_2'
        },
        {
            id: 'id_user_3',
            userName: 'giacomo.rossi',
            fullName: 'Giacomo Rossi',
            role: 'role_id_3'
        }
    ];
    var roles = [
        { id: 'role_id_1', name: 'student' },
        { id: 'role_id_2', name: 'teacher' },
        { id: 'role_id_3', name: 'admin' },
        { id: 'role_id_4', name: 'superadmin' }
    ];
    beforeEach(function() {
        module('app.App', function($provide){
            var UserService = function () {
                this.get = function(a, b, success, fail) {
                    success(users);
                };

                this.modifyRole = function(user, role, success, fail) { success(); }
                this.delete = function(user, success, fail) { success(); }
            };
            $provide.service("model.service.UserService", UserService);
            var RoleService = function () {
                this.get = function(a, success, fail) {
                    success(roles);
                };
            };
            $provide.service("model.service.RoleService", RoleService);
        });
        inject(function($injector) {
            $location = $injector.get('$location');
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $cookies = $injector.get('$cookies');
            var $controller = $injector.get('$controller');
            controller = $controller('controller.admin.UsersList', {
                $location: $location,
                $rootScope: $rootScope,
                $scope: $scope,
                $cookies: $cookies
            });
        });
    });

    describe('filterByRole', function() {

        it('deve filtrare la lista dei ruoli', function() {
            $scope.roles = roles;
            var result = $scope.filterByRole('admin');
            expect(result).toBe('role_id_3');
        });

    });

    describe('changeUserRole', function() {

        it('deve cambiare il ruolo di un utente', function() {
            var result = $scope.changeUserRole(users[0], users[1].role, function() {
                expect(true).toBe(true);
            }, function() {
                expect(true).toBe(false);
            });
        });

    });

    describe('deleteUser', function() {

        it('deve rimuovere un utente', function() {
            var result = $scope.deleteUser(users[0], function() {
                expect(true).toBe(true);
                var deletedUser = $scope.usersList.find(function(u) {
                    u._id == users[0]._id
                });
                expect(deletedUser).not.toBeDefined();
            }, function() {
                expect(true).toBe(false);
            });
        });

    });

});