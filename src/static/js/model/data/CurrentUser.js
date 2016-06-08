/*!
 * @class   CurrentUser
 * @details La classe che modella un l'utente correntemente loggato         
 */
$(function () {
    angular.module('CurrentUserModule', ['RoleServiceModule']).factory('model.data.CurrentUser', ['model.service.RoleService', function (RoleService) {
    /*!
     * @details costruttore della classe
     * @param[in]  fullName nome completo dell'utente
     * @param[in]  id       ID dell'User
     * @param[in]  role     Role del ruolo dell'utente
     * @param[in]  userName userName dell'utente
     */
            function CurrentUser(user, role) {
              //!nome completo dell'utente
                this.fullName = user.fullName;
              //!ID dell'User
                this.id = user.id;
              //!Role del ruolo dell'utente
                this.role = role;
              //!userName dell'utente
                this.userName = user.userName;
            }
            return CurrentUser;
        }]);
});