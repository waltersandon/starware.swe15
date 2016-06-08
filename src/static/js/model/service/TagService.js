/*!
 * @class   TagService
 * @details Questa classe fornisce al client i servizi relativi alla modifica,
 *          cancellazione e lettura e inserimento dei tag presenti nel sistema,
 *          utilizzando chiamate HTTP all'end-point /api/tags
 */


/*!
 * @details costruttore della classe
 * @param[in]  http          oggetto del servizio offerto da angulajs per
 *                            le richieste http
 * @param[in]  configuration campo dati che rappresenta un oggetto
 *                            Configuration
 */
$(function () {
    angular.module('TagServiceModule', ['ConfigurationModule', 'TagModule']).service('model.service.TagService', ['app.Configuration', '$http', 'model.data.Tag', function (Configuration, $http, Tag) {

        /*!
         * @details tramite API REST elimina un argomento sul server
         * @param[in]  tag  contiene l'argomento da eliminare
         * @param[in]  next questo parametro rappresenta la callback che il metodo
         *                   chiama in caso di successo
         * @param[in]  err  questo parametro rappresenta la callback che il metodo
         *                   chiama in caso di errore
         */
        this.delete = function (tag, next, err) {
            $http.delete(Configuration.remote + 'api/tags/' + tag.id).then(function success(res) {
                next();
            }, function error(res) {
                err(res);
            });
        };

        /*!
         * @details tramite API REST ritorna una lista di argomenti sul server
         *          filtrate in base ai parametri
         * @param[in]  keywords contiene la lista di parole chiave per ricercare
         *                       gli argomenti
         * @param[in]  next     questo parametro rappresenta la callback che il
         *                       metodo chiama in caso di successo
         * @param[in]  err      questo parametro rappresenta la callback che il
         *                       metodo chiama in caso di errore
         */
        this.get = function (keywords, next, err) {
            $http.get(Configuration.remote + 'api/tags?' +
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
                    ret.push(new Tag(item.description, item._id, item.name, item.parent));
                });

                next(ret);
            }, function error(res) {
                err(res);
            });
        };

        /*!
         * @details tramite API REST ritorna un argomento dal server per ID
         * @param[in]  id   contiene id dell'argomento da ricercare
         * @param[in]  next questo parametro rappresenta la callback che il metodo
         *                   chiama in caso di successo
         * @param[in]  err  questo parametro rappresenta la callback che il metodo
         *                   chiama in caso di errore
         */
        this.getByID = function (id, next, err) {
            $http.get(Configuration.remote + 'api/tags/' + id).then(function success(res) {
                next(new Tag(res.data.description, res.data._id, res.data.name));
            }, function error(res) {
                err(res);
            });
        };

        /*!
         * @details tramite API REST modifica un argomento sul server
         * @param[in]  tag  contiene l'argomento da modificare
         * @param[in]  next questo parametro rappresenta la callback che il metodo
         *                   chiama in caso di successo
         * @param[in]  err  questo parametro rappresenta la callback che il metodo
         *                   chiama in caso di errore
         */
        this.modify = function (tag, next, err) {
            $http.put(Configuration.remote + 'api/tags/' + tag.id, {
                description: tag.description,
                name: tag.name
            }).then(function success(res) {
                next(res.data);
            }, function error(res) {
                err(res);
            });
        };

        /*!
         * @details tramite API REST crea un nuovo argomento sul server
         * @param[in]  tag  contiene il nuovo argomento da creare
         * @param[in]  next questo parametro rappresenta la callback che il metodo
         *                   chiama in caso di successo
         * @param[in]  err  questo parametro rappresenta la callback che il metodo
         *                   chiama in caso di errore
         */
        this.new = function (tag, next, err) {
            $http.post(Configuration.remote + 'api/tags', {
                description: tag.description,
                name: tag.name
            }).then(function success(res) {
                next(res.data);
            }, function error(res) {
                err(res);
            });
        };
    }]);
});