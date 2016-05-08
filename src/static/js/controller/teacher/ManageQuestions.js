$(function () {
    angular.module('app.App').controller('controller.teacher.ManageQuestions', ['util.Util', '$location', 'util.QML', 'model.service.QuestionService', '$rootScope', '$scope', 'model.service.TagService', function (Util, $location, QML, QuestionSerivce, $rootScope, $scope, TagService) {
            $scope.deleteQuestion = function (question) {
                if (Util.confirm('Vuoi eliminare la domanda: ' + question.body + '?')) {
                    QuestionSerivce.delete(question, function () {
                        $scope.questions.splice($scope.questions.indexOf(question), 1);
                    }, function (res) {

                    });
                }
            };
            $scope.modifyQuestion = function (question) {
                $location.path('teacher/questions/modify/' + question.id);
            };
            $scope.preview = function (body) {
                return QML.preview(body);
            };
            QuestionSerivce.get([$rootScope.me.id], null, null, function (questions) {
                async.each(questions, function (question, cb) {
                    var tags = [];

                    async.each(question.tags, function (tag, cll) {
                        TagService.getByID(tag, function (tagComplete) {
                            tags.push(tagComplete.name);
                            cll();
                        }, function (res) {
                            cll();
                        });
                    }, function (err, res) {
                        question.tags = tags;
                        cb();
                    });
                }, function (err, res) {
                    $scope.questions = questions;
                });
            }, function (res) {

            });
        }]);
});