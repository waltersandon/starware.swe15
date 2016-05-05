$(function () {
    angular.module('app.App').controller('controller.teacher.ManipulateQuestion', ['model.data.Error', '$location', 'util.QML', 'model.data.Question', 'model.service.QuestionService', '$scope', 'model.data.Tag', 'model.service.TagService', function (Error, $location, QML, Question, QuestionService, $scope, Tag, TagService) {
            $scope.error = new Error();

            if ($scope.urlPath()[3] === 'new') {
                $scope.question = new Question();
                $scope.edit = false;
                setEditor();
            } else if ($scope.urlPath()[3] === 'modify') {
                QuestionService.getByID($scope.urlPath()[4], function (question) {
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
                        setEditor();
                    });
                }, function (res) {
                    $location.path('teacher/questions');
                });
            }

            function setEditor() {
                console.log('a');
                $scope.editor = new SimpleMDE({
                    element: document.getElementById('editor'),
                    previewRender: function (plainText) {
                        var p = QML.parse(plainText);
                        return p.status ? p.body + p.answerForm : p.message;
                    },
                    toolbar: ['bold', 'italic', '|', 'quote', 'unordered-list', 'ordered-list', '|', 'link', 'image', 'guide', '|', 'preview']
                });
                $scope.editor.value($scope.question.body);
            }

            $scope.submit = function () {
                if (QML.parse($scope.editor.value()).status) {
                    $scope.question.body = $scope.editor.value();
                    $scope.question.tags = [];

                    async.each($scope.tagsInput.split(/,\s*/), function (tagInput, cll) {
                        if (tagInput !== '') {
                            var find = false;
                            $scope.tags.forEach(function (item) {
                                if (item.name === tagInput) {
                                    $scope.question.tags.push(item.id);
                                    find = true;
                                }
                            });
                            if (!find) {
                                TagService.new(new Tag('', '', tagInput), function (res) {
                                    $scope.question.tags.push(res._id);
                                    cll();
                                }, function (res) {
                                    cll();
                                });
                            } else {
                                cll();
                            }
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

            TagService.get('', function (tags) {
                $scope.tags = tags;
            }, function (res) {

            });

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
            $scope.dirty = false;

            /*$scope.$on('$routeChangeStart', function (event) {
                console.log('$routeChangeStart');
                var dirty = $scope.dirty || $scope.question.body !== $scope.editor.value();
                if (dirty && confirm('Sono state apportate modifiche: uscire senza salvare?')) {
                    event.preventDefault();
                }
            });

            $scope.$on('$locationChangeStart', function (event) {
                console.log('$locationChangeStart');
                var dirty = $scope.dirty || $scope.question.body !== $scope.editor.value();
                if (dirty && confirm('Sono state apportate modifiche: uscire senza salvare?')) {
                    event.preventDefault();
                }
            });

            $(window).on('hashchange', function (event) {
                console.log('hashchange');
                var dirty = $scope.dirty || $scope.question.body !== $scope.editor.value();
                if (dirty && confirm('Sono state apportate modifiche: uscire senza salvare?')) {
                    event.preventDefault();
                }
            });

            $(window).bind('beforeunload', function (event) {
                console.log('beforeunload');
                var dirty = $scope.dirty || $scope.question.body !== $scope.editor.value();
                if (dirty && confirm('Sono state apportate modifiche: uscire senza salvare?')) {
                    event.preventDefault();
                }
            });*/
        }]);
});

