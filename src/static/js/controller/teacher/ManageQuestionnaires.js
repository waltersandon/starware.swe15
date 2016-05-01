$(function () {
    angular.module('app.App').controller('controller.teacher.ManageQuestionnaires', ['$location', 'model.service.QuestionnaireSerivce', '$rootScope', '$scope', function ($location, QuestionnaireSerivce, $rootScope, $scope) {
            QuestionnaireSerivce.get([$rootScope.me.id], null, null, function (questionnaires) {
                $scope.questionnaires = questionnaires;
            }, function (res) {

            });
        }]);
});