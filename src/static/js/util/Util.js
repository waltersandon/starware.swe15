/*!
 * @class   Util
 * @details Classe che espone metodi pubblici utili a varie classi del sistema
 */


/*!
 * @details costruttore della classe
 */
$(function () {
    angular.module('UtilModule', []).service('util.Util', [function () {

        /*!
         * @details stampa un pop-up con un messaggio
         * @param[in]  message
         */
        this.alert = function (message) {
            alert(message);
        };

        /*!
         * @details stampa un messaggio chiedendo all'utente di confermare un'azione
         * @param[in]  message
         */
        this.confirm = function (message) {
            return confirm(message);
        };
    }]);
});