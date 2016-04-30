$(function () {
    angular.module('app.App').controller('controller.student.Questionnaires', ['$location', '$rootScope', '$scope', 'model.service.QuestionnaireService', function ($location,  $rootScope, $scope, questionnaireService) {
        $scope.questionnaires = [{title:"ccc"}];

        $scope.submit = function () {
            questionnaireService.get($scope.searchText, [], $scope.searchText, function (quest) {
                $scope.questionnaires = quest;
                }, function () {

            });
        }
    }]);
});