$(function () {
    angular.module('app.App').controller('controller.student.ExecuteQuestionnaire', ['$scope', '$q', 'model.service.QuestionnaireService', 'model.data.CurrentQuestionnaire', 'util.Util', function ($scope, $q, QuestionnaireService, CurrentQuestionnaire, Util) {
            $scope.getNext = function () {
                $scope.questionnaire.getNext();
                $scope.currentQuestion = $scope.questionnaire.questions[$scope.questionnaire.currentNumber];
            };
            $scope.getPrevious = function () {
                $scope.questionnaire.getPrevious();
                $scope.currentQuestion = $scope.questionnaire.questions[$scope.questionnaire.currentNumber];
            };
            $scope.submit = function () {
                if (!$scope.questionnaire.checkAnswers()) {
                    Util.alert("Devi rispondere a tutte le domande");
                } else {
                    var result = $scope.questionnaire.getResult();
                    Util.alert("Punteggio: " + result.point + " / " + result.tot);
                }
            };
            function ExecuteQuestionnaire() {
                QuestionnaireService.getByID($scope.urlPath()[3], function (quest) {
                    $scope.questionnaire = new CurrentQuestionnaire(quest);
                    $q.all([$scope.questionnaire.getCurrentQuestions()]).then(function (result) {
                        $scope.questionnaire.questions = result[0];
                        $scope.currentQuestion = $scope.questionnaire.questions[$scope.questionnaire.currentNumber];
                    }, function () {

                    });
                }, function () {

                });
            }

            ExecuteQuestionnaire();
        }]);
});