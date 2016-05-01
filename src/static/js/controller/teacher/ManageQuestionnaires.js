$(function () {
    angular.module('app.App').controller('controller.teacher.ManageQuestionnaires', ['$location', 'model.service.QuestionnaireService', '$rootScope', '$scope', 'model.service.TagService', function ($location, QuestionnaireSerivce, $rootScope, $scope, TagService) {
            $scope.deleteQuestionnaire = function (questionnaire) {
                if (confirm('Vuoi eliminare il questionario: ' + questionnaire.title + '?')) {
                    QuestionnaireSerivce.delete(questionnaire, function () {
                        $scope.questionnaires.splice($scope.questionnaires.indexOf(questionnaire), 1);
                    }, function (res) {

                    });
                }
            };
            QuestionnaireSerivce.get([$rootScope.me.id], null, null, function (questionnaires) {
                questionnaires.forEach(function (item) {
                    TagService.getByID(item, function (tag) {
                        item = tag.name;
                    }, function (res) {
                        
                    });
                });
                $scope.questionnaires = questionnaires;
            }, function (res) {

            });
        }]);
});