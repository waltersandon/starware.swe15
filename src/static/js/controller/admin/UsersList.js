$(function () {
    angular.module('app.App').controller('controller.admin.UsersList', ['util.Util', 'model.service.RoleService', '$rootScope', '$scope', 'model.service.UserService', function (Util, RoleService, $rootScope, $scope, UserService) {
        $scope.changeUserRole = function (user) {
            UserService.modifyRole(user, user.role, function () {

            }, function (res) {

            });
        };
        $scope.deleteUser = function (user) {
            if (Util.confirm('Vuoi eliminare l\'utente: ' + user.userName + '?')) {
                UserService.delete(user, function () {
                    $scope.usersList.splice($scope.usersList.indexOf(user), 1);
                }, function (res) {

                });
            }
        };
        $scope.filterByRole = function (user) {
            if(user) {
                if($rootScope.me.role.name === "superadmin" && $scope.roleFilter.length > 1){
                    $scope.roleFilter.push("admin");
                }
                var roleName = $scope.roles.find(function (item) {
                    return item.id === user.role;
                }).name;
                
                return ($scope.roleFilter.indexOf(roleName) !== -1) && (new RegExp($scope.userNameSearch, 'i')).test(user.userName) && (new RegExp($scope.fullNameSearch, 'i')).test(user.fullName);
            } else {
                return false;
            }
        };
        $scope.filterRoleList = function () {
            if ($rootScope.me.role.name === 'superadmin') {
                return {name: "!superadmin"};
            } else {
                return {name: "!admin"};
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
            $scope.roleFilter = ["student", "teacher"];
        }, function (res) {

        });
        UserService.get(null, null, function (usersList) {
            $scope.usersList = usersList;
        }, function (res) {

        });
    }]);
});