$(function () {
    angular.module('quizzipediaApp').controller('controller.student.Questionnaires', ['$location', '$rootScope', 'model.service.QuestionnaireService', '$scope', 'model.service.TagService', function ($location, questionnaireService, $rootScope, $scope, tagService) {
            $scope.author = '';
            $scope.questionnaires = [];
            $scope.tags = '';

            $scope.search = function () {
                
            };
        }]);
});