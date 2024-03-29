describe('controller.admin.UsersList', function() {

    var $rootScope;
    var $scope;
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
            userName: 'giovanni.rossi',
            fullName: 'Giovanni Rossi',
            role: 'role_id_3'
        },
        {
            id: 'id_user_4',
            userName: 'giacomo.rossi',
            fullName: 'Giacomo Rossi',
            role: 'role_id_4'
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
            var RoleService = function () {
                this.get = function(a, success, fail) {
                    success(roles);
                };
            };
            var Util = function() {
                this.confirm = function(m) { return true; }
                this.alert = function(m) {}
            };
            $provide.service("util.Util", Util);
            $provide.service("model.service.RoleService", RoleService);
            $provide.service("model.service.UserService", UserService);
        });
        inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $rootScope.me = {
                id: 'id_user_4',
                userName: 'giacomo.rossi',
                fullName: 'Giacomo Rossi',
                role: {name : 'superadmin'}
            };
            $rootScope.roleFilter =["student","teacher"];
            $scope.userNameSearch = "";
            $scope.fullNameSearch = "";
            var $controller = $injector.get('$controller');
            controller = $controller('controller.admin.UsersList', {
                $rootScope: $rootScope,
                $scope: $scope
            });
        });
    });

    describe('filterByRole', function() {

        it('deve filtrare la lista dei ruoli con utente admin', function() {
            $scope.roles = roles;
            var result = $scope.filterByRole(users[0]);
            expect(result).toBe(true);
        });
        it('deve filtrare la lista dei ruoli', function() {
            $scope.roles = roles;
            var result = $scope.filterByRole();
            expect(result).toBe(false);
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
                    return u._id === users[0]._id
                });
                expect(deletedUser).not.toBeDefined();
            }, function() {
                expect(true).toBe(false);
            });
        });

    });

});