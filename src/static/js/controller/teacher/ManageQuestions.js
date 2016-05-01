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
            QuestionSerivce.get([$rootScope.me.id], null, null, function (questions) {
                /// qui non funziona! le chiamate sono async ma dovrebbero essere sync: trovare riemndio!
                questions.forEach(function (question) {
                    var tags = '';
                    question.tags.forEach(function (tag) {
                        TagService.getByID(tag, function (tagComplete) {
                            console.log('1' + tagComplete.name);
                            tags += tagComplete.name + ', ';
                        }, function (res) {

                        });
                    });
                    
                    if (tags.length >= 2)
                        tags = tags.substr(0, tags.length - 2);
                    
                    console.log('2' + tags);
                    question.tags = tags;
                });
                $scope.questions = questions;
            }, function (res) {

            });
        }]);
});