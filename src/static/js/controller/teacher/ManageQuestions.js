/*!
 * @class   ManageQuestions
 * @details La classe che controlla la gestione delle domande create dal docente
 *          autenticato
 * @par Usage 
 * Viene richiamata quando un docente vuole creare un nuova domanda o
 * modificarne o eliminarne una già esistente tra quelle da lui create
 */
$(function () {
    angular.module('app.App').controller('controller.teacher.ManageQuestions', ['$location', 'util.QML', 'model.service.QuestionService', '$rootScope', '$scope', 'model.service.TagService', 'util.Util', function ($location, QML, QuestionSerivce, $rootScope, $scope, TagService, Util) {
      
    /*!
     * @details modifica la domanda passata per parametro
     * @param[in]  question contiene  la domanda da modificare 
     */
            $scope.modify = function (question) {
                $location.path('teacher/questions/modify/' + question.id);
            };
      
    /*!
     * @details elimina la domanda passata per parametro
     * @param[in]  question contiene la domanda da eliminare 
     */
            $scope.remove = function (question) {
                if (Util.confirm('Vuoi eliminare la domanda: ' + question.body + '?')) {
                    QuestionSerivce.delete(question, function () {
                        $scope.questions.splice($scope.questions.indexOf(question), 1);
                    }, function (res) {

                    });
                }
            };
      
    /*!
     * @details provvede a fornire un'anteprima di una domanda da QML in HTML
     */
            $scope.preview = function (body) {
                return QML.preview(body);
            };
    /*!
     * @details costruttore della classe
     * @param[in]  questionnaireService campo dati che rappresenta un oggetto
     *                                   QuestionnaireService
     * @param[in]  scope                oggetto di angular che fa riferimento
     *                                   ad una porzione di model di pertinenza
     *                                   di uno specifico controller
     * @param[in]  rootScope            oggetto di angular che identifica
     *                                   l’elemento con attributo ng-app
     */
            function ManageQuestions() {
                QuestionSerivce.get([$rootScope.me.id], null, null, function (questions) {
                    async.each(questions, function (question, cb) {
                        var tags = [];

                        async.each(question.tags, function (tag, cll) {
                            TagService.getByID(tag, function (tagComplete) {
                                tags.push(tagComplete.name);
                                cll();
                            }, function (res) {
                                cll();
                            });
                        }, function (err, res) {
                            question.tags = tags;
                            cb();
                        });
                    }, function (err, res) {
                        $scope.questions = questions;
                    });
                }, function (res) {

                });
            }
      
            ManageQuestions();
        }]);
});