/*!
 * @class   AnswerService
 * @details Questa classe fornisce al client i servizi necessari alla gestione
 *          delle statistiche, utilizzando chiamate HTTP all'end-point
 *          /api/answers
 */


/*!
 * @details costruttore della classe
 * @param[in]  configuration campo dati che rappresenta un oggetto
 *                            Configuration	
 * @param[in]  http          oggetto del servizio offerto da angulajs per
 *                            le richieste http	
 */
$(function () {
    angular.module('AnswerServiceModule', ['ConfigurationModule']).service('model.service.AnswerService', ['app.Configuration', '$http', function (Configuration, $http) {

            /*!
             * @details tramite API REST ritorna una lista di questionari sul server
             *          filtrate in base ai parametri
             * @param[in]  next          questo parametro rappresenta la callback che
             *                            il metodo chiama in caso di successo
             * @param[in]  err           questo parametro rappresenta la callback che
             *                            il metodo chiama in caso di errore
             * @param[in]  author        contiene il nome dell'autore del questionario
             *                            da ricercare
             * @param[in]  question      contiene la domanda a cui l'utente ha risposto
             * @param[in]  questionnaire contiene il questionario che l'utente ha
             *                            eseguito
             */
            this.get = function (questionnaire, question, author, next, err) {
                $http.get(Configuration.remote + 'api/answers?' +
                        'questionnaires=' + function () {
                            var a = '';
                            if (questionnaire instanceof Array)
                                questionnaire.forEach(function (item) {
                                    a += item + '|';
                                });
                            if (a.length >= 1)
                                a = a.substr(0, a.length - 1);
                            return a;
                        }() +
                        '&questions=' + function () {
                            var a = '';
                            if (question instanceof Array)
                                question.forEach(function (item) {
                                    a += item + '|';
                                });
                            if (a.length >= 1)
                                a = a.substr(0, a.length - 1);
                            return a;
                        }() +
                        'authors=' + function () {
                            var a = '';
                            if (author instanceof Array)
                                author.forEach(function (item) {
                                    a += item + '|';
                                });
                            if (a.length >= 1)
                                a = a.substr(0, a.length - 1);
                            return a;
                        }()
                        ).then(function success(res) {

                    var ret = [];
                    res.data.forEach(function (item) {
                        ret.push(item);
                    });

                    next(ret);
                }, function error(res) {
                    err(res);
                });
            };

            /*!
             * @details tramite API REST crea una nuova risposta ad una domanda sul
             *          server
             *
             * @param[in]  next          questo parametro rappresenta la callback che
             *                            il metodo chiama in caso di successo
             * @param[in]  err           questo parametro rappresenta la callback che
             *                            il metodo chiama in caso di errore
             * @param[in]  questionnaire contiene il questionario che l'utente ha
             *                            eseguito
             * @param[in]  question      contiene la domanda a cui l'utente ha risposto
             * @param[in]  score         contiene il punteggio che l'utente ha
             *                            totalizzato sulla singola domanda risposta
             */
            this.new = function (questionnaire, question, score, next, err) {
                $http.post(Configuration.remote + 'api/answers', {
                    'questionnaire': questionnaire.id,
                    'question': question.id,
                    'score': score
                }).then(function success(res) {
                    next(res.data);
                }, function error(res) {
                    err(res);
                });
            };
        }]);
});