$(function () {
    angular.module('app.App').controller('controller.student.Tags', ['$location', '$rootScope', 'model.service.QuestionnaireService', '$scope', 'model.service.TagService', function ($location, questionnaireService, $rootScope, $scope, tagService) {
            $scope.tags = function () {
                return $location.path().substring($location.path().indexOf('/tag/') + 5).split('/');
            };
        }]);
});

