$(function () {
    angular.module('app.App').controller('controller.teacher.ManageQuestions', ['$location', 'model.service.QuestionService', '$rootScope', '$scope', 'model.service.TagService', function ($location, QuestionSerivce, $rootScope, $scope, TagService) {
            $scope.deleteQuestion = function (question) {
                if (confirm('Vuoi eliminare la domanda: ' + question.body + '?')) {
                    QuestionSerivce.delete(question, function () {
                        $scope.questions.splice($scope.questions.indexOf(question), 1);
                    }, function (res) {

                    });
                }
            };
            $scope.preview = function (body) {
                var b = body.split('\n'), f;
                b.forEach(function (item) {
                    if (!item.startsWith('<')) {
                        f = item;
                    }
                });
                return markdown.toHTML(f);
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