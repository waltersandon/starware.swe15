/**
 * @file Error.js
 * @date 22/04/2016
 * @version 2.0
 * @author Alessio Vitella
 *
 */

/*!
 * @class   Error
 * @details Classe che rappresenta un errore da visualizzare all'utente
 */

$(function () {
    angular.module('ErrorModule', []).factory('model.data.Error', function () {
    /*!
     * @details costruttore della classe
     * @param[in]  status  rappresenta se l'errore è nascosto o no nella vista
     * @param[in]  message rappresenta il messaggio da visualizzare
     * @param[in]  type    tipologia dell'errore
     * @param[in]  name    nome dell'errore
     */
        function Error(message, name, status, type) {
          //!rappresenta il messaggio da visualizzare
            this.message = typeof message !== 'undefined' ? message : '';
          //!nome dell'errore
            this.name = typeof name !== 'undefined' ? name : '';
          //!rappresenta se l'errore è nascosto o no nella vista
            this.status = typeof status !== 'undefined' ? status : false;
          //!tipologia dell'errore
            this.type = typeof type !== 'undefined' ? type : '';
        }
        return Error;
    });
});
