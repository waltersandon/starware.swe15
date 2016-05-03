$(function () {
    angular.module('app.App').controller('controller.student.ExecuteQuestionnaire', ['$location', '$rootScope', '$scope', 'model.service.QuestionnaireService', 'model.data.CurrentQuestionnaire',  function ($location, $rootScope, $scope, QuestionnaireService, CurrentQuestionnaire) {
        var id = $rootScope.urlPath()[3];
        var questionsId;

        QuestionnaireService.getByID(id, function (quest) {
            $scope.questionnaire = new CurrentQuestionnaire(quest);
            questionsId = quest.questions;
            $rootScope.curQuestion = questionsId[0];
            //$location.path('student/questionnaire/' + id + '/' + questionsId[0]);
        }, function () {

        });

        $scope.getPrevious = function(){
            $scope.questionnaire.getPrevious();
            $rootScope.curQuestion = questionsId[$scope.questionnaire.currentNumber];
            //$location.path('student/questionnaire/' + id + '/' + questionsId[$scope.questionnaire.currentNumber]);
        };

        $scope.getNext = function(){
            $scope.questionnaire.getNext();
            $rootScope.curQuestion = questionsId[$scope.questionnaire.currentNumber];
            //$location.path('student/questionnaire/' + id + '/' + questionsId[$scope.questionnaire.currentNumber]);
        };
    }]);
});