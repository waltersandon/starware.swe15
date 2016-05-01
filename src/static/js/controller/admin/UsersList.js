$(function () {
    angular.module('app.App').controller('controller.admin.UsersList', ['$location', 'model.service.RoleService', '$rootScope', '$scope', 'model.service.UserService', function ($location, RoleService, $rootScope, $scope, UserService) {
            $scope.filterByRole = function (roleName) {
                return $scope.roles.find(function (item) {
                    return item.name === roleName;
                }).id;
            };

            $scope.changeUserRole = function (user) {
                UserService.modifyRole(user, user.role, function () {

                }, function (res) {

                });
            };
            $scope.deleteUser = function (user) {
                if (confirm('Vuoi eliminare l\'utente: ' + user.userName + '?')) {
                    UserService.delete(user, function () {
                        $scope.usersList.splice($scope.usersList.indexOf(user), 1);
                    }, function (res) {

                    });
                }
            };
            RoleService.get(null, function (roles) {
                roles.forEach(function (item) {
                    switch (item.name) {
                        case 'student':
                            item.viewName = 'Studente';
                            break;
                        case 'teacher':
                            item.viewName = 'Docente';
                            break;
                        case 'admin':
                            item.viewName = 'Amministratore';
                            break;
                        case 'superadmin':
                            item.viewName = 'Proprietario';
                            break;
                    }
                });
                $scope.roles = roles;
                $scope.myFilter = "!" + $scope.filterByRole("superadmin");
            }, function (res) {

            });
            UserService.get(null, null, function (usersList) {
                $scope.usersList = usersList;
            }, function (res) {

            });
        }]);
});