/**
 * @file QuestionService.js
 * @date 21/04/2016
 * @version 2.0
 * @author Alessio Vitella
 *
 */

/*!
 * @class   QuestionService
 * @details Questa classe fornisce al client i servizi necessari alla gestione
 *          delle domande, utilizzando chiamate HTTP all'end-point
 *          /api/questions
 */


/*!
 * @details costruttore della classe
 * @param[in]  http          oggetto del servizio offerto da angulajs per
 *                            le richieste http
 * @param[in]  configuration campo dati che rappresenta un oggetto
 *                            Configuration
 */
$(function () {
    angular.module('QuestionServiceModule', ['ConfigurationModule', 'QuestionModule']).service('model.service.QuestionService', ['app.Configuration', '$http', 'model.data.Question', function (Configuration, $http, Question) {

        /*!
         * @details tramite API REST elimina una domanda sul server
         * @param[in]  question contiene la domanda da eliminare
         * @param[in]  next     questo parametro rappresenta la callback che il
         *                       metodo chiama in caso di successo
         * @param[in]  err      questo parametro rappresenta la callback che il
         *                       metodo chiama in caso di errore
         */
        this.delete = function (question, next, err) {
            $http.delete(Configuration.remote + 'api/questions/' + question.id).then(function success(res) {
                next();
            }, function error(res) {
                err(res);
            });
        };

        /*!
         * @details tramite API REST ritorna una lista delle domande sul server
         *          filtrate in base ai parametri
         * @param[in]  author   contiene il nome dell'autore della domanda da
         *                       ricercare
         * @param[in]  keywords contiene la lista di parole chiave per ricercare
         *                       una domanda
         * @param[in]  tags     contiene la lista degli argomenti per ricercare una
         *                       domanda
         * @param[in]  next     questo parametro rappresenta la callback che il
         *                       metodo chiama in caso di successo
         * @param[in]  err      questo parametro rappresenta la callback che il
         *                       metodo chiama in caso di errore
         */
        this.get = function (author, keywords, tags, next, err) {
            $http.get(Configuration.remote + 'api/questions?' +
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
                '&keywords=' + function () {
                    var a = '';
                    if (keywords instanceof Array)
                        keywords.forEach(function (item) {
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
                }()
            ).then(function success(res) {

                var ret = [];
                res.data.forEach(function (item) {
                    ret.push(new Question(item.author, item.body, item._id, item.tags));
                });

                next(ret);
            }, function error(res) {
                err(res);
            });
        };

        /*!
         * @details tramite API REST ritorna una domanda dal server per ID
         * @param[in]  id   ID della Question
         * @param[in]  next questo parametro rappresenta la callback che il metodo
         *                   chiama in caso di successo
         * @param[in]  err  questo parametro rappresenta la callback che il metodo
         *                   chiama in caso di errore
         */
        this.getByID = function (id, next, err) {
            $http.get(Configuration.remote + 'api/questions/' + id).then(function success(res) {
                next(new Question(res.data.author, res.data.body, res.data._id, res.data.tags));
            }, function error(res) {
                err(res);
            });
        };

        /*!
         * @details tramite API REST modifica una domanda sul server
         * @param[in]  question contiene la domanda da modificare
         * @param[in]  next     questo parametro rappresenta la callback che il
         *                       metodo chiama in caso di successo
         * @param[in]  err      questo parametro rappresenta la callback che il
         *                       metodo chiama in caso di errore
         */
        this.modify = function (question, next, err) {
            $http.put(Configuration.remote + 'api/questions/' + question.id, {
                'body': question.body,
                'tags': question.tags
            }).then(function success(res) {
                next(res.data);
            }, function error(res) {
                err(res);
            });
        };

        /*!
         * @details tramite API REST crea una nuova domanda sul server
         * @param[in]  question contiene la nuova domanda da creare
         * @param[in]  next     questo parametro rappresenta la callback che il
         *                       metodo chiama in caso di successo
         * @param[in]  err      questo parametro rappresenta la callback che il
         *                       metodo chiama in caso di errore
         */
        this.new = function (question, next, err) {
            $http.post(Configuration.remote + 'api/questions', {
                'body': question.body,
                'tags': question.tags
            }).then(function success(res) {
                next(res.data);
            }, function error(res) {
                err(res);
            });
        };
    }]);
});