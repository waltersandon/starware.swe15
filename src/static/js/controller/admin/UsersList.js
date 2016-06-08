/*!
 * @class   UsersList
 * @details Classe che si occupa della gestione di tutti gli utenti presenti
 *          nell'applicazione. In particolare gestisce l'eventuale cambio di
 *          ruolo di un utente e la sua rimozione dal sistema.
 * @par Usage
 * Carica la view che permette avere la lista completa dei tutti gli utenti,
 * consentendo di selezionare l'utente per modificarne il ruolo o per rimuoverlo
 * dal sistema
 */


/*!
 * @details costruttore della classe
 * @param[in]  scope       oggetto di angular che fa riferimento ad una
 *                          porzione di model di pertinenza di uno specifico
 *                          controller
 * @param[in]  roleService campo dati che rappresenta un oggetto
 *                          RoleService
 * @param[in]  userService campo dati che rappresenta un oggetto
 *                          UserService
 */
$(function () {
    angular.module('app.App').controller('controller.admin.UsersList', ['util.Util', 'model.service.RoleService', '$rootScope', '$scope', 'model.service.UserService', function (Util, RoleService, $rootScope, $scope, UserService) {

        /*!
         * @details cambia il ruolo di un utente dato in input
         * @param[in]  user  contiene l'utente a cui serve cambiare il ruolo
         */
        $scope.changeUserRole = function (user) {
            UserService.modifyRole(user, user.role, function () {

            }, function (res) {

            });
        };

        /*!
         * @details elimina l'utente passato per parametro
         * @param[in]  user  contiene l'utente da eliminare
         */
        $scope.deleteUser = function (user) {
            if (Util.confirm('Vuoi eliminare l\'utente: ' + user.userName + '?')) {
                UserService.delete(user, function () {
                    $scope.usersList.splice($scope.usersList.indexOf(user), 1);
                }, function (res) {

                });
            }
        };

        /*!
         * @details filtra la lista degli utenti per ruolo
         * @param[in]  roleName name del Role
         */
        $scope.filterByRole = function (user) {
            if (user) {
                if ($rootScope.me.role.name === "superadmin" && $scope.roleFilter.length > 1) {
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