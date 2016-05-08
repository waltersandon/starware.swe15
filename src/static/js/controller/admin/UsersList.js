$(function () {
    angular.module('app.App').controller('controller.admin.UsersList', ['util.Check', 'model.service.RoleService', '$rootScope', '$scope', 'model.service.UserService', function (Check, RoleService, $rootScope, $scope, UserService) {
            $scope.changeUserRole = function (user) {
                UserService.modifyRole(user, user.role, function () {

                }, function (res) {

                });
            };
            $scope.deleteUser = function (user) {
                if (Check.confirm('Vuoi eliminare l\'utente: ' + user.userName + '?')) {
                    UserService.delete(user, function () {
                        $scope.usersList.splice($scope.usersList.indexOf(user), 1);
                    }, function (res) {

                    });
                }
            };
            $scope.filterByRole = function (roleName) {
                return $scope.roles.find(function (item) {
                    return item.name === roleName;
                }).id;
            };
            $scope.filterRoleList = function () {
                if ($rootScope.me.role.name === 'superadmin') {
                    return {name: "!superadmin"};
                } else {
                    return ({name: "!superadmin", name: "!admin"});
                }
            };
            RoleService.get(null, function (roles) {
                console.log(roles);
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
                $scope.roleFilter = "!" + $scope.filterByRole("superadmin");
            }, function (res) {

            });
            UserService.get(null, null, function (usersList) {
                $scope.usersList = usersList;
            }, function (res) {

            });
        }]);
});