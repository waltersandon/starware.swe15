/**
 * @file ExecuteQuestionnaire.js
 * @date 19/04/2016
 * @version 2.0
 * @author Thomas Pigarelli
 *
 */

/*!
 * @class   ExecuteQuestionnaire
 * @details La classe che controlla esecuzione del questionario
 * @par Usage
 * Viene chiamata quando uno studente comincia a rispondere ad un questionario.
 * Lo studente non è obbligato a rispondere alle domande una dopo l'altra, ha
 * la possibilità di poter tornare su domande che in precedenza non aveva
 * risposto. Solo dopo il submit che il questionario si considera completato
 */

$(function () {
    angular.module('app.App').controller('controller.student.ExecuteQuestionnaire', ['$scope', '$q', 'model.service.QuestionnaireService', 'model.data.CurrentQuestionnaire', 'util.Util', 'model.data.Error', function ($scope, $q, QuestionnaireService, CurrentQuestionnaire, Util, Msg) {

        $scope.result = new Msg();
        $scope.edit = true;

        /*!
         * @details carica la prossima domanda in executeQuestion
         */
        $scope.getNext = function () {
            $scope.questionnaire.getNext();
            $scope.currentQuestion = $scope.questionnaire.questions[$scope.questionnaire.currentNumber];
        };

        /*!
         * @details carica a domanda precedente in executeQuestion
         */
        $scope.getPrevious = function () {
            $scope.questionnaire.getPrevious();
            $scope.currentQuestion = $scope.questionnaire.questions[$scope.questionnaire.currentNumber];
        };

        /*!
         * @details controlla che tutte le risposte siano state date, in caso
         *          positivo richiama il metodo per ottenere i risultati e li
         *          visualizza, altrimenti visualizza un messaggio di errore
         */
        $scope.submit = function () {
            if (Util.confirm("Confermare la sottomissione del questionario?")) {
                $scope.questionnaire.getResult(function (result) {
                    $scope.result = new Msg(result.point + " / " + result.tot, 'result', true, 'alert-info');
                    $scope.edit = false;
                });
            }
        };

        $scope.checkAnswers = function () {
            if ($scope.load) {
                return !$scope.questionnaire.checkAnswers();
            } else
                return true;
        };

        /*!
         * @details costruttore della classe
         * @param[in]  location             oggetto di angular che analizza l'URL
         *                                   nella barra degli indirizzi del browser
         *                                   e lo rende disponibile all'applicazione
         * @param[in]  questionnaireService campo dati che rappresenta un oggetto
         *                                   QuestionnaireService
         * @param[in]  rootScope            oggetto di angular che identifica
         *                                   l’elemento con attributo ng-app
         * @param[in]  scope                oggetto di angular che fa riferimento
         *                                   ad una porzione di model di pertinenza
         *                                   di uno specifico controller
         * @param[in]  edit                 indica se esecuzione del questionario
         *                                   è in modalità read-only. Ovvero se
         *                                   variabile è true allora si possono
         *                                   cambiare le risposte alle domande,
         *                                   altrimenti si può solo visualizzare il
         *                                   questionario senza poter cambiare le
         *                                   risposte già selezionate
         */
        function ExecuteQuestionnaire() {
            $scope.load = false;
            QuestionnaireService.getByID($scope.urlPath()[3], function (quest) {
                $scope.questionnaire = new CurrentQuestionnaire(quest);
                $q.all([$scope.questionnaire.getCurrentQuestions()]).then(function (result) {
                    $scope.questionnaire.questions = result[0];
                    $scope.currentQuestion = $scope.questionnaire.questions[$scope.questionnaire.currentNumber];
                    $scope.load = true;
                }, function () {

                });
            }, function () {

            });
        }

        ExecuteQuestionnaire();
    }]);
});