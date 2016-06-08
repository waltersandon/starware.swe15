/*!
 * @class   QuestionnaireService
 * @details Questa classe fornisce al client i servizi necessari alla gestione
 *          dei questionari, utilizzando chiamate HTTP all'end-point
 *          /api/questionnaires
 */


/*!
 * @details costruttore della classe
 * @param[in]  http          oggetto del servizio offerto da angulajs per
 *                            le richieste http
 * @param[in]  configuration campo dati che rappresenta un oggetto
 *                            Configuration
 */
$(function () {
    angular.module('QuestionnaireServiceModule', ['ConfigurationModule', 'QuestionnaireModule']).service('model.service.QuestionnaireService', ['app.Configuration', '$http', 'model.data.Questionnaire', function (Configuration, $http, Questionnaire) {

        /*!
         * @details tramite API REST elimina un questionario sul server
         * @param[in]  questionnaire contiene il questionario da eliminare
         * @param[in]  next          questo parametro rappresenta la callback che
         *                            il metodo chiama in caso di successo
         * @param[in]  err           questo parametro rappresenta la callback che
         *                            il metodo chiama in caso di errore
         */
        this.delete = function (questionnaire, next, err) {
            $http.delete(Configuration.remote + 'api/questionnaires/' + questionnaire.id).then(function success(res) {
                next();
            }, function error(res) {
                err(res);
            });
        };

        /*!
         * @details tramite API REST ritorna una lista di questionari sul server
         *          filtrate in base ai parametri
         * @param[in]  author contiene il nome dell'autore del questionario da
         *                     ricercare
         * @param[in]  tags   contiene la lista degli argomenti per ricercare un
         *                     questionario
         * @param[in]  title  contiene il titolo del questionario da ricercare
         * @param[in]  next   questo parametro rappresenta la callback che il
         *                     metodo chiama in caso di successo
         * @param[in]  err    questo parametro rappresenta la callback che il
         *                     metodo chiama in caso di errore
         */
        this.get = function (author, tags, title, next, err) {
            $http.get(Configuration.remote + 'api/questionnaires?' +
                'author=' + function () {
                    var a = '';
                    if (author instanceof Array)
                        author.forEach(function (item) {
                            a += item + '|';
                        });
                    if (a.length >= 1)
                        a = a.substr(0, a.length - 1);
                    return a;
                }() +
                '&tags=' + function () {
                    var a = '';
                    if (tags instanceof Array)
                        tags.forEach(function (item) {
                            a += item + '|';
                        });
                    if (a.length >= 1)
                        a = a.substr(0, a.length - 1);
                    return a;
                }() +
                '&title=' + function () {
                    var a = '';
                    if (title instanceof Array)
                        title.forEach(function (item) {
                            a += item + '|';
                        });
                    if (a.length >= 1)
                        a = a.substr(0, a.length - 1);
                    return a;
                }()
            ).then(function success(res) {

                var ret = [];
                res.data.forEach(function (item) {
                    ret.push(new Questionnaire(item.author, item._id, item.questions, item.tags, item.title));
                });

                next(ret);
            }, function error(res) {
                err(res);
            });
        };

        /*!
         * @details tramite API REST ritorna un questionario dal server per ID
         * @param[in]  id   contiene id del questionario da ricercare
         * @param[in]  next questo parametro rappresenta la callback che il metodo
         *                   chiama in caso di successo
         * @param[in]  err  questo parametro rappresenta la callback che il metodo
         *                   chiama in caso di errore
         */
        this.getByID = function (id, next, err) {
            $http.get(Configuration.remote + 'api/questionnaires/' + id).then(function success(res) {
                next(new Questionnaire(res.data.author, res.data._id, res.data.questions, res.data.tags, res.data.title));
            }, function error(res) {
                err(res);
            });
        };

        /*!
         * @details tramite API REST modifica un questionario sul server
         * @param[in]  questionnaire contiene il questionario da modificare
         * @param[in]  next          questo parametro rappresenta la callback che
         *                            il metodo chiama in caso di successo
         * @param[in]  err           questo parametro rappresenta la callback che
         *                            il metodo chiama in caso di errore
         */
        this.modify = function (questionnaire, next, err) {
            $http.put(Configuration.remote + 'api/questionnaires/' + questionnaire.id, {
                'questions': questionnaire.questions,
                'tags': questionnaire.tags,
                'title': questionnaire.title
            }).then(function success(res) {
                next(res.data);
            }, function error(res) {
                err(res);
            });
        };

        /*!
         * @details tramite API REST crea un nuovo questionario sul server
         * @param[in]  questionnaire contiene il nuovo questionario da creare
         * @param[in]  next          questo parametro rappresenta la callback che
         *                            il metodo chiama in caso di successo
         * @param[in]  err           questo parametro rappresenta la callback che
         *                            il metodo chiama in caso di errore
         */
        this.new = function (questionnaire, next, err) {
            $http.post(Configuration.remote + 'api/questionnaires', {
                'questions': questionnaire.questions,
                'tags': questionnaire.tags,
                'title': questionnaire.title
            }).then(function success(res) {
                next(res.data);
            }, function error(res) {
                err(res);
            });
        };
    }]);
});