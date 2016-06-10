/**
 * @file Role.js
 * @date 22/04/2016
 * @version 2.0
 * @author Andrea Venier
 *
 */

/*!
 * @class   Role
 * @details Questa classe modella il ruolo e i permessi di un utente autenticato nel sistema
 */
$(function () {
    angular.module('RoleModule', []).factory('model.data.Role', function () {
    /*!
     * @details costruttore della classe
     * @param[in]  id   ID del Role
     * @param[in]  name e' il ruolo che un utente può assumere
     */
        function Role(id, name) {
          //!ID del Role
            this.id = id;
          //!e' il ruolo che un utente può assumere
            this.name = name;
        }
        return Role;
    });
});