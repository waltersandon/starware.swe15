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
                async.each(questionnaires, function (questionnaire, cb) {
                    var tags = '';

                    async.each(questionnaire.tags, function (tag, cll) {
                        TagService.getByID(tag, function (tagComplete) {
                            tags += tagComplete.name + ', ';
                            cll();
                        }, function (res) {
                            cll();
                        });
                    }, function (err, res) {
                        if (tags.length >= 2)
                            tags = tags.substr(0, tags.length - 2);

                        questionnaire.tags = tags;
                        cb();
                    });
                }, function (err, res) {
                    $scope.questionnaires = questionnaires;
                });
            }, function (res) {

            });
        }]);
});