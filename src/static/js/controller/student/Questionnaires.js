$(function () {
    angular.module('app.App').controller('controller.student.Questionnaires', ['$location', '$rootScope', '$scope', 'model.service.QuestionnaireService', function ($location,  $rootScope, $scope, questionnaireService) {
        $scope.questionnaires = ["ioa"];

        $scope.submit = function () {
            questionnaireService.get($scope.searchText, [], $scope.searchText, function (quest) {
                console.log(quest);
                $scope.questionnaires.push = {title:"aaa"};
                }, function () {

            });
        }
    }]);
});