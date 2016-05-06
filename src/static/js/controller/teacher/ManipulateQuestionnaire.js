$(function () {
    angular.module('app.App').controller('controller.teacher.ManipulateQuestionnaire', ['$location', 'model.service.QuestionService', 'model.data.Questionnaire', 'model.service.QuestionnaireService', '$scope', 'model.service.TagService', function ($location, QuestionService, Questionnaire, QuestionnaireService, $scope, TagService) {
            $scope.onSelect = false;
            $scope.removeQuestion = function (question) {

            };
            $scope.setOnSelect = function (b) {
                $scope.onSelect = b;
            };
            $scope.addQuestion = function (question) {
                $scope.questionnaire.push(question.id);
                $scope.onSelect = false;
            };

            if ($scope.urlPath()[3] === 'new') {
                $scope.questionnaire = new Questionnaire();
                $scope.edit = false;
            } else if ($scope.urlPath()[3] === 'modify') {
                QuestionnaireService.getByID($scope.urlPath()[4], function (questionnaire) {
                    $scope.questionnaire = questionnaire;
                    $scope.tagsInput = '';
                    async.each($scope.questionnaire.tags, function (tag, cll) {
                        TagService.getByID(tag, function (tagComplete) {
                            $scope.tagsInput += tagComplete.name + ', ';
                            cll();
                        }, function (res) {
                            cll();
                        });
                    }, function (err, res) {
                        var questions = [];
                        async.each($scope.questionnaire.questions, function (id, cll) {
                            QuestionService.getByID(id, function (question) {
                                questions.push(question);
                                cll();
                            }, function (res) {
                                cll();
                            });
                        }, function (err, res) {
                            $scope.questionnaire.questions = questions;

                            $scope.preview = function (body) {
                                var b = body.split('\n'), f;
                                b.forEach(function (item) {
                                    if (!item.startsWith('<')) {
                                        f = item;
                                    }
                                });
                                return markdown.toHTML(f);
                            };
                        });

                        $scope.edit = true;
                    });
                }, function (res) {
                    $location.path('teacher/questionnaire');
                });
            }



            TagService.get('', function (tags) {
                $('#tags').bind('keydown', function (event) {
                    if (event.keyCode === $.ui.keyCode.TAB && $(this).autocomplete('instance').menu.active) {
                        event.preventDefault();
                    }
                }).autocomplete({
                    minLength: 0,
                    source: function (request, response) {
                        response($.ui.autocomplete.filter(function () {
                            var ret = [];
                            tags.forEach(function (item) {
                                ret.push(item.name);
                            });
                            return ret;
                        }(), request.term.split(/,\s*/).pop()));
                    },
                    focus: function () {
                        return false;
                    },
                    select: function (event, ui) {
                        var terms = this.value.split(/,\s*/);
                        terms.pop();
                        terms.push(ui.item.value);
                        terms.push('');
                        this.value = terms.join(', ');
                        return false;
                    }
                });
            }, function (res) {

            });

        }]);
});