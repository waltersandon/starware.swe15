/*!
 * @class   SessionService
 * @details Questa classe fornisce al client i servizi relativi  alle
 *          credenziali d'accesso di un utente utilizzando chiamate HTTP
 *          all'end-point /api/session
 */

/*!
 * @details costruttore della classe
 * @param[in]  http          oggetto del servizio offerto da angulajs per
 *                            le richieste http
 * @param[in]  configuration campo dati che rappresenta un oggetto
 *                            Configuration
 */
$(function () {
    angular.module('SessionServiceModule', ['ConfigurationModule']).service('model.service.SessionService', ['app.Configuration', '$http', function (Configuration, $http) {

        /*!
         * @details provvede ad effettuare l'accesso presso il server
         * @param[in]  password contiene la password inserita dall'utente
         * @param[in]  userName contiene l'username inserito dall'utente
         * @param[in]  next     questo parametro rappresenta la callback che il
         *                       metodo chiama in caso di successo
         * @param[in]  err      questo parametro rappresenta la callback che il
         *                       metodo chiama in caso di errore
         */
        this.login = function (password, userName, next, err) {
            $http.post(Configuration.remote + 'api/session', {
                'password': password,
                'userName': userName
            }).then(function success(res) {
                next();
            }, function error(res) {
                err(res);
            });
        };

        /*!
         * @details chiude la sessione dell'utente
         * @param[in]  next questo parametro rappresenta la callback che il metodo
         *                   chiama in caso di successo
         * @param[in]  err  questo parametro rappresenta la callback che il metodo
         *                   chiama in caso di errore
         */
        this.logout = function (next, err) {
            $http.delete(Configuration.remote + 'api/session').then(function success(res) {
                next();
            }, function error(res) {
                err(res);
            });
        };
    }]);
});