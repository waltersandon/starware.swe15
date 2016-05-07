$(function () {
    angular.module('app.App').controller('controller.student.ExecuteQuestionnaire', ['$location', '$rootScope', '$scope', '$q', 'model.service.QuestionnaireService', 'model.service.QuestionService', 'model.data.CurrentQuestionnaire', 'model.data.CurrentQuestionnaire', function ($location, $rootScope, $scope, $q, QuestionnaireService, QuestionService, CurrentQuestionnaire, CurrentQuestion) {
        var id = $rootScope.urlPath()[3];

        QuestionnaireService.getByID(id, function (quest) {
            $scope.questionnaire = new CurrentQuestionnaire(quest);
            $q.all([$scope.questionnaire.getCurrentQuestions()]).then(function(result){
                $scope.questionnaire.questions = result[0];
                $scope.currentQuestion = $scope.questionnaire.questions[$scope.questionnaire.currentNumber];
            }, function(){

            });
            //$location.path('student/questionnaire/' + id + '/' + questionsId[0]);
        }, function () {

        });

        $scope.getPrevious = function(){
            $scope.questionnaire.getPrevious();
            $scope.currentQuestion = $scope.questionnaire.questions[$scope.questionnaire.currentNumber];
            //$location.path('student/questionnaire/' + id + '/' + questionsId[$scope.questionnaire.currentNumber]);
        };

        $scope.getNext = function(){
            $scope.questionnaire.getNext();
            $scope.currentQuestion = $scope.questionnaire.questions[$scope.questionnaire.currentNumber];
            //$location.path('student/questionnaire/' + id + '/' + questionsId[$scope.questionnaire.currentNumber]);
        };

        $scope.submit = function(){
            if(!$scope.questionnaire.checkAnswers()) {
                alert("Devi rispondere a tutte le domande");
            }
            else{
                var result = $scope.questionnaire.getResult()
                alert("Punteggio: " + result.point + " / " + result.tot);
            }
        }
    }]);
});