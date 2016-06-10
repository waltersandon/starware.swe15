/**
 * @file RoleService.js
 * @date 22/04/2016
 * @version 2.0
 * @author Nicola De Cao
 *
 */

/*!
 * @class   RoleService
 * @details Questa classe fornisce al client i servizi necessari per la gestione
 *          dei ruoli, utilizzando chiamate HTTP all'end-point /api/tags
 */


/*!
 * @details costruttore della classe
 * @param[in]  http          oggetto del servizio offerto da angulajs per
 *                            le richieste http
 * @param[in]  configuration campo dati che rappresenta un oggetto
 *                            Configuration
 */
$(function () {
    angular.module('RoleServiceModule', ['ConfigurationModule', 'RoleModule']).service('model.service.RoleService', ['app.Configuration', '$http', 'model.data.Role', function (Configuration, $http, Role) {

        /*!
         * @details tramite API REST ritorna una lista dei ruoli sul server filtrate
         *          in base ai parametri
         * @param[in]  keywords contiene la lista di parole chiave per ricercare il
         *                       ruolo
         * @param[in]  next     questo parametro rappresenta la callback che il
         *                       metodo chiama in caso di successo
         * @param[in]  err      questo parametro rappresenta la callback che il
         *                       metodo chiama in caso di errore
         */
        this.get = function (keywords, next, err) {
            $http.get(Configuration.remote + 'api/roles?' +
                'keywords=' + function () {
                    var a = '';
                    if (keywords instanceof Array)
                        keywords.forEach(function (item) {
                            a += item + '|';
                        });
                    if (a.length >= 1)
                        a = a.substr(0, a.length - 1);
                    return a;
                }()
            ).then(function success(res) {

                var ret = [];
                res.data.forEach(function (item) {
                    ret.push(new Role(item._id, item.name));
                });

                next(ret);
            }, function error(res) {
                err(res);
            });
        };

        /*!
         * @details tramite API REST ritorna un ruolo dal server per ID
         * @param[in]  id   contiene id del ruolo da ricercare
         * @param[in]  next questo parametro rappresenta la callback che il metodo
         *                   chiama in caso di successo
         * @param[in]  err  questo parametro rappresenta la callback che il metodo
         *                   chiama in caso di errore
         */
        this.getByID = function (id, next, err) {
            $http.get(Configuration.remote + 'api/roles/' + id).then(function success(res) {
                next(new Role(res.data._id, res.data.name));
            }, function error(res) {
                err(res);
            });
        };
    }]);
});