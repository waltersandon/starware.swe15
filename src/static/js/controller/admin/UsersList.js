$(function () {
    angular.module('app.App').controller('controller.admin.UsersList', ['$location', 'model.service.RoleService', '$rootScope', '$scope', 'model.service.UserService', function ($location, RoleService, $rootScope, $scope, UserService) {
            RoleService.get(null, function (roles) {
                roles.forEach(function (item) {
                    switch (item.name) {
                        case 'student':
                            item.name = 'Studente';
                            break;
                        case 'teacher':
                            item.name = 'Docente';
                            break;
                        case 'admin':
                            item.name = 'Amministratore';
                            break;
                        case 'superadmin':
                            item.name = 'Proprietario';
                            break;
                    }
                });
                $scope.roles = roles;
            }, function (res) {

            });
            UserService.get(null, null, function (users) {
                $scope.usersList = users;
            }, function (res) {

            });
            $scope.changeUserRole = function (user) {
                UserService.modifyRole(user, user.role, function () {
                    console.log('success!');
                }, function (res) {
                    
                });
            };
            $scope.deleteUser = function (user) {
                UserService.delete(user, function () {
                    $scope.usersList.splice($scope.usersList.indexOf(user), 1);
                }, function (res) {
                    
                });
            };
        }]);
});