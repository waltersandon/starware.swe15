$(function () {
    angular.module('app.App').controller('controller.teacher.ManageQuestionnaires', ['$location', 'util.QML', 'model.service.QuestionnaireService', '$rootScope', '$scope', 'model.service.TagService', 'util.Util', function ($location, QML, QuestionnaireService, $rootScope, $scope, TagService, Util) {
            $scope.modify = function (questionnaire) {
                $location.path('teacher/questionnaires/modify/' + questionnaire.id);
            };
            $scope.remove = function (questionnaire) {
                if (Util.confirm('Vuoi eliminare il questionario: ' + questionnaire.title + '?')) {
                    QuestionnaireService.delete(questionnaire, function () {
                        $scope.questionnaires.splice($scope.questionnaires.indexOf(questionnaire), 1);
                    }, function (res) {

                    });
                }
            };
            $scope.preview = function (body) {
                return QML.preview(body);
            };
            function ManageQuestionnaires() {
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
                    });
                }, function (res) {

                });
            }

            ManageQuestionnaires();
        }]);
});