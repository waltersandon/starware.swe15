$(function () {
    angular.module('app.App').controller('controller.teacher.ManipulateQuestion', ['util.Editor', 'model.data.Error', '$location', 'util.QML', 'model.data.Question', 'model.service.QuestionService', '$rootScope', '$scope', 'model.data.Tag', 'model.service.TagService', function (Editor, Error, $location, QML, Question, QuestionService, $rootScope, $scope, Tag, TagService) {
            $scope.error = new Error();
            $scope.submit = function () {
                if (QML.parse($scope.editor.value()).status) {
                    $scope.question.body = $scope.editor.value();
                    $scope.question.tags = [];

                    async.each($scope.tagsInput.split(','), function (tagInput, cll) {
                        if (tagInput.trim() !== '') {
                            var find = false;
                            $scope.tags.forEach(function (item) {
                                if (item.name === tagInput.trim()) {
                                    if ($scope.question.tags.indexOf(item.id) < 0) {
                                        $scope.question.tags.push(item.id);
                                        find = true;
                                    }
                                }
                            });
                            if (!find) {
                                TagService.new(new Tag('', '', tagInput.trim()), function (res) {
                                    $scope.question.tags.push(res._id);
                                    cll();
                                }, function (res) {
                                    cll();
                                });
                            } else {
                                cll();
                            }
                        } else {
                            cll();
                        }
                    }, function (err, res) {
                        if ($scope.edit) {
                            QuestionService.modify($scope.question, function () {
                                $location.path('teacher/questions');
                            }, function (res) {

                            });
                        } else {
                            QuestionService.new($scope.question, function () {
                                $location.path('teacher/questions');
                            }, function (res) {

                            });
                        }
                    });
                } else {
                    $scope.error = new Error(QML.parse($scope.editor.value()).message, 'errorQML', true, 'alert-danger');
                }
            };
            function buildEditor() {
                $scope.editor = Editor.editor();
                $scope.editor.value($scope.question.body);
            }
            function ManipulateQuestion() {
                if ($scope.urlPath()[3] === 'new') {
                    $scope.question = new Question();
                    $scope.edit = false;
                    buildEditor();
                } else if ($scope.urlPath()[3] === 'modify') {
                    QuestionService.getByID($scope.urlPath()[4], function (question) {
                        if (question.author === $rootScope.me.id) {
                            $scope.question = question;
                            $scope.tagsInput = '';
                            async.each($scope.question.tags, function (tag, cll) {
                                TagService.getByID(tag, function (tagComplete) {
                                    $scope.tagsInput += tagComplete.name + ', ';
                                    cll();
                                }, function (res) {
                                    cll();
                                });
                            }, function (err, res) {
                                $scope.edit = true;
                                buildEditor();
                            });
                        } else {
                            $location.path('teacher/questions');
                        }
                    }, function (res) {
                        $location.path('teacher/questions');
                    });
                }

                TagService.get('', function (tags) {
                    $scope.tags = tags;

                    $('#tags').bind('keydown', function (event) {
                        if (event.keyCode === $.ui.keyCode.TAB && $(this).autocomplete('instance').menu.active) {
                            event.preventDefault();
                        }
                    }).autocomplete({
                        minLength: 0,
                        source: function (request, response) {
                            response($.ui.autocomplete.filter(function () {
                                var ret = [];
                                $scope.tags.forEach(function (item) {
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
            }

            ManipulateQuestion();
        }]);
});

