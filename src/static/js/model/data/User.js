/*!
 * @class   User
 * @details Questa classe modella le informazioni del profilo di un utente autenticato nel sistema
 */
$(function () {
    angular.module('UserModule', []).factory('model.data.User', function () {
    /*!
     * @details costruttore della classe
     * @param[in]  fullName nome completo dell'utente
     * @param[in]  id       ID dell'User
     * @param[in]  role     ID del Role del ruolo dell'utente
     * @param[in]  userName userName dell'utente
     */

        function User(fullName, id, role, userName) {
          //!nome completo dell'utente
            this.fullName = fullName;
          //!ID dell'User
            this.id = id;
          //!ID del Role del ruolo dell'utente
            this.role = role;
          //!userName dell'utente
            this.userName = userName;
        }
        return User;
    });
});