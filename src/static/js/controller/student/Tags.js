$(function () {
    angular.module('quizzipediaApp').controller('controller.student.Tags', ['$location', '$rootScope', 'model.service.QuestionnaireService', '$scope', 'model.service.TagService', function ($location, questionnaireService, $rootScope, $scope, tagService) {
            $scope.path = [];
            $scope.tags = [];
        }]);
});

