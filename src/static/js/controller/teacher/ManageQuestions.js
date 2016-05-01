$(function () {
    angular.module('app.App').controller('controller.teacher.ManageQuestions', ['$location', 'model.service.QuestionService', '$rootScope', '$scope', function ($location, QuestionSerivce, $rootScope, $scope) {
            QuestionSerivce.get([$rootScope.me.id], null, null, function (questions) {
                $scope.questions = questions;
            }, function (res) {

            });
        }]);
});