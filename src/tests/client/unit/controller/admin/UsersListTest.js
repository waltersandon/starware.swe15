describe('controller.admin.UsersList', function() {

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

        it('it should filter the list of roles', function() {
            var result = $scope.filterByRole('admin');
            expect(result).toBe('role_id_3');
        });

    });

    describe('changeUserRole', function() {

        it('it should change the role of a user', function() {
            var result = $scope.changeUserRole(users[0], users[1].role, function() {
                expect(true).toBe(true);
            }, function() {
                expect(true).toBe(false);
            });
        });

    });

    describe('deleteUser', function() {

        it('it should remove a user', function() {
            var result = $scope.deleteUser(users[0], function() {
                expect(true).toBe(true);
                var deletedUser = $scope.usersList.find(function(u) {
                    u._id == users[0]._id
                });
                expect(deleteUser).not.toBeDefined();
            }, function() {
                expect(true).toBe(false);
            });
        });

    });

});