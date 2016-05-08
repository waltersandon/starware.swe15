$(function () {
    angular.module('app.App').controller('controller.teacher.ManageQuestionnaires', ['util.Check', '$location', 'util.QML', 'model.service.QuestionnaireService', '$rootScope', '$scope', 'model.service.TagService', function (Check, $location, QML, QuestionnaireService, $rootScope, $scope, TagService) {
            $scope.delete = function (questionnaire) {
                if (Check.confirm('Vuoi eliminare il questionario: ' + questionnaire.title + '?')) {
                    QuestionnaireService.delete(questionnaire, function () {
                        $scope.questionnaires.splice($scope.questionnaires.indexOf(questionnaire), 1);
                    }, function (res) {

                    });
                }
            };
            $scope.modify = function (questionnaire) {
                $location.path('teacher/questionnaires/modify/' + questionnaire.id);
            };
            QuestionnaireService.get([$rootScope.me.id], null, null, function (questionnaires) {
                async.each(questionnaires, function (questionnaire, cb) {
                    var tags = [];

                    async.each(questionnaire.tags, function (tag, cll) {
                        TagService.getByID(tag, function (tagComplete) {
                            tags.push(tagComplete.name);
                            cll();
                        }, function (res) {
                            cll();
                        });
                    }, function (err, res) {
                        questionnaire.tags = tags;
                        cb();
                    });
                }, function (err, res) {
                    $scope.questionnaires = questionnaires;

                    $scope.preview = function (body) {
                        return QML.preview(body);
                    };
                });
            }, function (res) {

            });
        }]);
});