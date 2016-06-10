/**
 * @file ManageQuestionnaires.js
 * @date 20/04/2016
 * @version 2.0
 * @author Nicola De Cao
 *
 */

/*!
 * @class   ManageQuestionnaires
 * @details La classe che controlla la gestione dei questionari creati dal
 *          docente autenticato
 * @par Usage 
 * Viene richiamata quando un docente vuole creare un nuovo questionario o
 * modificarne o eliminarne uno già esistente tra quelli da lui crearti
 */
$(function () {
    angular.module('app.App').controller('controller.teacher.ManageQuestionnaires', ['$location', 'util.QML', 'model.service.QuestionnaireService', '$rootScope', '$scope', 'model.service.TagService', 'util.Util', function ($location, QML, QuestionnaireService, $rootScope, $scope, TagService, Util) {
            /*!
             * @details modifica il questionario passato come parametro
             * @param[in]  questionnaire contiene il questionario da modificare 
             */
            $scope.modify = function (questionnaire) {
                $location.path('teacher/questionnaires/modify/' + questionnaire.id);
            };
            /*!
             * @details elimina il questionario passato come parametro
             * @param[in]  questionnaire  Contiene il questionario da eliminare 
             */
            $scope.remove = function (questionnaire) {
                if (Util.confirm('Vuoi eliminare il questionario: ' + questionnaire.title + '?')) {
                    QuestionnaireService.delete(questionnaire, function () {
                        $scope.questionnaires.splice($scope.questionnaires.indexOf(questionnaire), 1);
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
            function ManageQuestionnaires() {
                QuestionnaireService.get([$rootScope.me.id], null, null, function (questionnaires) {
                    async.each(questionnaires, function (questionnaire, cb) {
                        var tags = [];

                        async.each(questionnaire.tags, function (tag, cll) {
                            TagService.getByID(tag, function (tagComplete) {
                                tags.push(tagComplete.name);
                                cll();
                            }, function (res) {
                                cll();
                            });
                        }, function (err, res) {
                            questionnaire.tags = tags;
                            cb();
                        });
                    }, function (err, res) {
                        $scope.questionnaires = questionnaires;
                    });
                }, function (res) {

                });
            }

            ManageQuestionnaires();
        }]);
});